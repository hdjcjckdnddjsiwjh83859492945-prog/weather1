# Weather Forecast App

Учебное веб-приложение прогноза погоды по макету из Figma.

## Возможности

- получение данных о погоде через Open-Meteo API;
- текущая температура, влажность, ветер и состояние погоды;
- почасовой блок и прогноз на 10 дней;
- поиск и выбор города;
- настройки уведомлений, языка, темы, единиц измерения и города по умолчанию;
- экран ошибки сети и кнопка повторной загрузки.

## Запуск

```bash
pip install -r requirements.txt
uvicorn main:app --reload
```

После запуска откройте:

```text
http://127.0.0.1:8000
```

## Структура

```text
weather_forecast_app/
├── main.py
├── requirements.txt
├── README.md
├── templates/
│   └── index.html
└── static/
    ├── app.js
    └── styles.css
```
