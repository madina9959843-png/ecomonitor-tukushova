from __future__ import annotations

import io
import json
import os
import sqlite3
import time
import hmac
import hashlib
import secrets
import shutil
from pathlib import Path
from typing import Optional

import pandas as pd
from fastapi import FastAPI, File, HTTPException, Query, UploadFile, Request, Response
from fastapi.responses import FileResponse, HTMLResponse, StreamingResponse, JSONResponse
from pydantic import BaseModel
from fastapi.staticfiles import StaticFiles

from analysis import analyze_dataframe, generate_demo_data

ROOT = Path(__file__).resolve().parent
DATA_DIR = ROOT / "data"
DB_PATH = Path(os.getenv("ECOMONITOR_DB", str(ROOT / "eco_monitor.db")))
STATIC_DIR = ROOT / "static"
DEFAULT_SHOWCASE_CSV = DATA_DIR / "EcoMonitor_Demo_Showcase_Balanced_R0_R3.csv"
DEMO_CSV = DEFAULT_SHOWCASE_CSV if DEFAULT_SHOWCASE_CSV.exists() else DATA_DIR / "demo_air_quality.csv"
SEED_DB = DATA_DIR / "seed_public.db"

ADMIN_PASSWORD = os.getenv("ECOMONITOR_ADMIN_PASSWORD", "").strip()
SESSION_SECRET = os.getenv("ECOMONITOR_SESSION_SECRET", "").strip() or secrets.token_urlsafe(32)
SESSION_COOKIE = "ecomonitor_admin"
SESSION_TTL_SECONDS = int(os.getenv("ECOMONITOR_SESSION_TTL", "43200"))
SECURE_COOKIES = os.getenv("ECOMONITOR_SECURE_COOKIES", "false").lower() in {"1", "true", "yes", "on"}
RESET_ON_START = os.getenv("ECOMONITOR_RESET_ON_START", "false").lower() in {"1", "true", "yes", "on"}

CITY_NAME = "Усть-Каменогорск"
STATION_LABELS = {
    "Пост 1": "Пост 1 (промзона)",
    "Пост 2": "Пост 2 (пр. Назарбаева)",
    "Пост 3": "Пост 3 (левобережный)",
    "Пост 5": "Пост 5 (ул. Казахстан)",
    "Пост 7": "Пост 7 (пр. Сатпаева)",
}

app = FastAPI(
    title="EcoMonitor Intelligent Module",
    version="1.5.0",
    description="Интеллектуальный модуль экологического мониторинга атмосферы.",
)
app.mount("/static", StaticFiles(directory=STATIC_DIR), name="static")


def db_connect():
    con = sqlite3.connect(DB_PATH)
    con.row_factory = sqlite3.Row
    return con


def init_db():
    con = db_connect()
    con.executescript(
        """
        CREATE TABLE IF NOT EXISTS measurements (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          timestamp TEXT NOT NULL,
          station TEXT,
          pm25 REAL, pm10 REAL, no2 REAL, so2 REAL,
          temperature REAL, humidity REAL, pressure REAL, wind_speed REAL,
          wind_direction TEXT, quality_flag TEXT
        );
        CREATE TABLE IF NOT EXISTS anomalies (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          event_id TEXT UNIQUE,
          measurement_index INTEGER,
          timestamp TEXT,
          station TEXT,
          pollutant TEXT,
          pollutant_name TEXT,
          value REAL,
          z_score REAL,
          iqr_flag INTEGER,
          if_score REAL,
          category TEXT,
          level TEXT,
          status TEXT,
          temperature REAL, humidity REAL, pressure REAL, wind_speed REAL,
          wind_direction TEXT, quality_flag TEXT,
          explanation TEXT
        );
        CREATE TABLE IF NOT EXISTS meta (key TEXT PRIMARY KEY, value TEXT);
        """
    )
    con.commit()
    con.close()


def save_analysis(df: pd.DataFrame):
    t0 = time.perf_counter()
    result = analyze_dataframe(df)
    con = db_connect()
    con.execute("DELETE FROM measurements")
    con.execute("DELETE FROM anomalies")
    cols = [
        "timestamp","station","pm25","pm10","no2","so2",
        "temperature","humidity","pressure","wind_speed","wind_direction","quality_flag"
    ]
    m = result.measurements[cols].copy()
    m["timestamp"] = m["timestamp"].astype(str)
    m.to_sql("measurements", con, if_exists="append", index=False)
    if not result.anomalies.empty:
        a = result.anomalies.copy()
        a["timestamp"] = a["timestamp"].astype(str)
        a["iqr_flag"] = a["iqr_flag"].astype(int)
        a.to_sql("anomalies", con, if_exists="append", index=False)
    elapsed = time.perf_counter() - t0
    con.execute("INSERT OR REPLACE INTO meta(key,value) VALUES('last_processing_seconds',?)", (f"{elapsed:.3f}",))
    con.execute("INSERT OR REPLACE INTO meta(key,value) VALUES('thresholds',?)", (json.dumps(result.thresholds, ensure_ascii=False),))
    con.commit(); con.close()
    return result, elapsed


