from __future__ import annotations

from datetime import datetime
from typing import Any, Literal

import httpx
from fastapi import FastAPI, HTTPException, Query, Request
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates


app = FastAPI(
    title="Weather Forecast App",
    description="Учебное приложение прогноза погоды с FastAPI и Open-Meteo.",
    version="1.0.0",
)

app.mount("/static", StaticFiles(directory="static"), name="static")
templates = Jinja2Templates(directory="templates")

GEOCODING_URL = "https://geocoding-api.open-meteo.com/v1/search"
FORECAST_URL = "https://api.open-meteo.com/v1/forecast"

WeatherUnits = Literal["celsius", "fahrenheit"]
ApiLanguage = Literal["en", "ru"]


WEATHER_CODES: dict[int, dict[str, str]] = {
    0: {"label": "Clear sky", "icon": "sun"},
    1: {"label": "Mainly clear", "icon": "sun"},
    2: {"label": "Partly cloudy", "icon": "cloud-sun"},
    3: {"label": "Overcast", "icon": "cloud"},
    45: {"label": "Fog", "icon": "fog"},
    48: {"label": "Rime fog", "icon": "fog"},
    51: {"label": "Light drizzle", "icon": "drizzle"},
    53: {"label": "Drizzle", "icon": "drizzle"},
    55: {"label": "Dense drizzle", "icon": "drizzle"},
    61: {"label": "Light rain", "icon": "rain"},
    63: {"label": "Rain", "icon": "rain"},
    65: {"label": "Heavy rain", "icon": "rain"},
    71: {"label": "Light snow", "icon": "snow"},
    73: {"label": "Snow", "icon": "snow"},
    75: {"label": "Heavy snow", "icon": "snow"},
    80: {"label": "Rain showers", "icon": "rain"},
    81: {"label": "Rain showers", "icon": "rain"},
    82: {"label": "Heavy showers", "icon": "storm"},
    95: {"label": "Thunderstorm", "icon": "storm"},
    96: {"label": "Thunderstorm hail", "icon": "storm"},
    99: {"label": "Heavy thunderstorm hail", "icon": "storm"},
}


def weather_meta(code: int | None) -> dict[str, str]:
    if code is None:
        return {"label": "Weather data", "icon": "cloud"}
    return WEATHER_CODES.get(code, {"label": "Weather data", "icon": "cloud"})


def round_value(value: Any) -> int | None:
    if value is None:
        return None
    return round(float(value))


async def fetch_json(url: str, params: dict[str, Any]) -> dict[str, Any]:
    try:
        async with httpx.AsyncClient(timeout=12) as client:
            response = await client.get(url, params=params)
            response.raise_for_status()
            data = response.json()
    except httpx.TimeoutException as exc:
        raise HTTPException(status_code=504, detail="Weather service timeout") from exc
    except httpx.HTTPError as exc:
        raise HTTPException(status_code=502, detail="Weather service is unavailable") from exc
    except ValueError as exc:
        raise HTTPException(status_code=502, detail="Invalid weather service response") from exc

    if not isinstance(data, dict):
        raise HTTPException(status_code=502, detail="Invalid weather service response")
    return data


async def geocode_city(city: str, language: ApiLanguage = "en") -> dict[str, Any]:
    data = await fetch_json(
        GEOCODING_URL,
        {
            "name": city,
            "count": 1,
            "language": language,
            "format": "json",
        },
    )
    results = data.get("results") or []
    if not results:
        raise HTTPException(status_code=404, detail="City was not found")
    return results[0]


@app.get("/", response_class=HTMLResponse)
async def index(request: Request) -> HTMLResponse:
    return templates.TemplateResponse("index.html", {"request": request})


@app.get("/api/search")
async def search_city(
    query: str = Query(..., min_length=2, max_length=80),
    limit: int = Query(6, ge=1, le=10),
    language: ApiLanguage = "en",
) -> dict[str, Any]:
    data = await fetch_json(
        GEOCODING_URL,
        {
            "name": query,
            "count": limit,
            "language": language,
            "format": "json",
        },
    )

    cities = []
    for item in data.get("results") or []:
        cities.append(
            {
                "id": item.get("id"),
                "name": item.get("name"),
                "country": item.get("country"),
                "admin1": item.get("admin1"),
                "latitude": item.get("latitude"),
                "longitude": item.get("longitude"),
                "timezone": item.get("timezone"),
            }
        )
    return {"cities": cities}


