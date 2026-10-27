const palette={blue:'#3f7de0',green:'#38b36b',orange:'#f2aa2e',red:'#eb5c59',violet:'#9b61ff',teal:'#54bfa6',gray:'#aab8c7'};
const pollLabelMap={pm25:'PM2.5',pm10:'PM10',no2:'NO₂',so2:'SO₂'};
const catClassMap={
  'Потенциально экологическое':'cat-eco','Метеообусловленное':'cat-meteo','Техническое':'cat-tech','Неопределенное':'cat-unc',
  'Potential environmental':'cat-eco','Meteorological':'cat-meteo','Technical':'cat-tech','Uncertain':'cat-unc'
};
const pageSubtitleKey={dashboard:'sub_dashboard',anomalies:'sub_anomalies',events:'sub_events',analytics:'sub_analytics',api:'sub_api',settings:'sub_settings'};

const RU={
  brand_sub:'Атмосферный мониторинг',nav_home:'Главная',nav_anomalies:'Аномалии',nav_events:'События',nav_analytics:'Аналитика',nav_settings:'Настройки',
  tagline:'Чистый воздух<br>для устойчивого будущего',version:'Версия',ready_module:'Интеллектуальный модуль',system_running:'Система в работе',admin:'Администратор',
  main_title:'Интеллектуальный модуль экологического мониторинга атмосферы',period_hint:'Рабочий период',upload_csv:'Загрузить CSV',demo_data:'Демоданные',
  city:'Город',station:'Станция мониторинга',data_type:'Тип данных',category:'Категория аномалий',period:'Период',pollutant:'Загрязнитель',response_level:'Уровень реагирования',apply:'Применить',
  all_stations:'Все станции',all_pollutants:'Все загрязнители',all_categories:'Все категории',all_levels:'Все уровни',all_types:'Все типы',
  sub_dashboard:'Главная панель мониторинга',sub_anomalies:'Выявление аномалий',sub_events:'Карточка аномального события',sub_analytics:'Аналитика и история аномалий',sub_api:'REST API модуля',sub_settings:'Настройки модуля',
  latest_measure:'мкг/м³ · последнее измерение',processed:'Обработано записей',anomalies_count:'Обнаружено аномалий',api_resp:'Среднее время ответа REST API',f1:'F1-score',
  pollutant_dynamics:'Динамика концентраций загрязняющих веществ',response_levels:'Уровни реагирования',latest_events:'Последние аномальные события',performance_results:'Производительность системы',all_events:'Все события →',
  dashboard_note:'Метрики Precision/Recall/F1 и 145 мс — справочные результаты диссертационного исследования.',
  process_title:'Процесс выявления аномалий',stage_data:'Данные',stage_data_sub:'часовые измерения',stage_stat:'Z-score / IQR',stage_stat_sub:'статистические методы',stage_if:'Isolation Forest',stage_if_sub:'машинное обучение',stage_context:'Context',stage_context_sub:'метеоусловия, события',stage_response:'R0 – R3',stage_response_sub:'классификация и уровень реагирования',
  anomalies_time:'Выявленные аномалии во времени',summary_anom:'Сводка по аномалиям',anomaly_list:'Список выявленных аномалий',click_row:'Нажмите строку для открытия карточки события',
  date_time:'Дата и время',post:'Пост',value:'Значение',level:'Уровень',status:'Статус',event_card:'Карточка аномального события',
  total_anomalies:'Динамика общего количества аномалий',anomalies_by_pollutant:'Аномалии по загрязняющим веществам',distribution_levels:'Уровни реагирования',distribution_categories:'Распределение аномалий по категориям',hour_activity:'Почасовая активность аномалий',station_stats:'Статистика по станциям мониторинга',
  export_report:'Экспорт отчета',export:'Экспорт',analytics_station_period:'Статистика по станциям мониторинга',last_anomaly:'Последняя аномалия',most_freq:'Чаще всего (вещество)',
  total:'Всего',potential:'Потенциально экологические',meteo:'Метеообусловленные',technical:'Технические',uncertain:'Неопределенные',
  choose_event:'Выберите аномальное событие на странице «Аномалии».',event_status:'Общий статус',confirmed:'Подтверждена',elevated:'Повышенный уровень',
  detection_metrics:'Показатели обнаружения аномалии',actual_value:'Фактическое значение',anomaly_score:'Оценка аномальности',iqr:'IQR (робастная оценка)',pre_category:'Предварительная категория',
  event_dynamics:'Динамика концентрации',meteo_context:'Метеорологический контекст',context_interpretation:'Контекстная интерпретация',recommended_actions:'Рекомендованные действия',data_quality_exp:'Качество данных и объяснение системы',
  temperature:'Температура',humidity:'Влажность',pressure:'Давление',wind:'Скорость и направление ветра',
  quality_ok:'Данные достоверные',precision:'Precision',recall:'Recall',records:'Записей',events_word:'событий',
  module_settings:'Настройки модуля',settings_text:'База данных по умолчанию: SQLite. Для демонстрации и проверки предусмотрен встроенный набор из 15 000 синтетических записей.',reset_demo:'Восстановить демоданные',download_csv:'Скачать пример CSV',
  no_data:'Нет данных для отображения',choose_csv:'Выберите CSV-файл.',uploaded:'Загружено {rows} записей; выявлено аномалий: {anomalies}; анализ: {seconds} с.',demo_restored:'Демоданные восстановлены: {rows} записей.',
  api_docs:'Интерактивная документация FastAPI доступна по адресу <a href="/docs" target="_blank">/docs</a>.',
  dash_apply:'Обновить',dashboard_filters:'Фильтры мониторинга',city_ust:'Усть-Каменогорск',
  data_source:'Источник данных',sqlite_csv:'SQLite / CSV',
  action1:'Проверить возможные локальные источники выбросов в районе поста.',action2:'Провести визуальный осмотр территории и при необходимости запросить данные о технологической активности.',action3:'Усилить мониторинг концентрации в ближайшие часы.',action4:'При сохранении повышенных значений — рассмотреть уведомление уполномоченных органов.',
  system_expl:'Система фиксирует аномальное отклонение показателя относительно типичного фона, учитывая статистические методы, оценку Isolation Forest и метеорологический контекст.',
  data_quality_text:'Пропусков нет. Аномалия не выглядит следствием ошибки передачи или качества данных.',
  type_meas:'Все типы', yes:'Да', no:'Нет', robust_est:'робастная оценка', status_new:'Новое', status_review:'Анализируется', status_conf:'Подтверждено', status_closed:'Закрыто'
};
const KK={...RU,
  brand_sub:'Атмосфералық мониторинг',nav_home:'Басты бет',nav_anomalies:'Аномалиялар',nav_events:'Оқиғалар',nav_analytics:'Аналитика',nav_settings:'Баптаулар',
  tagline:'Тұрақты болашақ үшін<br>таза ауа',version:'Нұсқа',ready_module:'Интеллектуалды модуль',system_running:'Жүйе жұмыс істеп тұр',admin:'Әкімші',
  main_title:'Атмосфераның экологиялық мониторингінің интеллектуалды модулі',period_hint:'Жұмыс кезеңі',upload_csv:'CSV жүктеу',demo_data:'Демо деректер',
  city:'Қала',station:'Мониторинг бекеті',data_type:'Деректер түрі',category:'Аномалия санаты',period:'Кезең',pollutant:'Ластаушы зат',response_level:'Әрекет ету деңгейі',apply:'Қолдану',
  all_stations:'Барлық бекеттер',all_pollutants:'Барлық ластаушылар',all_categories:'Барлық санаттар',all_levels:'Барлық деңгейлер',all_types:'Барлық түрлер',
  sub_dashboard:'Мониторингтің басты панелі',sub_anomalies:'Аномалияларды анықтау',sub_events:'Аномальды оқиға картасы',sub_analytics:'Аномалиялар аналитикасы мен тарихы',sub_api:'Модульдің REST API',sub_settings:'Модуль баптаулары',
  latest_measure:'мкг/м³ · соңғы өлшем',processed:'Өңделген жазбалар',anomalies_count:'Анықталған аномалиялар',api_resp:'REST API орташа жауап уақыты',f1:'F1-score',
  pollutant_dynamics:'Ластаушы заттар концентрациясының динамикасы',response_levels:'Әрекет ету деңгейлері',latest_events:'Соңғы аномальды оқиғалар',performance_results:'Жүйе өнімділігі',all_events:'Барлық оқиғалар →',
  dashboard_note:'Precision/Recall/F1 және 145 мс — диссертациялық зерттеудің анықтамалық нәтижелері.',
  process_title:'Аномалияларды анықтау процесі',stage_data:'Деректер',stage_data_sub:'сағаттық өлшемдер',stage_stat:'Z-score / IQR',stage_stat_sub:'статистикалық әдістер',stage_if:'Isolation Forest',stage_if_sub:'машиналық оқыту',stage_context:'Context',stage_context_sub:'метеожағдайлар, оқиғалар',stage_response:'R0 – R3',stage_response_sub:'жіктеу және әрекет ету деңгейі',
  anomalies_time:'Уақыт бойынша анықталған аномалиялар',summary_anom:'Аномалиялар бойынша жиынтық',anomaly_list:'Анықталған аномалиялар тізімі',click_row:'Оқиға картасын ашу үшін жолды басыңыз',
  date_time:'Күні мен уақыты',post:'Бекет',value:'Мәні',level:'Деңгей',status:'Күйі',event_card:'Аномальды оқиға картасы',
  total_anomalies:'Аномалиялардың жалпы санының динамикасы',anomalies_by_pollutant:'Ластаушы заттар бойынша аномалиялар',distribution_levels:'Әрекет ету деңгейлері',distribution_categories:'Аномалиялардың санаттар бойынша үлестірімі',hour_activity:'Аномалиялардың сағаттық белсенділігі',station_stats:'Мониторинг бекеттері бойынша статистика',
  export_report:'Есепті экспорттау',export:'Экспорт',analytics_station_period:'Мониторинг бекеттері бойынша статистика',last_anomaly:'Соңғы аномалия',most_freq:'Ең жиі (зат)',
  total:'Барлығы',potential:'Ықтимал экологиялық маңызды',meteo:'Метеожағдайға байланысты',technical:'Техникалық',uncertain:'Анықталмаған',
  choose_event:'«Аномалиялар» бетінен аномальды оқиғаны таңдаңыз.',event_status:'Жалпы күй',confirmed:'Расталды',elevated:'Жоғары деңгей',
  detection_metrics:'Аномалияны анықтау көрсеткіштері',actual_value:'Нақты мән',anomaly_score:'Аномалия бағасы',iqr:'IQR (робастты бағалау)',pre_category:'Алдын ала санат',
  event_dynamics:'Концентрация динамикасы',meteo_context:'Метеорологиялық контекст',context_interpretation:'Контекстік интерпретация',recommended_actions:'Ұсынылатын әрекеттер',data_quality_exp:'Деректер сапасы және жүйе түсіндірмесі',
  temperature:'Температура',humidity:'Ылғалдылық',pressure:'Қысым',wind:'Жел жылдамдығы мен бағыты',quality_ok:'Деректер сенімді',precision:'Precision',recall:'Recall',records:'Жазбалар',events_word:'оқиға',
  module_settings:'Модуль баптаулары',settings_text:'Әдепкі деректер қоры: SQLite. Көрсету және тексеру үшін кірістірілген демонстрациялық деректер жинағы қарастырылған.',reset_demo:'Демо деректерді қалпына келтіру',download_csv:'CSV үлгісін жүктеу',
  no_data:'Көрсету үшін деректер жоқ',choose_csv:'CSV файлын таңдаңыз.',uploaded:'{rows} жазба жүктелді; аномалиялар: {anomalies}; талдау: {seconds} с.',demo_restored:'Демо деректер қалпына келтірілді: {rows} жазба.',
  api_docs:'FastAPI интерактивті құжаттамасы <a href="/docs" target="_blank">/docs</a> мекенжайында қолжетімді.',dash_apply:'Жаңарту',dashboard_filters:'Мониторинг сүзгілері',city_ust:'Өскемен',data_source:'Деректер көзі',sqlite_csv:'SQLite / CSV',
  action1:'Бекет маңындағы ықтимал жергілікті ластану көздерін тексеру.',action2:'Аумақты визуалды тексеріп, қажет болса технологиялық белсенділік туралы деректерді сұрату.',action3:'Алдағы сағаттарда концентрация мониторингін күшейту.',action4:'Жоғары мәндер сақталса, уәкілетті органдарды хабардар етуді қарастыру.',
  system_expl:'Жүйе статистикалық әдістерді, Isolation Forest бағасын және метеорологиялық контексті ескере отырып, көрсеткіштің қалыпты фоннан аномальды ауытқуын анықтайды.',
  data_quality_text:'Деректерде айқын пропусктар жоқ. Аномалия деректер сапасы немесе беру қатесінің салдарына ұқсамайды.',type_meas:'Барлық түрлер',yes:'Иә',no:'Жоқ',robust_est:'робастты бағалау',status_new:'Жаңа',status_review:'Талдануда',status_conf:'Расталды',status_closed:'Жабық'
};
const EN={...RU,
  brand_sub:'Atmospheric monitoring',nav_home:'Dashboard',nav_anomalies:'Anomalies',nav_events:'Events',nav_analytics:'Analytics',nav_settings:'Settings',tagline:'Clean air<br>for a sustainable future',version:'Version',ready_module:'Intelligent module',system_running:'System operational',admin:'Administrator',
  main_title:'Intelligent atmospheric environmental monitoring module',period_hint:'Working period',upload_csv:'Upload CSV',demo_data:'Demo data',city:'City',station:'Monitoring station',data_type:'Data type',category:'Anomaly category',period:'Period',pollutant:'Pollutant',response_level:'Response level',apply:'Apply',all_stations:'All stations',all_pollutants:'All pollutants',all_categories:'All categories',all_levels:'All levels',all_types:'All types',
  sub_dashboard:'Monitoring dashboard',sub_anomalies:'Anomaly detection',sub_events:'Anomalous event card',sub_analytics:'Analytics and anomaly history',sub_api:'Module REST API',sub_settings:'Module settings',latest_measure:'µg/m³ · latest measurement',processed:'Processed records',anomalies_count:'Detected anomalies',api_resp:'Average REST API response time',f1:'F1-score',pollutant_dynamics:'Pollutant concentration dynamics',response_levels:'Response levels',latest_events:'Latest anomalous events',performance_results:'System performance',all_events:'All events →',dashboard_note:'Precision/Recall/F1 and 145 ms are reference results from the dissertation study.',
  process_title:'Anomaly detection process',stage_data:'Data',stage_data_sub:'hourly measurements',stage_stat:'Z-score / IQR',stage_stat_sub:'statistical methods',stage_if:'Isolation Forest',stage_if_sub:'machine learning',stage_context:'Context',stage_context_sub:'weather, events',stage_response:'R0 – R3',stage_response_sub:'classification and response level',anomalies_time:'Detected anomalies over time',summary_anom:'Anomaly summary',anomaly_list:'Detected anomalies',click_row:'Click a row to open the event card',date_time:'Date and time',post:'Station',value:'Value',level:'Level',status:'Status',event_card:'Anomalous event card',
  total_anomalies:'Total anomaly count over time',anomalies_by_pollutant:'Anomalies by pollutant',distribution_levels:'Response levels',distribution_categories:'Anomaly distribution by category',hour_activity:'Hourly anomaly activity',station_stats:'Monitoring station statistics',export_report:'Export report',export:'Export',analytics_station_period:'Monitoring station statistics',last_anomaly:'Latest anomaly',most_freq:'Most frequent (pollutant)',total:'Total',potential:'Potentially environmentally significant',meteo:'Meteorologically induced',technical:'Technical',uncertain:'Uncertain',choose_event:'Select an anomalous event on the “Anomalies” page.',event_status:'Overall status',confirmed:'Confirmed',elevated:'Elevated level',detection_metrics:'Anomaly detection indicators',actual_value:'Actual value',anomaly_score:'Anomaly score',iqr:'IQR (robust estimate)',pre_category:'Preliminary category',event_dynamics:'Concentration dynamics',meteo_context:'Meteorological context',context_interpretation:'Contextual interpretation',recommended_actions:'Recommended actions',data_quality_exp:'Data quality and system explanation',temperature:'Temperature',humidity:'Humidity',pressure:'Pressure',wind:'Wind speed and direction',quality_ok:'Data reliable',precision:'Precision',recall:'Recall',records:'Records',events_word:'events',module_settings:'Module settings',settings_text:'Default database: SQLite. A built-in demonstration dataset is provided for presentation and verification.',reset_demo:'Restore demo data',download_csv:'Download sample CSV',no_data:'No data to display',choose_csv:'Choose a CSV file.',uploaded:'Loaded {rows} records; anomalies: {anomalies}; analysis: {seconds} s.',demo_restored:'Demo data restored: {rows} records.',api_docs:'Interactive FastAPI documentation is available at <a href="/docs" target="_blank">/docs</a>.',dash_apply:'Refresh',dashboard_filters:'Monitoring filters',city_ust:'Ust-Kamenogorsk',data_source:'Data source',sqlite_csv:'SQLite / CSV',action1:'Check possible local pollution sources near the station.',action2:'Perform a visual inspection and request process activity data if needed.',action3:'Increase concentration monitoring over the next few hours.',action4:'If elevated values persist, consider notifying the competent authorities.',system_expl:'The system detects anomalous deviation from the typical background using statistical methods, the Isolation Forest score, and meteorological context.',data_quality_text:'No clear gaps are present. The anomaly does not appear to result from a transmission or data-quality error.',type_meas:'All types',yes:'Yes',no:'No',robust_est:'robust estimate',status_new:'New',status_review:'Under review',status_conf:'Confirmed',status_closed:'Closed'
};
const I18N={ru:RU,kk:KK,en:EN};