def ensure_demo():
    DATA_DIR.mkdir(exist_ok=True)
    if RESET_ON_START and SEED_DB.exists():
        DB_PATH.parent.mkdir(parents=True, exist_ok=True)
        shutil.copyfile(SEED_DB, DB_PATH)
        return

    init_db()
    con = db_connect()
    count = con.execute("SELECT COUNT(*) FROM measurements").fetchone()[0]
    con.close()
    if count == 0:
        if SEED_DB.exists():
            shutil.copyfile(SEED_DB, DB_PATH)
        elif DEMO_CSV.exists():
            df = pd.read_csv(DEMO_CSV)
            save_analysis(df)
        else:
            df = generate_demo_data(15000)
            df.to_csv(DATA_DIR / "demo_air_quality.csv", index=False)
            save_analysis(df)


class AdminLogin(BaseModel):
    password: str


def _sign_admin_session(expires_at: int) -> str:
    payload = f"admin:{expires_at}"
    sig = hmac.new(SESSION_SECRET.encode("utf-8"), payload.encode("utf-8"), hashlib.sha256).hexdigest()
    return f"{payload}:{sig}"


def _valid_admin_session(token: str | None) -> bool:
    if not token:
        return False
    try:
        role, exp_text, supplied_sig = token.rsplit(":", 2)
        if role != "admin":
            return False
        expires_at = int(exp_text)
        if expires_at < int(time.time()):
            return False
        payload = f"admin:{expires_at}"
        expected = hmac.new(SESSION_SECRET.encode("utf-8"), payload.encode("utf-8"), hashlib.sha256).hexdigest()
        return hmac.compare_digest(expected, supplied_sig)
    except Exception:
        return False


def is_admin(request: Request) -> bool:
    return _valid_admin_session(request.cookies.get(SESSION_COOKIE))


def require_admin(request: Request):
    if not is_admin(request):
        raise HTTPException(status_code=401, detail="Требуется вход администратора")


@app.on_event("startup")
def startup_event():
    ensure_demo()


@app.get("/", response_class=HTMLResponse)
def home():
    return FileResponse(STATIC_DIR / "index.html")


@app.get("/api/health")
def health():
    return {"status": "ok", "module": "EcoMonitor", "version": "1.5.0", "public_mode": True}


@app.get("/api/admin/status")
def admin_status(request: Request):
    return {
        "authenticated": is_admin(request),
        "configured": bool(ADMIN_PASSWORD),
        "public_mode": True,
    }


@app.post("/api/admin/login")
def admin_login(payload: AdminLogin, request: Request):
    if not ADMIN_PASSWORD:
        raise HTTPException(status_code=503, detail="Пароль администратора не настроен на сервере")
    if not hmac.compare_digest(payload.password, ADMIN_PASSWORD):
        raise HTTPException(status_code=401, detail="Неверный пароль")
    expires_at = int(time.time()) + SESSION_TTL_SECONDS
    token = _sign_admin_session(expires_at)
    response = JSONResponse({"ok": True, "authenticated": True, "expires_at": expires_at})
    response.set_cookie(
        key=SESSION_COOKIE,
        value=token,
        max_age=SESSION_TTL_SECONDS,
        httponly=True,
        secure=SECURE_COOKIES,
        samesite="lax",
        path="/",
    )
    return response


@app.post("/api/admin/logout")
def admin_logout():
    response = JSONResponse({"ok": True, "authenticated": False})
    response.delete_cookie(SESSION_COOKIE, path="/")
    return response


def rowdicts(rows):
    return [dict(r) for r in rows]


def station_label(name: str) -> str:
    return STATION_LABELS.get(name, name)


def time_condition(start_date: Optional[str], end_date: Optional[str], column: str = "timestamp"):
    clauses, params = [], []
    if start_date:
        clauses.append(f"{column} >= ?")
        params.append(f"{start_date} 00:00:00")
    if end_date:
        clauses.append(f"{column} <= ?")
        params.append(f"{end_date} 23:59:59")
    return clauses, params


