from __future__ import annotations

from dataclasses import dataclass
from typing import Dict, Tuple
import numpy as np
import pandas as pd
from sklearn.ensemble import IsolationForest
from sklearn.preprocessing import StandardScaler

POLLUTANTS = ["pm25", "pm10", "no2", "so2"]
METEO = ["temperature", "humidity", "pressure", "wind_speed"]

DISPLAY_NAMES = {
    "pm25": "PM2.5",
    "pm10": "PM10",
    "no2": "NO₂",
    "so2": "SO₂",
}

@dataclass
class AnalysisResult:
    measurements: pd.DataFrame
    anomalies: pd.DataFrame
    thresholds: Dict[str, Dict[str, float]]


def _numeric_frame(df: pd.DataFrame) -> pd.DataFrame:
    out = df.copy()
    for col in POLLUTANTS + METEO:
        out[col] = pd.to_numeric(out[col], errors="coerce")
    out["timestamp"] = pd.to_datetime(out["timestamp"], errors="coerce")
    out = out.dropna(subset=["timestamp"] + POLLUTANTS + METEO)
    out = out.sort_values("timestamp").reset_index(drop=True)
    if "station" not in out:
        out["station"] = "Пост 7"
    if "wind_direction" not in out:
        out["wind_direction"] = "—"
    if "quality_flag" not in out:
        out["quality_flag"] = "OK"
    out["quality_flag"] = out["quality_flag"].fillna("OK").astype(str)
    return out


def analyze_dataframe(df: pd.DataFrame, random_state: int = 42) -> AnalysisResult:
    """Hybrid anomaly analysis used by the EcoMonitor module.

    Pipeline: Z-score/IQR -> Isolation Forest -> contextual interpretation -> R0-R3.
    The implementation follows the dissertation logic; final causal interpretation still requires independent domain validation.
    """
    data = _numeric_frame(df)
    if len(data) < 20:
        raise ValueError("Для анализа требуется минимум 20 полных записей.")

    thresholds: Dict[str, Dict[str, float]] = {}
    for p in POLLUTANTS:
        s = data[p].astype(float)
        mean = float(s.mean())
        std = float(s.std(ddof=0)) or 1.0
        q1, q3 = float(s.quantile(0.25)), float(s.quantile(0.75))
        iqr = q3 - q1 or 1.0
        lower, upper = q1 - 1.5 * iqr, q3 + 1.5 * iqr
        q95, q99 = float(s.quantile(0.95)), float(s.quantile(0.99))
        thresholds[p] = {
            "mean": mean, "std": std, "q1": q1, "q3": q3,
            "iqr": iqr, "lower": lower, "upper": upper,
            "q95": q95, "q99": q99,
        }
        data[f"{p}_z"] = (s - mean) / std
        data[f"{p}_iqr_flag"] = (s < lower) | (s > upper)

    features = data[POLLUTANTS + METEO].astype(float)
    X = StandardScaler().fit_transform(features)
    # contamination is intentionally conservative; the statistical layer remains independent.
    iso = IsolationForest(
        n_estimators=200,
        contamination=0.03,
        random_state=random_state,
        n_jobs=1,
    )
    pred = iso.fit_predict(X)
    decision = iso.decision_function(X)  # lower = more anomalous
    raw_anom = -decision
    lo, hi = float(raw_anom.min()), float(raw_anom.max())
    if hi - lo < 1e-12:
        iso_norm = np.zeros(len(data))
    else:
        iso_norm = (raw_anom - lo) / (hi - lo)
    data["if_anomaly"] = pred == -1
    data["if_score"] = iso_norm

    event_rows = []
    eid = 1
    for idx, row in data.iterrows():
        for p in POLLUTANTS:
            z = float(row[f"{p}_z"])
            iqr_flag = bool(row[f"{p}_iqr_flag"])
            stat_flag = abs(z) >= 3.0 or iqr_flag
            iso_flag = bool(row["if_anomaly"]) and float(row["if_score"]) >= 0.60
            candidate = stat_flag or iso_flag
            if not candidate:
                continue

            t = thresholds[p]
            value = float(row[p])
            quality_bad = str(row.get("quality_flag", "OK")).upper() not in {"OK", "GOOD", "VALID", "1"}
            low_wind = float(row["wind_speed"]) < 2.0
            humid = float(row["humidity"]) >= 70.0

            if quality_bad:
                category = "Техническое"
                explanation = "Обнаружен признак сниженного качества измерения или передачи данных."
            elif low_wind and humid and value >= t["q95"]:
                category = "Метеообусловленное"
                explanation = "Повышенная концентрация наблюдается при слабом ветре и высокой влажности; возможны условия накопления примесей."
            elif stat_flag and iso_flag:
                category = "Потенциально экологическое"
                explanation = "Отклонение подтверждено статистическим и многомерным анализом; явных признаков ошибки качества данных не выявлено."
            else:
                category = "Неопределенное"
                explanation = "Отклонение выявлено одним уровнем анализа; требуется дополнительная проверка контекста."

            if quality_bad:
                level = "R1"
            elif value >= t["q99"] and abs(z) >= 4.0 and iso_flag:
                level = "R3"
            elif stat_flag and iso_flag:
                level = "R2"
            else:
                level = "R1"

            event_rows.append({
                "event_id": f"EVT-{eid:06d}",
                "measurement_index": int(idx),
                "timestamp": row["timestamp"],
                "station": str(row["station"]),
                "pollutant": p,
                "pollutant_name": DISPLAY_NAMES[p],
                "value": round(value, 3),
                "z_score": round(z, 3),
                "iqr_flag": iqr_flag,
                "if_score": round(float(row["if_score"]), 3),
                "category": category,
                "level": level,
                "status": "Подтверждено" if level in {"R2", "R3"} else "Анализируется",
                "temperature": round(float(row["temperature"]), 2),
                "humidity": round(float(row["humidity"]), 2),
                "pressure": round(float(row["pressure"]), 2),
                "wind_speed": round(float(row["wind_speed"]), 2),
                "wind_direction": str(row.get("wind_direction", "—")),
                "quality_flag": str(row.get("quality_flag", "OK")),
                "explanation": explanation,
            })
            eid += 1

    anomalies = pd.DataFrame(event_rows)
    if not anomalies.empty:
        anomalies = anomalies.sort_values("timestamp", ascending=False).reset_index(drop=True)
    return AnalysisResult(measurements=data, anomalies=anomalies, thresholds=thresholds)