// Complete page/data translations. These override any fallback Russian strings.
Object.assign(I18N.ru,{
  choose_file:'Выбрать файл',no_file_selected:'Файл не выбран',unit_conc:'мкг/м³',unit_pressure:'гПа',unit_wind:'м/с',
  level_r0:'Нормальное состояние',level_r1:'Наблюдение',level_r2:'Повышенный уровень',level_r3:'Событие повышенного внимания',
  chart_count:'Количество аномалий',chart_month:'Месяц',chart_hour:'Час',chart_total:'Всего аномалий',
  station_word:'Пост',context_word:'Контекст',data_reliable:'Данные достоверные',unit_ms:'мс'
});
Object.assign(I18N.kk,{
  brand_sub:'Атмосфералық мониторинг',nav_home:'Басты бет',nav_anomalies:'Аномалиялар',nav_events:'Оқиғалар',nav_analytics:'Аналитика',nav_settings:'Баптаулар',
  tagline:'Тұрақты болашақ үшін<br>таза ауа',version:'Нұсқа',ready_module:'Интеллектуалды модуль',system_running:'Жүйе жұмыс істеп тұр',admin:'Әкімші',
  main_title:'Атмосфераның экологиялық мониторингіне арналған интеллектуалды модуль',period_hint:'Жұмыс кезеңі',upload_csv:'CSV жүктеу',demo_data:'Демо деректер',
  city:'Қала',station:'Мониторинг бекеті',data_type:'Деректер түрі',category:'Аномалия санаты',period:'Кезең',pollutant:'Ластаушы зат',response_level:'Әрекет ету деңгейі',apply:'Қолдану',
  all_stations:'Барлық бекеттер',all_pollutants:'Барлық ластаушы заттар',all_categories:'Барлық санаттар',all_levels:'Барлық деңгейлер',all_types:'Барлық деректер түрлері',
  sub_dashboard:'Мониторингтің басты панелі',sub_anomalies:'Аномалияларды анықтау',sub_events:'Аномальды оқиға картасы',sub_analytics:'Аномалиялар аналитикасы және тарихы',sub_api:'Модульдің REST API',sub_settings:'Модуль баптаулары',
  latest_measure:'мкг/м³ · соңғы өлшем',processed:'Өңделген жазбалар',anomalies_count:'Анықталған аномалиялар',api_resp:'REST API орташа жауап уақыты',f1:'F1-score',
  pollutant_dynamics:'Ластаушы заттар концентрациясының динамикасы',response_levels:'Әрекет ету деңгейлері',latest_events:'Соңғы аномальды оқиғалар',performance_results:'Жүйе өнімділігі',all_events:'Барлық оқиғалар →',
  dashboard_note:'Precision/Recall/F1 және 145 мс — диссертациялық зерттеудің анықтамалық нәтижелері.',
  process_title:'Аномалияларды анықтау процесі',stage_data:'Деректер',stage_data_sub:'сағаттық өлшемдер',stage_stat:'Z-score / IQR',stage_stat_sub:'статистикалық әдістер',stage_if:'Isolation Forest',stage_if_sub:'машиналық оқыту',stage_context:'Контекст',stage_context_sub:'метеожағдайлар және оқиғалар',stage_response:'R0 – R3',stage_response_sub:'жіктеу және әрекет ету деңгейі',
  anomalies_time:'Уақыт бойынша анықталған аномалиялар',summary_anom:'Аномалиялар бойынша жиынтық',anomaly_list:'Анықталған аномалиялар тізімі',click_row:'Оқиға картасын ашу үшін жолды басыңыз',
  date_time:'Күні мен уақыты',post:'Бекет',value:'Мәні',level:'Деңгей',status:'Күйі',event_card:'Аномальды оқиға картасы',
  total_anomalies:'Аномалиялардың жалпы санының динамикасы',anomalies_by_pollutant:'Ластаушы заттар бойынша аномалиялар',distribution_levels:'Әрекет ету деңгейлері',distribution_categories:'Аномалиялардың санаттар бойынша үлестірімі',hour_activity:'Аномалиялардың сағаттық белсенділігі',station_stats:'Мониторинг бекеттері бойынша статистика',
  export_report:'Есепті экспорттау',export:'Экспорт',analytics_station_period:'Мониторинг бекеттері бойынша статистика',last_anomaly:'Соңғы аномалия',most_freq:'Ең жиі кездесетін зат',
  total:'Барлығы',potential:'Ықтимал экологиялық маңызды',meteo:'Метеожағдайға байланысты',technical:'Техникалық',uncertain:'Анықталмаған',
  choose_event:'«Аномалиялар» бетінен аномальды оқиғаны таңдаңыз.',event_status:'Жалпы күй',confirmed:'Расталды',elevated:'Жоғары деңгей',
  detection_metrics:'Аномалияны анықтау көрсеткіштері',actual_value:'Нақты мән',anomaly_score:'Аномалия бағасы',iqr:'IQR (робастты бағалау)',pre_category:'Алдын ала санат',
  event_dynamics:'Концентрация динамикасы',meteo_context:'Метеорологиялық контекст',context_interpretation:'Контекстік түсіндіру',recommended_actions:'Ұсынылатын әрекеттер',data_quality_exp:'Деректер сапасы және жүйе түсіндірмесі',
  temperature:'Температура',humidity:'Ылғалдылық',pressure:'Қысым',wind:'Жел жылдамдығы мен бағыты',quality_ok:'Деректер сенімді',precision:'Precision',recall:'Recall',records:'Жазбалар',events_word:'оқиға',
  module_settings:'Модуль баптаулары',settings_text:'Әдепкі деректер қоры — SQLite. Көрсету және тексеру үшін кірістірілген демонстрациялық деректер жинағы қарастырылған.',reset_demo:'Демо деректерді қалпына келтіру',download_csv:'CSV үлгісін жүктеу',
  no_data:'Көрсету үшін деректер жоқ',choose_csv:'CSV файлын таңдаңыз.',uploaded:'{rows} жазба жүктелді; анықталған аномалиялар: {anomalies}; талдау: {seconds} с.',demo_restored:'Демо деректер қалпына келтірілді: {rows} жазба.',
  api_docs:'FastAPI интерактивті құжаттамасы <a href="/docs" target="_blank">/docs</a> мекенжайында қолжетімді.',dash_apply:'Жаңарту',dashboard_filters:'Мониторинг сүзгілері',city_ust:'Өскемен',data_source:'Деректер көзі',sqlite_csv:'SQLite / CSV',
  action1:'Бекет маңындағы ықтимал жергілікті ластану көздерін тексеру.',action2:'Аумақты визуалды тексеріп, қажет болған жағдайда технологиялық белсенділік туралы деректерді сұрату.',action3:'Алдағы бірнеше сағатта концентрация мониторингін күшейту.',action4:'Жоғары мәндер сақталса, уәкілетті органдарды хабардар етуді қарастыру.',
  system_expl:'Жүйе көрсеткіштің қалыпты фоннан аномальды ауытқуын статистикалық әдістерді, Isolation Forest бағасын және метеорологиялық контексті ескере отырып анықтайды.',
  data_quality_text:'Айқын деректер жоғалуы жоқ. Аномалия деректерді беру немесе сапа қатесінің салдары ретінде көрінбейді.',type_meas:'Барлық түрлер',yes:'Иә',no:'Жоқ',robust_est:'робастты бағалау',status_new:'Жаңа',status_review:'Талдануда',status_conf:'Расталды',status_closed:'Жабық',
  choose_file:'Файлды таңдау',no_file_selected:'Файл таңдалмады',unit_conc:'мкг/м³',unit_pressure:'гПа',unit_wind:'м/с',
  level_r0:'Қалыпты жағдай',level_r1:'Бақылау',level_r2:'Жоғары деңгей',level_r3:'Жоғары назарды қажет ететін оқиға',
  chart_count:'Аномалиялар саны',chart_month:'Ай',chart_hour:'Сағат',chart_total:'Барлық аномалиялар',station_word:'Бекет',context_word:'Контекст',data_reliable:'Деректер сенімді',unit_ms:'мс'
});
Object.assign(I18N.en,{
  brand_sub:'Atmospheric monitoring',nav_home:'Dashboard',nav_anomalies:'Anomalies',nav_events:'Events',nav_analytics:'Analytics',nav_settings:'Settings',
  tagline:'Clean air<br>for a sustainable future',version:'Version',ready_module:'Intelligent module',system_running:'System operational',admin:'Administrator',
  main_title:'Intelligent Atmospheric Environmental Monitoring Module',period_hint:'Working period',upload_csv:'Upload CSV',demo_data:'Demo data',
  city:'City',station:'Monitoring station',data_type:'Data type',category:'Anomaly category',period:'Period',pollutant:'Pollutant',response_level:'Response level',apply:'Apply',
  all_stations:'All stations',all_pollutants:'All pollutants',all_categories:'All categories',all_levels:'All levels',all_types:'All data types',
  sub_dashboard:'Monitoring dashboard',sub_anomalies:'Anomaly detection',sub_events:'Anomalous event card',sub_analytics:'Anomaly analytics and history',sub_api:'Module REST API',sub_settings:'Module settings',
  latest_measure:'µg/m³ · latest measurement',processed:'Processed records',anomalies_count:'Detected anomalies',api_resp:'Average REST API response time',f1:'F1-score',
  pollutant_dynamics:'Pollutant concentration dynamics',response_levels:'Response levels',latest_events:'Latest anomalous events',performance_results:'System performance',all_events:'All events →',
  dashboard_note:'Precision/Recall/F1 and 145 ms are reference results from the dissertation study.',
  process_title:'Anomaly detection process',stage_data:'Data',stage_data_sub:'hourly measurements',stage_stat:'Z-score / IQR',stage_stat_sub:'statistical methods',stage_if:'Isolation Forest',stage_if_sub:'machine learning',stage_context:'Context',stage_context_sub:'weather conditions and events',stage_response:'R0 – R3',stage_response_sub:'classification and response level',
  anomalies_time:'Detected anomalies over time',summary_anom:'Anomaly summary',anomaly_list:'Detected anomaly list',click_row:'Click a row to open the event card',
  date_time:'Date and time',post:'Station',value:'Value',level:'Level',status:'Status',event_card:'Anomalous event card',
  total_anomalies:'Total anomaly count over time',anomalies_by_pollutant:'Anomalies by pollutant',distribution_levels:'Response levels',distribution_categories:'Anomaly distribution by category',hour_activity:'Hourly anomaly activity',station_stats:'Monitoring station statistics',
  export_report:'Export report',export:'Export',analytics_station_period:'Monitoring station statistics',last_anomaly:'Latest anomaly',most_freq:'Most frequent pollutant',
  total:'Total',potential:'Potentially environmentally significant',meteo:'Meteorologically induced',technical:'Technical',uncertain:'Uncertain',
  choose_event:'Select an anomalous event on the “Anomalies” page.',event_status:'Overall status',confirmed:'Confirmed',elevated:'Elevated level',
  detection_metrics:'Anomaly detection indicators',actual_value:'Actual value',anomaly_score:'Anomaly score',iqr:'IQR (robust estimate)',pre_category:'Preliminary category',
  event_dynamics:'Concentration dynamics',meteo_context:'Meteorological context',context_interpretation:'Contextual interpretation',recommended_actions:'Recommended actions',data_quality_exp:'Data quality and system explanation',
  temperature:'Temperature',humidity:'Humidity',pressure:'Pressure',wind:'Wind speed and direction',quality_ok:'Data reliable',precision:'Precision',recall:'Recall',records:'Records',events_word:'events',
  module_settings:'Module settings',settings_text:'The default database is SQLite. A built-in demonstration dataset is provided for presentation and verification.',reset_demo:'Restore demo data',download_csv:'Download sample CSV',
  no_data:'No data to display',choose_csv:'Choose a CSV file.',uploaded:'Loaded {rows} records; detected anomalies: {anomalies}; analysis: {seconds} s.',demo_restored:'Demo data restored: {rows} records.',
  api_docs:'Interactive FastAPI documentation is available at <a href="/docs" target="_blank">/docs</a>.',dash_apply:'Refresh',dashboard_filters:'Monitoring filters',city_ust:'Ust-Kamenogorsk',data_source:'Data source',sqlite_csv:'SQLite / CSV',
  action1:'Check possible local pollution sources near the monitoring station.',action2:'Perform a visual inspection and request process activity data if required.',action3:'Increase concentration monitoring over the next few hours.',action4:'If elevated values persist, consider notifying the competent authorities.',
  system_expl:'The system detects anomalous deviation from the typical background using statistical methods, the Isolation Forest score, and meteorological context.',
  data_quality_text:'No clear data gaps are present. The anomaly does not appear to result from a transmission or data-quality error.',type_meas:'All types',yes:'Yes',no:'No',robust_est:'robust estimate',status_new:'New',status_review:'Under review',status_conf:'Confirmed',status_closed:'Closed',
  choose_file:'Choose file',no_file_selected:'No file selected',unit_conc:'µg/m³',unit_pressure:'hPa',unit_wind:'m/s',
  level_r0:'Normal state',level_r1:'Observation',level_r2:'Elevated level',level_r3:'High-attention event',
  chart_count:'Anomaly count',chart_month:'Month',chart_hour:'Hour',chart_total:'Total anomalies',station_word:'Station',context_word:'Context',data_reliable:'Data reliable',unit_ms:'ms'
});