def build_anomaly_query(station=None, pollutant=None, level=None, category=None, start_date=None, end_date=None):
    clauses, params = [], []
    if station:
        clauses.append("station=?"); params.append(station)
    if pollutant:
        clauses.append("pollutant=?"); params.append(pollutant.lower())
    if level:
        lv = level.upper()
        if lv == "R0":
            clauses.append("(level='R1' AND category='Неопределенное' AND ABS(z_score) < 3.0)")
        elif lv == "R1":
            clauses.append("(level='R1' AND NOT (category='Неопределенное' AND ABS(z_score) < 3.0))")
        else:
            clauses.append("level=?"); params.append(lv)
    if category:
        clauses.append("category=?"); params.append(category)
    c2, p2 = time_condition(start_date, end_date, "timestamp")
    clauses += c2; params += p2
    where = (" WHERE " + " AND ".join(clauses)) if clauses else ""
    return where, params


def fetch_df(sql: str, params=None):
    con = db_connect()
    df = pd.read_sql_query(sql, con, params=params or [])
    con.close()
    return df


def display_level(row) -> str:
    if row.get("level") == "R1" and row.get("category") == "Неопределенное" and float(row.get("z_score") or 0) < 3.0:
        return "R0"
    return row.get("level", "R1")


@app.get("/api/options")
def options():
    con = db_connect()
    stations = [r[0] for r in con.execute("SELECT DISTINCT station FROM measurements ORDER BY station").fetchall()]
    cats = [r[0] for r in con.execute("SELECT DISTINCT category FROM anomalies ORDER BY category").fetchall()]
    min_ts, max_ts = con.execute("SELECT MIN(timestamp), MAX(timestamp) FROM measurements").fetchone()
    con.close()
    return {
        "cities": [CITY_NAME],
        "stations": [{"value": s, "label": station_label(s)} for s in stations],
        "pollutants": [
            {"value": "pm25", "label": "PM2.5"},
            {"value": "pm10", "label": "PM10"},
            {"value": "no2", "label": "NO₂"},
            {"value": "so2", "label": "SO₂"},
        ],
        "categories": cats,
        "levels": ["R0", "R1", "R2", "R3"],
        "date_min": (min_ts or "")[:10],
        "date_max": (max_ts or "")[:10],
    }


@app.get("/api/summary")
def summary(station: Optional[str] = None, start_date: Optional[str] = None, end_date: Optional[str] = None):
    awhere, aparams = build_anomaly_query(station=station, start_date=start_date, end_date=end_date)
    anomalies_df = fetch_df(f"SELECT * FROM anomalies{awhere}", aparams)

    mclauses, mparams = [], []
    if station:
        mclauses.append("station=?"); mparams.append(station)
    c2, p2 = time_condition(start_date, end_date)
    mclauses += c2; mparams += p2
    mwhere = (" WHERE " + " AND ".join(mclauses)) if mclauses else ""
    meas_df = fetch_df(f"SELECT * FROM measurements{mwhere}", mparams)

    latest = []
    if not anomalies_df.empty:
        latest_df = anomalies_df.sort_values("timestamp", ascending=False).head(8).copy()
        latest_df["station_label"] = latest_df["station"].map(station_label)
        latest = latest_df[["event_id","timestamp","station","station_label","pollutant_name","value","category","level","status"]].to_dict("records")

    cats = []
    levels = []
    pollutants = []
    stations = []
    if not anomalies_df.empty:
        cats = anomalies_df.groupby("category").size().reset_index(name="count").sort_values("count", ascending=False).to_dict("records")
        anomalies_df["display_level"] = anomalies_df.apply(display_level, axis=1)
        levels = anomalies_df.groupby("display_level").size().reset_index(name="count").rename(columns={"display_level":"level"}).to_dict("records")
        pollutants = anomalies_df.groupby("pollutant_name").size().reset_index(name="count").sort_values("count", ascending=False).to_dict("records")
        st = anomalies_df.groupby("station").size().reset_index(name="count").sort_values("count", ascending=False)
        st["station_label"] = st["station"].map(station_label)
        stations = st.to_dict("records")

    latest_measurement = None
    if not meas_df.empty:
        meas_df = meas_df.sort_values("timestamp", ascending=False)
        r = meas_df.iloc[0].to_dict()
        r["station_label"] = station_label(r.get("station", ""))
        latest_measurement = r

    con = db_connect()
    last_secs = con.execute("SELECT value FROM meta WHERE key='last_processing_seconds'").fetchone()
    con.close()
    return {
        "measurements": int(len(meas_df)),
        "anomalies": int(len(anomalies_df)),
        "categories": cats,
        "levels": levels,
        "pollutants": pollutants,
        "stations": stations,
        "latest": latest,
        "latest_measurement": latest_measurement,
        "last_processing_seconds": float(last_secs[0]) if last_secs else None,
        "reported_dissertation_metrics": {"precision": 0.94, "recall": 0.91, "f1": 0.92, "rest_api_ms": 145},
        "note": "Метрики диссертации отображаются как справочные результаты исследования; текущая демо-выборка синтетическая.",
    }