@app.get("/api/weather")
async def get_weather(
    city: str = Query("Bryansk", min_length=2, max_length=80),
    units: WeatherUnits = "celsius",
    language: ApiLanguage = "en",
) -> dict[str, Any]:
    location = await geocode_city(city, language=language)
    temperature_unit = "fahrenheit" if units == "fahrenheit" else "celsius"
    wind_speed_unit = "mph" if units == "fahrenheit" else "kmh"

    data = await fetch_json(
        FORECAST_URL,
        {
            "latitude": location["latitude"],
            "longitude": location["longitude"],
            "timezone": "auto",
            "temperature_unit": temperature_unit,
            "wind_speed_unit": wind_speed_unit,
            "current": "temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m,wind_direction_10m",
            "hourly": "temperature_2m,weather_code,relative_humidity_2m,wind_speed_10m",
            "daily": "weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max,wind_speed_10m_max",
            "forecast_days": 10,
        },
    )

    current = data.get("current") or {}
    hourly = data.get("hourly") or {}
    daily = data.get("daily") or {}
    code = current.get("weather_code")
    meta = weather_meta(code)

    hourly_items = []
    hourly_times = hourly.get("time") or []
    now_iso = current.get("time") or datetime.now().isoformat(timespec="minutes")
    current_index = 0
    for index, item_time in enumerate(hourly_times):
        if item_time >= now_iso:
            current_index = index
            break

    for index in range(current_index, min(current_index + 24, len(hourly_times))):
        item_code = hourly.get("weather_code", [None] * len(hourly_times))[index]
        hourly_items.append(
            {
                "time": hourly_times[index],
                "temperature": round_value(hourly.get("temperature_2m", [None] * len(hourly_times))[index]),
                "humidity": round_value(hourly.get("relative_humidity_2m", [None] * len(hourly_times))[index]),
                "wind": round_value(hourly.get("wind_speed_10m", [None] * len(hourly_times))[index]),
                "condition": weather_meta(item_code),
            }
        )

    forecast_items = []
    for index, day in enumerate(daily.get("time") or []):
        item_code = daily.get("weather_code", [None] * 10)[index]
        forecast_items.append(
            {
                "date": day,
                "max": round_value(daily.get("temperature_2m_max", [None] * 10)[index]),
                "min": round_value(daily.get("temperature_2m_min", [None] * 10)[index]),
                "precipitation": round_value(daily.get("precipitation_probability_max", [None] * 10)[index]),
                "windMax": round_value(daily.get("wind_speed_10m_max", [None] * 10)[index]),
                "condition": weather_meta(item_code),
            }
        )

    return {
        "city": {
            "name": location.get("name"),
            "country": location.get("country"),
            "admin1": location.get("admin1"),
            "timezone": location.get("timezone"),
            "latitude": location.get("latitude"),
            "longitude": location.get("longitude"),
        },
        "units": {
            "temperature": "°F" if units == "fahrenheit" else "°C",
            "wind": "mph" if units == "fahrenheit" else "km/h",
            "system": units,
        },
        "current": {
            "time": current.get("time"),
            "temperature": round_value(current.get("temperature_2m")),
            "feelsLike": round_value(current.get("apparent_temperature")),
            "humidity": round_value(current.get("relative_humidity_2m")),
            "wind": round_value(current.get("wind_speed_10m")),
            "windDirection": round_value(current.get("wind_direction_10m")),
            "weatherCode": code,
            "condition": meta,
        },
        "hourly": hourly_items,
        "forecast": forecast_items,
        "summary": f"{meta['label']} today, with temperatures from {forecast_items[0]['min']} to {forecast_items[0]['max']} degrees."
        if forecast_items
        else meta["label"],
    }