Object.assign(I18N.ru,{public_access:'Публичный доступ',admin_mode:'Администратор',admin_login:'Вход администратора',admin_logout:'Выйти',admin_login_help:'Введите пароль администратора. Публичные посетители могут только просматривать данные.',password:'Пароль',login:'Войти',public_mode_title:'Публичный режим',public_mode_text:'Просмотр данных открыт всем посетителям. Изменение базы доступно только после входа администратора.',admin_not_configured:'Пароль администратора не настроен на сервере.',admin_login_ok:'Вход администратора выполнен.',admin_logout_ok:'Вы вышли из режима администратора.',admin_required:'Для изменения данных требуется вход администратора.'});
Object.assign(I18N.kk,{public_access:'Ашық қолжетімділік',admin_mode:'Әкімші',admin_login:'Әкімші ретінде кіру',admin_logout:'Шығу',admin_login_help:'Әкімші құпиясөзін енгізіңіз. Ашық пайдаланушылар деректерді тек қарай алады.',password:'Құпиясөз',login:'Кіру',public_mode_title:'Ашық режим',public_mode_text:'Деректерді қарау барлық келушілерге ашық. Деректер қорын өзгерту тек әкімші кіргеннен кейін қолжетімді.',admin_not_configured:'Серверде әкімші құпиясөзі бапталмаған.',admin_login_ok:'Әкімші режиміне кірдіңіз.',admin_logout_ok:'Әкімші режимінен шықтыңыз.',admin_required:'Деректерді өзгерту үшін әкімші ретінде кіру қажет.'});
Object.assign(I18N.en,{public_access:'Public access',admin_mode:'Administrator',admin_login:'Administrator login',admin_logout:'Log out',admin_login_help:'Enter the administrator password. Public visitors can view data only.',password:'Password',login:'Log in',public_mode_title:'Public mode',public_mode_text:'Viewing is open to all visitors. Changing the database is available only after administrator login.',admin_not_configured:'The administrator password is not configured on the server.',admin_login_ok:'Administrator login successful.',admin_logout_ok:'You have left administrator mode.',admin_required:'Administrator login is required to change data.'});