@app.get("/api/measurements")
def measurements(limit: int = Query(300, ge=10, le=5000), station: Optional[str] = None, start_date: Optional[str] = None, end_date: Optional[str] = None):
    clauses, params = [], []
    if station:
        clauses.append("station=?"); params.append(station)
    c2, p2 = time_condition(start_date, end_date)
    clauses += c2; params += p2
    where = (" WHERE " + " AND ".join(clauses)) if clauses else ""
    q = f"SELECT * FROM measurements{where} ORDER BY timestamp DESC LIMIT ?"
    params.append(limit)
    con = db_connect(); rows = con.execute(q, params).fetchall(); con.close()
    result = rowdicts(rows)
    for r in result:
        r["station_label"] = station_label(r.get("station", ""))
    return result


@app.get("/api/anomalies")
def anomalies(
    limit: int = Query(100, ge=1, le=5000),
    station: Optional[str] = None,
    pollutant: Optional[str] = None,
    level: Optional[str] = None,
    category: Optional[str] = None,
    start_date: Optional[str] = None,
    end_date: Optional[str] = None,
):
    where, params = build_anomaly_query(station=station, pollutant=pollutant, level=level, category=category, start_date=start_date, end_date=end_date)
    q = f"SELECT * FROM anomalies{where} ORDER BY timestamp DESC LIMIT ?"
    params.append(limit)
    con = db_connect(); rows = con.execute(q, params).fetchall(); con.close()
    result = rowdicts(rows)
    for r in result:
        r["station_label"] = station_label(r.get("station", ""))
        r["display_level"] = display_level(r)
    return result


@app.get("/api/anomalies/{event_id}")
def anomaly_detail(event_id: str):
    con = db_connect()
    row = con.execute("SELECT * FROM anomalies WHERE event_id=?", (event_id,)).fetchone()
    if not row:
        con.close(); raise HTTPException(404, "Событие не найдено")
    d = dict(row)
    idx = d["measurement_index"]
    win = con.execute(
        "SELECT * FROM measurements WHERE id BETWEEN ? AND ? ORDER BY id",
        (max(1, idx-24), idx+24)
    ).fetchall()
    con.close()
    d["window"] = rowdicts(win)
    d["station_label"] = station_label(d.get("station", ""))
    d["display_level"] = display_level(d)
    return d