def generate_demo_data(n: int = 15000, seed: int = 42) -> pd.DataFrame:
    rng = np.random.default_rng(seed)
    ts = pd.date_range("2024-01-01", periods=n, freq="h")
    hour = ts.hour.to_numpy()
    day = np.arange(n) / 24.0
    seasonal = 1.0 + 0.20 * np.cos(2 * np.pi * day / 365.25)
    rush = 1.0 + 0.12 * ((hour >= 7) & (hour <= 10)) + 0.10 * ((hour >= 18) & (hour <= 22))

    pm25 = np.clip(18 * seasonal * rush + rng.normal(0, 4.0, n), 2, None)
    pm10 = np.clip(35 * seasonal * rush + rng.normal(0, 7.0, n), 4, None)
    no2 = np.clip(24 * rush + rng.normal(0, 5.0, n), 2, None)
    so2 = np.clip(11 * seasonal + rng.normal(0, 2.8, n), 1, None)

    # Meteorology: deterministic, plausible synthetic demo values.
    temp = 8 + 17 * np.sin(2 * np.pi * (day - 170) / 365.25) + 5 * np.sin(2*np.pi*(hour-8)/24) + rng.normal(0, 2, n)
    humidity = np.clip(65 - 0.8 * temp + rng.normal(0, 8, n), 20, 98)
    pressure = 995 + rng.normal(0, 8, n)
    wind = np.clip(rng.gamma(2.1, 1.4, n), 0.1, 12)
    dirs = np.array(["С", "СВ", "В", "ЮВ", "Ю", "ЮЗ", "З", "СЗ"])
    wind_dir = rng.choice(dirs, n)

    # Inject reproducible environmental-like spikes.
    spike_count = max(40, int(n * 0.008))
    ids = rng.choice(np.arange(48, n-48), size=spike_count, replace=False)
    for j, i in enumerate(ids):
        width = int(rng.integers(1, 4))
        factor = float(rng.uniform(2.0, 4.5))
        target = [pm25, pm10, no2, so2][j % 4]
        target[i:i+width] *= factor
        if j % 3 == 0:
            wind[i:i+width] = rng.uniform(0.3, 1.5, width)
            humidity[i:i+width] = rng.uniform(72, 94, width)

    quality = np.array(["OK"] * n, dtype=object)
    bad_ids = rng.choice(np.arange(n), size=max(10, int(n*0.001)), replace=False)
    quality[bad_ids] = "SUSPECT"

    return pd.DataFrame({
        "timestamp": ts,
        "station": rng.choice(["Пост 7", "Пост 5", "Пост 3", "Пост 2", "Пост 1"], n, p=[.35,.2,.18,.15,.12]),
        "pm25": np.round(pm25, 2),
        "pm10": np.round(pm10, 2),
        "no2": np.round(no2, 2),
        "so2": np.round(so2, 2),
        "temperature": np.round(temp, 2),
        "humidity": np.round(humidity, 2),
        "pressure": np.round(pressure, 2),
        "wind_speed": np.round(wind, 2),
        "wind_direction": wind_dir,
        "quality_flag": quality,
    })