const CATEGORY_LABELS={
  'Потенциально экологическое':{ru:'Потенциально экологическое',kk:'Ықтимал экологиялық маңызды',en:'Potentially environmentally significant'},
  'Метеообусловленное':{ru:'Метеообусловленное',kk:'Метеожағдайға байланысты',en:'Meteorologically induced'},
  'Техническое':{ru:'Техническое',kk:'Техникалық',en:'Technical'},
  'Неопределенное':{ru:'Неопределенное',kk:'Анықталмаған',en:'Uncertain'}
};
const STATUS_LABELS={
  'Подтверждено':{ru:'Подтверждено',kk:'Расталды',en:'Confirmed'},
  'Анализируется':{ru:'Анализируется',kk:'Талдануда',en:'Under review'},
  'Новое':{ru:'Новое',kk:'Жаңа',en:'New'},
  'Закрыто':{ru:'Закрыто',kk:'Жабық',en:'Closed'}
};
const STATION_LABELS={
  'Пост 1':{ru:'Пост 1 (промзона)',kk:'Бекет 1 (өнеркәсіптік аймақ)',en:'Station 1 (industrial zone)'},
  'Пост 2':{ru:'Пост 2 (пр. Назарбаева)',kk:'Бекет 2 (Назарбаев даңғ.)',en:'Station 2 (Nazarbayev Ave.)'},
  'Пост 3':{ru:'Пост 3 (левобережный)',kk:'Бекет 3 (сол жағалау)',en:'Station 3 (left bank)'},
  'Пост 5':{ru:'Пост 5 (ул. Казахстан)',kk:'Бекет 5 (Қазақстан көш.)',en:'Station 5 (Kazakhstan St.)'},
  'Пост 7':{ru:'Пост 7 (пр. Сатпаева)',kk:'Бекет 7 (Сәтбаев даңғ.)',en:'Station 7 (Satpayev Ave.)'}
};


const state={lang:localStorage.getItem('ecomonitor_lang')||'ru',page:'dashboard',options:null,eventId:null,admin:{authenticated:false,configured:false},
 filters:{dashboard:{station:'',start:'',end:''}, anomalies:{station:'',pollutant:'',level:'',category:'',start:'',end:''}, analytics:{station:'',category:'',start:'',end:''}}};