@app.get('/api/analytics')
def analytics(
    station: Optional[str] = None,
    pollutant: Optional[str] = None,
    level: Optional[str] = None,
    category: Optional[str] = None,
    start_date: Optional[str] = None,
    end_date: Optional[str] = None,
):
    where, params = build_anomaly_query(station=station, pollutant=pollutant, level=level, category=category, start_date=start_date, end_date=end_date)
    a = fetch_df(f"SELECT * FROM anomalies{where}", params)

    mclauses, mparams = [], []
    if station:
        mclauses.append('station=?'); mparams.append(station)
    c2,p2 = time_condition(start_date, end_date)
    mclauses += c2; mparams += p2
    mwhere = (' WHERE ' + ' AND '.join(mclauses)) if mclauses else ''
    m = fetch_df(f"SELECT * FROM measurements{mwhere}", mparams)

    if a.empty:
        return {
            'months': [], 'totals_by_month': [], 'pollutant_series': {}, 'level_counts': {}, 'category_counts': {}, 'heatmap': [],
            'station_stats': [], 'kpis': {'records': int(len(m)), 'anomalies': 0, 'processing_seconds': 0.0, 'precision': 0.94, 'recall': 0.91, 'f1': 0.92, 'rest_api_ms': 145}
        }

    a['ts'] = pd.to_datetime(a['timestamp'])
    a['month'] = a['ts'].dt.to_period('M').astype(str)
    a['weekday'] = a['ts'].dt.dayofweek
    a['hour'] = a['ts'].dt.hour
    a['station_label'] = a['station'].map(station_label)
    a['display_level'] = a.apply(display_level, axis=1)

    months = sorted(a['month'].unique().tolist())
    totals_by_month = a.groupby('month').size().reindex(months, fill_value=0).tolist()
    pollutant_pivot = a.pivot_table(index='month', columns='pollutant_name', aggfunc='size', fill_value=0).reindex(months, fill_value=0)
    pollutant_series = {c: pollutant_pivot[c].tolist() for c in pollutant_pivot.columns}

    level_order = ['R0','R1','R2','R3']
    level_counts = a.groupby('display_level').size().to_dict()
    level_counts = {k: int(level_counts.get(k, 0)) for k in level_order}
    category_counts = {k:int(v) for k,v in a.groupby('category').size().to_dict().items()}

    heat = a.groupby(['weekday','hour']).size().reset_index(name='count')
    heatmap = [{'day': int(r.weekday), 'hour': int(r.hour), 'count': int(r['count'])} for _,r in heat.iterrows()]

    station_rows = []
    for st, g in a.groupby('station'):
        top_pollutant = g.groupby('pollutant_name').size().sort_values(ascending=False)
        last_row = g.sort_values('ts', ascending=False).iloc[0]
        item = {
            'station': st,
            'station_label': station_label(st),
            'total': int(len(g)),
            'potential': int((g['category']=='Потенциально экологическое').sum()),
            'meteo': int((g['category']=='Метеообусловленное').sum()),
            'technical': int((g['category']=='Техническое').sum()),
            'uncertain': int((g['category']=='Неопределенное').sum()),
            'top_pollutant': top_pollutant.index[0] if len(top_pollutant) else '-',
            'last_time': str(last_row['timestamp']),
            'last_level': last_row['display_level'],
        }
        station_rows.append(item)
    station_rows.sort(key=lambda x: x['total'], reverse=True)

    con = db_connect(); last_secs = con.execute("SELECT value FROM meta WHERE key='last_processing_seconds'").fetchone(); con.close()
    kpis = {
        'records': int(len(m)),
        'anomalies': int(len(a)),
        'processing_seconds': float(last_secs[0]) if last_secs else 0.0,
        'precision': 0.94,
        'recall': 0.91,
        'f1': 0.92,
        'rest_api_ms': 145,
    }
    return {
        'months': months,
        'totals_by_month': totals_by_month,
        'pollutant_series': pollutant_series,
        'level_counts': level_counts,
        'category_counts': category_counts,
        'heatmap': heatmap,
        'station_stats': station_rows,
        'kpis': kpis,
    }


@app.get('/api/export/anomalies')
def export_anomalies(
    station: Optional[str] = None,
    pollutant: Optional[str] = None,
    level: Optional[str] = None,
    category: Optional[str] = None,
    start_date: Optional[str] = None,
    end_date: Optional[str] = None,
):
    where, params = build_anomaly_query(station=station, pollutant=pollutant, level=level, category=category, start_date=start_date, end_date=end_date)
    df = fetch_df(f"SELECT * FROM anomalies{where} ORDER BY timestamp DESC", params)
    if not df.empty:
        df['station_label'] = df['station'].map(station_label)
    csv_bytes = df.to_csv(index=False).encode('utf-8-sig')
    return StreamingResponse(io.BytesIO(csv_bytes), media_type='text/csv', headers={'Content-Disposition':'attachment; filename=anomalies_export.csv'})


@app.post("/api/upload")
async def upload_csv(request: Request, file: UploadFile = File(...)):
    require_admin(request)
    if not file.filename.lower().endswith('.csv'):
        raise HTTPException(400, 'Загрузите CSV-файл.')
    raw = await file.read()
    try:
        df = pd.read_csv(io.BytesIO(raw))
    except Exception as e:
        raise HTTPException(400, f'Не удалось прочитать CSV: {e}')
    required = {'timestamp','pm25','pm10','no2','so2','temperature','humidity','pressure','wind_speed'}
    missing = sorted(required - set(df.columns))
    if missing:
        raise HTTPException(400, f"Отсутствуют обязательные столбцы: {', '.join(missing)}")
    try:
        result, elapsed = save_analysis(df)
    except Exception as e:
        raise HTTPException(400, f'Ошибка анализа: {e}')
    return {'ok': True, 'rows': len(result.measurements), 'anomalies': len(result.anomalies), 'processing_seconds': round(elapsed, 3)}


@app.post('/api/reset-demo')
def reset_demo(request: Request):
    require_admin(request)
    df = pd.read_csv(DEMO_CSV) if DEMO_CSV.exists() else generate_demo_data(15000)
    result, elapsed = save_analysis(df)
    return {'ok': True, 'rows': len(result.measurements), 'anomalies': len(result.anomalies), 'processing_seconds': round(elapsed, 3)}


@app.get('/api/download-demo')
def download_demo():
    if not DEMO_CSV.exists():
        generate_demo_data(15000).to_csv(DEMO_CSV, index=False)
    return FileResponse(DEMO_CSV, filename='demo_air_quality.csv', media_type='text/csv')