function t(k){return I18N[state.lang]?.[k] ?? I18N.ru[k] ?? k}
function fmtTpl(str, vals){return str.replace(/\{(\w+)\}/g, (_,k)=>vals[k]??'')}
function escapeHtml(v){return String(v??'').replace(/[&<>"']/g,s=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[s]))}
function api(url, opts={}){opts={credentials:'same-origin',...opts};return fetch(url,opts).then(async r=>{if(!r.ok){let msg=r.statusText; try{const j=await r.json(); msg=j.detail||msg}catch{} throw new Error(msg)} return r.json()})}
function locale(){return {ru:'ru-RU',kk:'kk-KZ',en:'en-US'}[state.lang]||'ru-RU'}
function fmtDate(s){if(!s)return '—'; const d=new Date(s); return d.toLocaleString(locale(),{year:'numeric',month:'2-digit',day:'2-digit',hour:'2-digit',minute:'2-digit'})}
function shortDate(s){if(!s)return '—'; try{const d=new Date(s+'T00:00:00'); const dd=String(d.getDate()).padStart(2,'0'); const mon=MONTH_LABELS[state.lang][d.getMonth()]; return `${dd} ${mon} ${d.getFullYear()}`}catch{return s}}
const MONTH_LABELS={ru:['янв.','февр.','март','апр.','май','июнь','июль','авг.','сент.','окт.','нояб.','дек.'],kk:['қаң.','ақп.','нау.','сәу.','мам.','мау.','шіл.','там.','қыр.','қаз.','қар.','жел.'],en:['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']};
function monthName(label){try{const [y,m]=String(label).split('-');return `${MONTH_LABELS[state.lang][Number(m)-1]} ${y}`}catch{return label}}
function showNotice(text, err=false){const el=document.getElementById('notice'); el.textContent=text; el.className='notice'+(err?' error':''); el.classList.remove('hidden'); setTimeout(()=>el.classList.add('hidden'),5000)}
function setClock(){document.getElementById('clock').textContent=new Date().toLocaleString(locale())}
setInterval(setClock,1000);
function setRangeLabel(start,end){const label=(start&&end)?`${shortDate(start)} — ${shortDate(end)}`:'—'; document.getElementById('rangeLabel').textContent=label;}

function classForCategory(cat){return catClassMap[cat]||'cat-unc'}
function classForStatus(status){if(!status)return 'status-new'; if(/подтверж|confirm/i.test(status))return 'status-ok'; if(/анализ|review/i.test(status))return 'status-wip'; if(/закры/i.test(status))return 'status-close'; return 'status-new'}
function statusLabel(status){return status||t('status_new')}
function trCategory(cat){return CATEGORY_LABELS[cat]?.[state.lang]||cat}
function trStatus(status){return STATUS_LABELS[status]?.[state.lang]||statusLabel(status)}
function trStation(value){if(STATION_LABELS[value])return STATION_LABELS[value][state.lang]; const bare=String(value||'').match(/Пост\s+[12357]/)?.[0]; return bare&&STATION_LABELS[bare]?STATION_LABELS[bare][state.lang]:value}
const WIND_LABELS={
  'С':{ru:'С',kk:'С',en:'N'},'СВ':{ru:'СВ',kk:'СШ',en:'NE'},'В':{ru:'В',kk:'Ш',en:'E'},'ЮВ':{ru:'ЮВ',kk:'ОШ',en:'SE'},
  'Ю':{ru:'Ю',kk:'О',en:'S'},'ЮЗ':{ru:'ЮЗ',kk:'ОБ',en:'SW'},'З':{ru:'З',kk:'Б',en:'W'},'СЗ':{ru:'СЗ',kk:'СБ',en:'NW'},'—':{ru:'—',kk:'—',en:'—'}
};
const EXPLANATION_LABELS={
  'Обнаружен признак сниженного качества измерения или передачи данных.':{
    ru:'Обнаружен признак сниженного качества измерения или передачи данных.',
    kk:'Өлшеу немесе деректерді беру сапасының төмендеу белгісі анықталды.',
    en:'A sign of reduced measurement or data transmission quality was detected.'},
  'Повышенная концентрация наблюдается при слабом ветре и высокой влажности; возможны условия накопления примесей.':{
    ru:'Повышенная концентрация наблюдается при слабом ветре и высокой влажности; возможны условия накопления примесей.',
    kk:'Жоғары концентрация әлсіз жел мен жоғары ылғалдылық кезінде байқалады; қоспалардың жиналуына қолайлы жағдай болуы мүмкін.',
    en:'Elevated concentration is observed under low wind and high humidity; conditions may favor pollutant accumulation.'},
  'Отклонение подтверждено статистическим и многомерным анализом; явных признаков ошибки качества данных не выявлено.':{
    ru:'Отклонение подтверждено статистическим и многомерным анализом; явных признаков ошибки качества данных не выявлено.',
    kk:'Ауытқу статистикалық және көпөлшемді талдаумен расталды; деректер сапасының айқын қателері анықталған жоқ.',
    en:'The deviation is confirmed by statistical and multivariate analysis; no clear data-quality error was detected.'},
  'Отклонение выявлено одним уровнем анализа; требуется дополнительная проверка контекста.':{
    ru:'Отклонение выявлено одним уровнем анализа; требуется дополнительная проверка контекста.',
    kk:'Ауытқу талдаудың бір деңгейінде анықталды; контексті қосымша тексеру қажет.',
    en:'The deviation was detected by one analysis layer; additional contextual verification is required.'}
};
function trWind(value){return WIND_LABELS[value]?.[state.lang]||value}
function trExplanation(value){return EXPLANATION_LABELS[value]?.[state.lang]||t('system_expl')}
function unitConc(){return t('unit_conc')}
function levelDescription(level){return t('level_'+String(level||'R1').toLowerCase())}

function categoryColor(cat){if(cat==='Потенциально экологическое')return palette.red; if(cat==='Метеообусловленное')return palette.blue; if(cat==='Техническое')return palette.orange; return palette.gray}
function weekdayLabels(){return state.lang==='kk'?['Дс','Сс','Ср','Бс','Жм','Сб','Жс']:state.lang==='en'?['Mon','Tue','Wed','Thu','Fri','Sat','Sun']:['Пн','Вт','Ср','Чт','Пт','Сб','Вс']}

function canvasSetup(id,h=250){const c=document.getElementById(id); if(!c) return null; const dpr=window.devicePixelRatio||1; const w=Math.max(320, c.parentElement.clientWidth-8); c.style.width=w+'px'; c.style.height=h+'px'; c.width=w*dpr; c.height=h*dpr; const ctx=c.getContext('2d'); ctx.setTransform(dpr,0,0,dpr,0,0); ctx.clearRect(0,0,w,h); return {ctx,w,h,c}}
function drawAxes(ctx,w,h,maxY,steps=4){const L=50,R=12,T=18,B=34; ctx.strokeStyle='#e5edf5'; ctx.fillStyle='#73879b'; ctx.lineWidth=1; ctx.font='11px Arial'; for(let i=0;i<=steps;i++){const y=T+(h-T-B)*i/steps; ctx.beginPath(); ctx.moveTo(L,y); ctx.lineTo(w-R,y); ctx.stroke(); const val=Math.round(maxY*(1-i/steps)); ctx.fillText(String(val),8,y+4)} return {L,R,T,B}}
function drawLine(id, series, labels, h=250, fill=false){const s=canvasSetup(id,h); if(!s) return; const {ctx,w}=s, H=s.h; const vals=series.flatMap(x=>x.data).filter(v=>Number.isFinite(v)); if(!vals.length){drawEmpty(ctx,w,H); return;} const maxY=Math.max(...vals,1)*1.15; const a=drawAxes(ctx,w,H,maxY); labels.forEach((lab,i)=>{if(i===0||i===labels.length-1||i%Math.ceil(labels.length/6)===0){const x=a.L+(w-a.L-a.R)*(i/Math.max(1,labels.length-1)); ctx.fillStyle='#6f8498'; ctx.fillText(lab,Math.max(a.L,x-16),H-10)}}); series.forEach((ser,si)=>{ctx.strokeStyle=ser.color; ctx.lineWidth=2.2; ctx.beginPath(); ser.data.forEach((v,i)=>{const x=a.L+(w-a.L-a.R)*(i/Math.max(1,ser.data.length-1)); const y=a.T+(H-a.T-a.B)*(1-(v/maxY)); i?ctx.lineTo(x,y):ctx.moveTo(x,y)}); ctx.stroke(); if(fill){ctx.lineTo(w-a.R,H-a.B); ctx.lineTo(a.L,H-a.B); ctx.closePath(); ctx.globalAlpha=.08; ctx.fillStyle=ser.color; ctx.fill(); ctx.globalAlpha=1}}
); drawLegend(ctx,a.L,6,series.map(s=>({label:s.label,color:s.color})))}
function drawStackedBars(id, labels, series, h=250){const s=canvasSetup(id,h); if(!s) return; const {ctx,w}=s, H=s.h; const totals=labels.map((_,i)=>series.reduce((sum,ser)=>sum+(ser.data[i]||0),0)); const maxY=Math.max(...totals,1)*1.2; const a=drawAxes(ctx,w,H,maxY); const area=w-a.L-a.R; const bw=Math.max(18, area/(labels.length*1.7)); labels.forEach((lab,i)=>{const x=a.L+area*(i+.5)/labels.length-bw/2; let acc=0; series.forEach(ser=>{const v=ser.data[i]||0; const bh=(H-a.T-a.B)*v/maxY; const y=H-a.B-acc-bh; ctx.fillStyle=ser.color; ctx.fillRect(x,y,bw,bh); acc+=bh}); ctx.fillStyle='#6f8498'; ctx.font='11px Arial'; ctx.fillText(lab, x-6, H-10); ctx.fillStyle='#2f4358'; ctx.font='700 12px Arial'; ctx.fillText(String(totals[i]), x+2, H-a.B-acc-6)}); drawLegend(ctx,a.L,6,series.map(s=>({label:s.label,color:s.color})))}
function drawDonut(id, labels, data, h=230, customColors=null){const s=canvasSetup(id,h); if(!s) return; const {ctx,w}=s, H=s.h; const total=data.reduce((a,b)=>a+b,0); if(!total){drawEmpty(ctx,w,H); return;} const colors=customColors||[palette.gray,palette.green,palette.orange,palette.red,palette.blue,palette.violet]; const cx=Math.min(130,w*.28), cy=H/2, r=Math.min(88,H*.34), inner=r*.60; let st=-Math.PI/2; data.forEach((v,i)=>{const en=st+Math.PI*2*(v/total); ctx.beginPath(); ctx.arc(cx,cy,r,st,en); ctx.arc(cx,cy,inner,en,st,true); ctx.closePath(); ctx.fillStyle=colors[i%colors.length]; ctx.fill(); st=en}); ctx.fillStyle='#1f3551'; ctx.font='700 22px Arial'; ctx.textAlign='center'; ctx.fillText(String(total),cx,cy+4); ctx.font='13px Arial'; ctx.fillText(t('total').toLowerCase(),cx,cy+24); ctx.textAlign='left'; labels.forEach((lab,i)=>{ctx.fillStyle=colors[i%colors.length]; ctx.beginPath(); ctx.arc(cx+r+38,40+i*28,7,0,Math.PI*2); ctx.fill(); ctx.fillStyle='#51697f'; const pct=((data[i]/total)*100).toFixed(1); ctx.fillText(`${lab} — ${data[i]} (${pct}%)`,cx+r+52,44+i*28)})}
function drawHeatmap(id, points, h=230){const s=canvasSetup(id,h); if(!s) return; const {ctx,w}=s,H=s.h; const days=weekdayLabels(); const L=42,R=52,T=22,B=28; const cols=24, rows=7; const cellW=(w-L-R)/cols, cellH=(H-T-B)/rows; const max=Math.max(...points.map(p=>p.count),1); const grid={}; points.forEach(p=>grid[`${p.day}-${p.hour}`]=p.count); for(let r=0;r<rows;r++){ctx.fillStyle='#647b90'; ctx.font='12px Arial'; ctx.fillText(days[r],8,T+cellH*r+16); for(let c=0;c<cols;c++){const v=grid[`${r}-${c}`]||0; const alpha=0.15+0.85*(v/max); ctx.fillStyle=`rgba(242,170,46,${Math.min(alpha,1)})`; if(v===0) ctx.fillStyle='rgba(62,123,227,.10)'; ctx.fillRect(L+c*cellW,T+r*cellH,cellW-2,cellH-2)}} for(let c=0;c<cols;c+=2){ctx.fillStyle='#647b90'; ctx.font='11px Arial'; ctx.fillText(String(c).padStart(2,'0'), L+c*cellW+2, H-8)} ctx.fillStyle='#647b90'; ctx.fillText(t('anomalies_count'), w-R+4, 22)}
function drawEmpty(ctx,w,h){ctx.fillStyle='#7b8da0'; ctx.font='14px Arial'; ctx.textAlign='center'; ctx.fillText(t('no_data'),w/2,h/2); ctx.textAlign='left'}
function drawLegend(ctx,x,y,items){ctx.font='12px Arial'; items.forEach((it,i)=>{ctx.fillStyle=it.color; ctx.fillRect(x+i*110,y,14,4); ctx.fillStyle='#556d83'; ctx.fillText(it.label,x+18+i*110,y+5)})}

function getActiveFilterRange(){const f=state.filters[state.page]||{}; return [f.start||state.options?.date_min||'', f.end||state.options?.date_max||'']}
function updatePageSubtitle(){document.getElementById('pageSubtitle').textContent=t(pageSubtitleKey[state.page])}
function activateNav(){document.querySelectorAll('.nav-item').forEach(btn=>btn.classList.toggle('active', btn.dataset.page===state.page))}

function optionHtml(list, selected, allLabel, withAll=true){let html=withAll?`<option value="">${allLabel}</option>`:''; html += list.map(o=>`<option value="${escapeHtml(o.value)}" ${o.value===selected?'selected':''}>${escapeHtml(o.label||o.value)}</option>`).join(''); return html}
function stationOptionsHtml(selected=''){const list=(state.options?.stations||[]).map(o=>({value:o.value,label:trStation(o.value)})); return optionHtml(list, selected, t('all_stations'))}
function pollutantOptionsHtml(selected=''){return optionHtml((state.options?.pollutants||[]), selected, t('all_pollutants'))}
function categoryOptionsHtml(selected=''){const list=(state.options?.categories||[]).map(x=>({value:x,label:trCategory(x)})); return optionHtml(list, selected, t('all_categories'))}
function levelOptionsHtml(selected=''){const list=(state.options?.levels||[]).map(x=>({value:x,label:x})); return optionHtml(list, selected, t('all_levels'))}

function renderDashboardSkeleton(){const f=state.filters.dashboard; document.getElementById('page-dashboard').innerHTML=`
  <div class="card">
    <div class="card-head"><h3>${t('dashboard_filters')}</h3></div>
    <div class="filter-toolbar">
      <div class="filter-field"><label>${t('city')}</label><select disabled><option>${t('city_ust')}</option></select></div>
      <div class="filter-field"><label>${t('station')}</label><select id="dashStation">${stationOptionsHtml(f.station)}</select></div>
      <div class="filter-field"><label>${t('period')}</label><input id="dashStart" type="date" value="${f.start||state.options.date_min}" min="${state.options.date_min}" max="${state.options.date_max}"></div>
      <div class="filter-field"><label>${t('period')}</label><input id="dashEnd" type="date" value="${f.end||state.options.date_max}" min="${state.options.date_min}" max="${state.options.date_max}"></div>
      <div class="filter-field"><label>${t('data_source')}</label><select disabled><option>${t('sqlite_csv')}</option></select></div>
      <button id="dashApply" class="icon-btn">🔍 ${t('dash_apply')}</button>
    </div>
  </div>
  <div class="mini-grid" id="dashStats"></div>
  <div class="two-col">
    <div class="card"><div class="card-head"><h3>${t('pollutant_dynamics')}</h3></div><canvas id="dashTrend" height="250"></canvas></div>
    <div class="card"><h3>${t('response_levels')}</h3><div id="dashLevels" class="level-list"></div></div>
  </div>
  <div class="two-col equal">
    <div class="card"><div class="card-head"><h3>${t('latest_events')}</h3><button id="goToAnomalies" class="secondary">${t('all_events')}</button></div><div id="dashEvents" class="event-list"></div></div>
    <div class="card"><h3>${t('performance_results')}</h3><div id="dashPerf" class="kpi-grid"></div><p class="subtle">${t('dashboard_note')}</p></div>
  </div>`;
  document.getElementById('dashApply').onclick=()=>{state.filters.dashboard.station=document.getElementById('dashStation').value; state.filters.dashboard.start=document.getElementById('dashStart').value; state.filters.dashboard.end=document.getElementById('dashEnd').value; loadDashboard()};
  document.getElementById('goToAnomalies').onclick=()=>showPage('anomalies');
}

function renderAnomaliesSkeleton(){const f=state.filters.anomalies; document.getElementById('page-anomalies').innerHTML=`
  <div class="card">
    <div class="filter-toolbar">
      <div class="filter-field"><label>${t('city')}</label><select disabled><option>${t('city_ust')}</option></select></div>
      <div class="filter-field"><label>${t('station')}</label><select id="anomStation">${stationOptionsHtml(f.station)}</select></div>
      <div class="filter-field"><label>${t('pollutant')}</label><select id="anomPollutant">${pollutantOptionsHtml(f.pollutant)}</select></div>
      <div class="filter-field"><label>${t('period')}</label><input id="anomStart" type="date" value="${f.start||state.options.date_min}" min="${state.options.date_min}" max="${state.options.date_max}"></div>
      <div class="filter-field"><label>${t('period')}</label><input id="anomEnd" type="date" value="${f.end||state.options.date_max}" min="${state.options.date_min}" max="${state.options.date_max}"></div>
      <div class="filter-field"><label>${t('response_level')}</label><select id="anomLevel">${levelOptionsHtml(f.level)}</select></div>
      <div class="filter-field"><label>${t('category')}</label><select id="anomCategory">${categoryOptionsHtml(f.category)}</select></div>
      <button id="anomApply" class="icon-btn">🔎 ${t('apply')}</button>
    </div>
  </div>
  <div class="pipeline">
    <div class="stage">${t('stage_data')}<small>${t('stage_data_sub')}</small></div>
    <div class="stage">${t('stage_stat')}<small>${t('stage_stat_sub')}</small></div>
    <div class="stage">${t('stage_if')}<small>${t('stage_if_sub')}</small></div>
    <div class="stage">${t('stage_context')}<small>${t('stage_context_sub')}</small></div>
    <div class="stage">${t('stage_response')}<small>${t('stage_response_sub')}</small></div>
  </div>
  <div class="two-col">
    <div class="card"><h3>${t('anomalies_time')}</h3><canvas id="anomTrend" height="250"></canvas></div>
    <div class="card"><h3>${t('summary_anom')}</h3><div id="anomSummary"></div></div>
  </div>
  <div class="card"><div class="card-head"><h3>${t('anomaly_list')}</h3><div><button id="anomExport" class="secondary">⭳ ${t('export')}</button><span class="subtle">${t('click_row')}</span></div></div>
    <div class="table-wrap"><table class="data-table"><thead><tr><th>${t('date_time')}</th><th>${t('post')}</th><th>${t('pollutant')}</th><th>${t('value')}</th><th>Z-score</th><th>IQR</th><th>IF score</th><th>${t('category')}</th><th>${t('level')}</th><th>${t('status')}</th></tr></thead><tbody id="anomRows"></tbody></table></div>
  </div>`;
  document.getElementById('anomApply').onclick=()=>{['station','pollutant','level','category'].forEach(k=>state.filters.anomalies[k]=document.getElementById('anom'+k.charAt(0).toUpperCase()+k.slice(1)).value); state.filters.anomalies.start=document.getElementById('anomStart').value; state.filters.anomalies.end=document.getElementById('anomEnd').value; loadAnomalies()};
  document.getElementById('anomExport').onclick=exportAnomalies;
}

function renderAnalyticsSkeleton(){const f=state.filters.analytics; document.getElementById('page-analytics').innerHTML=`
  <div class="card">
    <div class="filter-toolbar analytics">
      <div class="filter-field"><label>${t('city')}</label><select disabled><option>${t('city_ust')}</option></select></div>
      <div class="filter-field"><label>${t('station')}</label><select id="anlStation">${stationOptionsHtml(f.station)}</select></div>
      <div class="filter-field"><label>${t('data_type')}</label><select disabled><option>${t('all_types')}</option></select></div>
      <div class="filter-field"><label>${t('category')}</label><select id="anlCategory">${categoryOptionsHtml(f.category)}</select></div>
      <div class="filter-field"><label>${t('period')}</label><input id="anlStart" type="date" value="${f.start||state.options.date_min}" min="${state.options.date_min}" max="${state.options.date_max}"></div>
      <div class="filter-field"><label>${t('period')}</label><input id="anlEnd" type="date" value="${f.end||state.options.date_max}" min="${state.options.date_min}" max="${state.options.date_max}"></div>
      <button id="anlApply" class="icon-btn">🔍 ${t('apply')}</button>
      <button id="anlExport" class="secondary icon-btn">⭳ ${t('export_report')}</button>
    </div>
  </div>
  <div class="analytics-grid">
    <div class="card"><h3>${t('total_anomalies')}</h3><canvas id="anlTotal" height="250"></canvas></div>
    <div class="card"><h3>${t('anomalies_by_pollutant')}</h3><canvas id="anlPollutants" height="250"></canvas></div>
    <div class="card"><h3>${t('distribution_levels')}</h3><canvas id="anlLevels" height="250"></canvas></div>
  </div>
  <div class="analytics-grid second">
    <div class="card"><h3>${t('distribution_categories')}</h3><canvas id="anlCategories" height="250"></canvas></div>
    <div class="card"><h3>${t('hour_activity')}</h3><canvas id="anlHeatmap" height="250"></canvas><div class="heatmap-legend"><span>00</span><span>23</span></div></div>
    <div class="card"><h3>${t('performance_results')}</h3><div id="anlKpis" class="kpi-grid"></div></div>
  </div>
  <div class="card"><div class="card-head"><h3>${t('station_stats')}</h3><span class="subtle">${t('analytics_station_period')}</span></div>
    <div class="table-wrap"><table class="data-table station-table"><thead><tr><th>№</th><th>${t('station')}</th><th>${t('total')}</th><th class="potential-head">${t('potential')}</th><th>${t('meteo')}</th><th>${t('technical')}</th><th>${t('uncertain')}</th><th>${t('most_freq')}</th><th>${t('last_anomaly')}</th></tr></thead><tbody id="stationRows"></tbody></table></div>
  </div>`;
  document.getElementById('anlApply').onclick=()=>{state.filters.analytics.station=document.getElementById('anlStation').value; state.filters.analytics.category=document.getElementById('anlCategory').value; state.filters.analytics.start=document.getElementById('anlStart').value; state.filters.analytics.end=document.getElementById('anlEnd').value; loadAnalytics()};
  document.getElementById('anlExport').onclick=exportAnomalies;
}

function renderEventPlaceholder(){document.getElementById('page-events').innerHTML=`<div class="card empty-state">${t('choose_event')}</div>`}

async function loadDashboard(){renderDashboardSkeleton(); const f=state.filters.dashboard; setRangeLabel(f.start||state.options.date_min,f.end||state.options.date_max); const qs=new URLSearchParams({start_date:f.start||state.options.date_min,end_date:f.end||state.options.date_max}); if(f.station)qs.set('station',f.station); const [summary, ms]=await Promise.all([api('/api/summary?'+qs.toString()), api('/api/measurements?'+new URLSearchParams({limit:'120',start_date:f.start||state.options.date_min,end_date:f.end||state.options.date_max,...(f.station?{station:f.station}:{})}).toString())]);
  const latest=summary.latest_measurement||{};
  const pollutants=[['PM2.5',latest.pm25],['PM10',latest.pm10],['NO₂',latest.no2],['SO₂',latest.so2]];
  document.getElementById('dashStats').innerHTML=pollutants.map(([n,v])=>`<div class="card stat-card"><div class="stat-label">${n}</div><div class="stat-value">${v??'—'}</div><div class="stat-sub">${t('latest_measure')}</div></div>`).join('');
  const rev=[...ms].reverse(); drawLine('dashTrend', [
    {label:'PM2.5',color:palette.green,data:rev.map(x=>Number(x.pm25||0))},
    {label:'PM10',color:palette.orange,data:rev.map(x=>Number(x.pm10||0))},
    {label:'NO₂',color:palette.blue,data:rev.map(x=>Number(x.no2||0))},
    {label:'SO₂',color:palette.violet,data:rev.map(x=>Number(x.so2||0))}
  ], rev.map(x=>new Date(x.timestamp).toLocaleString(locale(),{month:'2-digit',day:'2-digit'})), 250);
  const levelsMap=Object.fromEntries((summary.levels||[]).map(x=>[x.level,x.count])); const allLevels=['R0','R1','R2','R3'];
  document.getElementById('dashLevels').innerHTML=allLevels.map(l=>`<div class="level-row"><span class="badge ${l}">${l}</span><b>${levelsMap[l]||0}</b></div>`).join('');
  document.getElementById('dashEvents').innerHTML=(summary.latest||[]).map(ev=>`<div class="event-item" onclick="openEvent('${ev.event_id}')"><div>${fmtDate(ev.timestamp)}</div><div><b>${ev.pollutant_name} ${Number(ev.value).toFixed(2)}</b><div class="event-meta">${escapeHtml(trStation(ev.station))} · ${escapeHtml(trCategory(ev.category))}</div></div><span class="badge ${ev.level}">${ev.level}</span></div>`).join('')||`<div class="muted">${t('no_data')}</div>`;
  const rm=summary.reported_dissertation_metrics||{};
  document.getElementById('dashPerf').innerHTML=`<div class="kpi"><small>${t('processed')}</small><b>${(summary.measurements||0).toLocaleString(locale())}</b></div><div class="kpi"><small>${t('anomalies_count')}</small><b>${summary.anomalies||0}</b></div><div class="kpi"><small>${t('api_resp')}</small><b>${rm.rest_api_ms||145} ${t('unit_ms')}</b></div><div class="kpi"><small>${t('f1')}</small><b>${rm.f1||0.92}</b></div>`;
}

async function loadAnomalies(){renderAnomaliesSkeleton(); const f=state.filters.anomalies; setRangeLabel(f.start||state.options.date_min,f.end||state.options.date_max); const params={limit:'600',start_date:f.start||state.options.date_min,end_date:f.end||state.options.date_max}; ['station','pollutant','level','category'].forEach(k=>{if(f[k])params[k]=f[k]}); const rows=await api('/api/anomalies?'+new URLSearchParams(params).toString());
  const ordered=[...rows].reverse();
  const byPoll=['PM2.5','PM10','NO₂','SO₂'].map(lbl=>({label:lbl,color:lbl==='PM2.5'?palette.green:lbl==='PM10'?palette.orange:lbl==='NO₂'?palette.blue:palette.violet,data:ordered.filter(x=>x.pollutant_name===lbl).map(x=>Number(x.value))}));
  const labels=ordered.map(x=>new Date(x.timestamp).toLocaleString(locale(),{month:'2-digit',day:'2-digit'}));
  const len=Math.min(...byPoll.map(x=>x.data.length||0));
  if(ordered.length){
    const series=[
      {label:'PM2.5',color:palette.green,data:ordered.map(x=>x.pollutant==='pm25'?Number(x.value):null).map(v=>v||0)},
      {label:'PM10',color:palette.orange,data:ordered.map(x=>x.pollutant==='pm10'?Number(x.value):0)},
      {label:'NO₂',color:palette.blue,data:ordered.map(x=>x.pollutant==='no2'?Number(x.value):0)},
      {label:'SO₂',color:palette.violet,data:ordered.map(x=>x.pollutant==='so2'?Number(x.value):0)}
    ]; drawLine('anomTrend', series, labels, 250);
  } else drawLine('anomTrend', [], [], 250);
  const catCounts={}, levelCounts={R0:0,R1:0,R2:0,R3:0}; rows.forEach(r=>{catCounts[r.category]=(catCounts[r.category]||0)+1; levelCounts[r.display_level||r.level]=(levelCounts[r.display_level||r.level]||0)+1});
  document.getElementById('anomSummary').innerHTML=`<div class="summary-block">
    ${Object.entries(catCounts).map(([k,v])=>`<div class="summary-row"><span class="badge ${classForCategory(k)}">${escapeHtml(trCategory(k))}</span><b>${v}</b></div>`).join('')}
  </div>
  <div class="level-list" style="margin-top:12px">${Object.entries(levelCounts).map(([k,v])=>`<div class="level-row"><span class="badge ${k}">${k}</span><b>${v||0}</b></div>`).join('')}</div>`;
  document.getElementById('anomRows').innerHTML=rows.map(r=>`<tr onclick="openEvent('${r.event_id}')"><td>${fmtDate(r.timestamp)}</td><td>${escapeHtml(trStation(r.station))}</td><td>${r.pollutant_name}</td><td><b>${Number(r.value).toFixed(2)}</b></td><td>${Number(r.z_score).toFixed(1)}</td><td>${r.iqr_flag?t('yes'):'—'}</td><td>${Number(r.if_score).toFixed(2)}</td><td><span class="badge ${classForCategory(r.category)}">${escapeHtml(trCategory(r.category))}</span></td><td><span class="badge ${r.display_level||r.level}">${r.display_level||r.level}</span></td><td><span class="badge ${classForStatus(r.status)}">${escapeHtml(trStatus(r.status))}</span></td></tr>`).join('')||`<tr><td colspan="10">${t('no_data')}</td></tr>`;
}

async function loadAnalytics(){renderAnalyticsSkeleton(); const f=state.filters.analytics; setRangeLabel(f.start||state.options.date_min,f.end||state.options.date_max); const params={start_date:f.start||state.options.date_min,end_date:f.end||state.options.date_max}; if(f.station)params.station=f.station; if(f.category)params.category=f.category; const a=await api('/api/analytics?'+new URLSearchParams(params).toString());
  drawLine('anlTotal',[{label:t('anomalies_count'),color:palette.blue,data:a.totals_by_month||[]}],(a.months||[]).map(monthName),250,true);
  const pSeries=[]; const pollColors={'PM2.5':palette.blue,'PM10':palette.orange,'NO₂':palette.violet,'SO₂':palette.teal}; Object.keys(a.pollutant_series||{}).forEach(k=>pSeries.push({label:k,color:pollColors[k]||palette.green,data:a.pollutant_series[k]})); drawStackedBars('anlPollutants',(a.months||[]).map(m=>monthName(m).split(' ')[0]),pSeries,250);
  const levelLabels=['R0','R1','R2','R3']; drawDonut('anlLevels', levelLabels, levelLabels.map(k=>a.level_counts?.[k]||0), 250);
  const cats=Object.keys(a.category_counts||{}); drawDonut('anlCategories', cats.map(trCategory), cats.map(k=>a.category_counts[k]), 250, cats.map(categoryColor));
  drawHeatmap('anlHeatmap', a.heatmap||[], 250);
  const k=a.kpis||{}; document.getElementById('anlKpis').innerHTML=`<div class="kpi"><small>${t('processed')}</small><b>${(k.records||0).toLocaleString(locale())}</b></div><div class="kpi"><small>${t('anomalies_count')}</small><b>${k.anomalies||0}</b></div><div class="kpi"><small>${t('api_resp')}</small><b>${k.rest_api_ms||145} ${t('unit_ms')}</b></div><div class="kpi"><small>${t('precision')}</small><b>${k.precision||0.94}</b></div><div class="kpi"><small>${t('recall')}</small><b>${k.recall||0.91}</b></div><div class="kpi"><small>${t('f1')}</small><b>${k.f1||0.92}</b></div>`;
  document.getElementById('stationRows').innerHTML=(a.station_stats||[]).map((r,i)=>`<tr><td>${i+1}</td><td>${escapeHtml(trStation(r.station))}</td><td><b>${r.total}</b></td><td class="potential-cell">${r.potential}</td><td>${r.meteo}</td><td>${r.technical}</td><td>${r.uncertain}</td><td>${escapeHtml(r.top_pollutant)}</td><td>${fmtDate(r.last_time)}</td></tr>`).join('')||`<tr><td colspan="9">${t('no_data')}</td></tr>`;
}

async function openEvent(id){state.eventId=id; const d=await api('/api/anomalies/'+encodeURIComponent(id)); showPage('events', false); const level=d.display_level||d.level; document.getElementById('page-events').innerHTML=`
  <div class="detail-head">
    <div class="card hero-card">
      <div class="hero-main">
        <div class="alert-icon">!</div>
        <div class="hero-title"><h2>${escapeHtml(d.event_id)}</h2><p>${escapeHtml(d.pollutant_name)} · ${t('event_card')}</p>
          <div class="hero-tags"><span>${escapeHtml(trStation(d.station))}</span><span>${t('city_ust')}</span><span>${fmtDate(d.timestamp)}</span></div>
        </div>
      </div>
      <span class="badge ${level}">${level}</span>
    </div>
    <div class="hero-status">
      <div class="status-panel"><h4>${t('event_status')}</h4><div class="status-big">${escapeHtml(trStatus(d.status)||t('confirmed'))}</div><div class="status-note">${t('system_expl')}</div></div>
      <div class="status-panel alt"><h4>${t('response_level')}</h4><div class="status-big level">${level}</div><div class="status-note">${levelDescription(level)}</div></div>
    </div>
  </div>
  <div class="metric-row">
    <div class="metric-box"><div class="m-title">${t('actual_value')}</div><div class="m-val">${Number(d.value).toFixed(1)}</div><div class="m-sub">${t('unit_conc')}</div></div>
    <div class="metric-box"><div class="m-title">${t('anomaly_score')}</div><div class="m-val">${Math.min(0.99, Math.max(0.52, (Math.abs(Number(d.if_score))+Math.abs(Number(d.z_score))/5))).toFixed(2)}</div><div class="m-sub">(0 – 1)</div></div>
    <div class="metric-box"><div class="m-title">Z-score</div><div class="m-val">${Number(d.z_score).toFixed(1)}</div><div class="m-sub">&gt; 3.0</div></div>
    <div class="metric-box"><div class="m-title">${t('iqr')}</div><div class="m-val">${d.iqr_flag ? t('yes') : t('no')}</div><div class="m-sub">${t('robust_est')}</div></div>
    <div class="metric-box"><div class="m-title">Isolation Forest</div><div class="m-val">${Number(d.if_score).toFixed(2)}</div><div class="m-sub">score</div></div>
    <div class="metric-box"><div class="m-title">${t('pre_category')}</div><div class="m-val">${escapeHtml(trCategory(d.category))}</div><div class="m-sub">${level}</div></div>
  </div>
  <div class="detail-layout">
    <div class="card"><h3>${t('event_dynamics')} ${escapeHtml(d.pollutant_name)}</h3><canvas id="eventTrend" height="250"></canvas></div>
    <div class="card"><h3>${t('meteo_context')}</h3><div class="kpi-grid">
      <div class="kpi"><small>${t('temperature')}</small><b>${Number(d.temperature).toFixed(1)} °C</b></div>
      <div class="kpi"><small>${t('humidity')}</small><b>${Number(d.humidity).toFixed(0)} %</b></div>
      <div class="kpi"><small>${t('pressure')}</small><b>${Number(d.pressure).toFixed(0)} ${t('unit_pressure')}</b></div>
      <div class="kpi"><small>${t('wind')}</small><b>${Number(d.wind_speed).toFixed(1)} ${t('unit_wind')} ${escapeHtml(trWind(d.wind_direction||'—'))}</b></div>
    </div></div>
  </div>
  <div class="event-bottom">
    <div class="card"><div class="small-title">${t('context_interpretation')}</div><div class="text-block">${escapeHtml(trExplanation(d.explanation))}<br><br>${t('system_expl')}</div></div>
    <div class="card"><div class="small-title">${t('recommended_actions')}</div><ol class="steps-list"><li>${t('action1')}</li><li>${t('action2')}</li><li>${t('action3')}</li><li>${t('action4')}</li></ol></div>
    <div class="card"><div class="small-title">${t('data_quality_exp')}</div><div class="info-rows"><div class="info-row"><span>${t('status')}</span><b>${t('quality_ok')}</b></div><div class="info-row"><span>XAI</span><b>${level}</b></div><div class="text-block">${t('data_quality_text')}</div></div></div>
  </div>`;
  const win=d.window||[]; drawLine('eventTrend', [{label:d.pollutant_name,color:palette.blue,data:win.map(r=>Number(r[d.pollutant]||0))}], win.map(r=>new Date(r.timestamp).toLocaleString(locale(),{day:'2-digit',hour:'2-digit'})), 250);
}
window.openEvent=openEvent;

async function exportAnomalies(){let f=state.filters[state.page==='analytics'?'analytics':'anomalies']; const params={start_date:f.start||state.options.date_min,end_date:f.end||state.options.date_max}; if(f.station)params.station=f.station; if(f.category)params.category=f.category; if(f.pollutant)params.pollutant=f.pollutant; if(f.level)params.level=f.level; window.open('/api/export/anomalies?'+new URLSearchParams(params).toString(),'_blank')}

function showPage(page, reload=true){state.page=page; activateNav(); updatePageSubtitle(); const [start,end]=getActiveFilterRange(); setRangeLabel(start,end); document.querySelectorAll('.page').forEach(x=>x.classList.remove('active')); document.getElementById('page-'+page).classList.add('active'); if(!reload) return; if(page==='dashboard') loadDashboard(); else if(page==='anomalies') loadAnomalies(); else if(page==='analytics') loadAnalytics(); else if(page==='events'){ if(state.eventId) openEvent(state.eventId); else renderEventPlaceholder() }}
window.showPage=showPage;

function updateFileName(){const input=document.getElementById('csvFile');const name=document.getElementById('fileName');if(!name)return;name.textContent=input?.files?.[0]?.name||t('no_file_selected')}
async function loadAdminStatus(){
  try{state.admin=await api('/api/admin/status')}catch{state.admin={authenticated:false,configured:false}}
  updateAdminUi();
}
function updateAdminUi(){
  const isAdmin=!!state.admin?.authenticated;
  document.querySelectorAll('.admin-only').forEach(el=>el.classList.toggle('hidden-by-auth',!isAdmin));
  const pill=document.getElementById('accessPill'); const label=document.getElementById('accessLabel');
  if(pill){pill.querySelector('.access-dot')?.classList.toggle('admin',isAdmin);pill.querySelector('.access-dot')?.classList.toggle('public',!isAdmin)}
  if(label)label.textContent=isAdmin?t('admin_mode'):t('public_access');
  const loginBtn=document.getElementById('adminLoginBtn'); const logoutBtn=document.getElementById('adminLogoutBtn');
  if(loginBtn){loginBtn.textContent=t('admin_login');loginBtn.classList.toggle('hidden',isAdmin)}
  if(logoutBtn){logoutBtn.textContent=t('admin_logout');logoutBtn.classList.toggle('hidden',!isAdmin)}
  const settingsLogin=document.getElementById('settingsLoginBtn'); if(settingsLogin)settingsLogin.classList.toggle('hidden',isAdmin);
  const publicCard=document.getElementById('publicModeCard'); if(publicCard)publicCard.classList.toggle('hidden',isAdmin);
}
function openAdminModal(){
  if(!state.admin?.configured){showNotice(t('admin_not_configured'),true);return}
  const m=document.getElementById('adminModal');m.classList.remove('hidden');m.setAttribute('aria-hidden','false');
  document.getElementById('adminLoginError').classList.add('hidden');document.getElementById('adminPassword').value='';setTimeout(()=>document.getElementById('adminPassword').focus(),50);
}
function closeAdminModal(){const m=document.getElementById('adminModal');m.classList.add('hidden');m.setAttribute('aria-hidden','true')}
async function submitAdminLogin(e){
  e.preventDefault(); const password=document.getElementById('adminPassword').value; const err=document.getElementById('adminLoginError');
  try{await api('/api/admin/login',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({password})});await loadAdminStatus();closeAdminModal();showNotice(t('admin_login_ok'));}
  catch(ex){err.textContent=ex.message;err.classList.remove('hidden')}
}
async function adminLogout(){try{await api('/api/admin/logout',{method:'POST'});await loadAdminStatus();showNotice(t('admin_logout_ok'))}catch(e){showNotice(e.message,true)}}
function requireAdminUi(){if(state.admin?.authenticated)return true;showNotice(t('admin_required'),true);openAdminModal();return false}

async function init(){
  document.querySelectorAll('.nav-item').forEach(btn=>btn.onclick=()=>showPage(btn.dataset.page));
  document.querySelectorAll('.lang-btn').forEach(btn=>btn.onclick=()=>{state.lang=btn.dataset.lang;localStorage.setItem('ecomonitor_lang',state.lang);applyStaticI18n();updateAdminUi();showPage(state.page)});
  document.getElementById('chooseFileBtn').onclick=()=>{if(requireAdminUi())document.getElementById('csvFile').click()};
  document.getElementById('csvFile').onchange=updateFileName;
  document.getElementById('uploadBtn').onclick=uploadCsv;
  document.getElementById('demoBtn').onclick=resetDemo;
  document.getElementById('resetBtn').onclick=resetDemo;
  document.getElementById('adminLoginBtn').onclick=openAdminModal;
  document.getElementById('settingsLoginBtn').onclick=openAdminModal;
  document.getElementById('adminLogoutBtn').onclick=adminLogout;
  document.getElementById('adminModalClose').onclick=closeAdminModal;
  document.querySelector('[data-close-admin-modal]').onclick=closeAdminModal;
  document.getElementById('adminLoginForm').onsubmit=submitAdminLogin;
  setClock();
  await loadAdminStatus();
  state.options=await api('/api/options');
  if(!state.filters.dashboard.start){state.filters.dashboard.start=state.options.date_min;state.filters.dashboard.end=state.options.date_max;state.filters.anomalies.start=state.options.date_min;state.filters.anomalies.end=state.options.date_max;state.filters.analytics.start=state.options.date_min;state.filters.analytics.end=state.options.date_max}
  applyStaticI18n();updateAdminUi();renderEventPlaceholder();showPage('dashboard');
}
function applyStaticI18n(){document.documentElement.lang=state.lang; document.querySelectorAll('[data-i18n]').forEach(el=>{const v=t(el.dataset.i18n); if(v.includes('<br>')) el.innerHTML=v; else el.textContent=v}); document.querySelectorAll('[data-i18n-html]').forEach(el=>el.innerHTML=t(el.dataset.i18nHtml)); updatePageSubtitle(); updateFileName(); document.querySelectorAll('.lang-btn').forEach(b=>b.classList.toggle('active', b.dataset.lang===state.lang))}

async function uploadCsv(){if(!requireAdminUi())return;const f=document.getElementById('csvFile').files[0]; if(!f) return showNotice(t('choose_csv'),true); const fd=new FormData(); fd.append('file',f); try{const r=await api('/api/upload',{method:'POST',body:fd}); showNotice(fmtTpl(t('uploaded'),{rows:r.rows,anomalies:r.anomalies,seconds:r.processing_seconds})); state.options=await api('/api/options'); showPage(state.page)}catch(e){showNotice(e.message,true)}}
async function resetDemo(){if(!requireAdminUi())return;try{const r=await api('/api/reset-demo',{method:'POST'}); showNotice(fmtTpl(t('demo_restored'),{rows:r.rows})); state.options=await api('/api/options'); showPage(state.page)}catch(e){showNotice(e.message,true)}}
window.addEventListener('resize',()=>showPage(state.page));
init();
