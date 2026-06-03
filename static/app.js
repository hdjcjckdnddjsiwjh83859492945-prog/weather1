const STORAGE_KEY = "weather_forecast_app_v1";

const DEFAULT_CITIES = ["New York", "London", "Berlin", "Beijing", "Shanghai"];
const DEFAULT_CITIES_RU = ["Нью-Йорк", "Лондон", "Берлин", "Пекин", "Шанхай"];

const WEATHER_BACKGROUNDS = {
  clearDay: "/static/assets/weather-clear-day.png",
  clearNight: "/static/assets/weather-clear-night.png",
  cloudy: "/static/assets/weather-cloudy.png",
  rain: "/static/assets/weather-rain-clouds.png",
  rainNight: "/static/assets/weather-rain-night.png"
};

const TEXT = {
  en: {
    loading: "Loading weather...",
    notFound: "City was not found",
    saved: "Default city saved",
    chooseDefault: "Choose a default city",
    notifications: "Notifications enabled",
    searchTitle: "Weather",
    settingsTitle: "Settings",
    searchPlaceholder: "Search for a city or airport",
    forecastTitle: "10-day forecast",
    notificationsLabel: "Notifications",
    languageLabel: "Language",
    unitsLabel: "Units",
    aboutLabel: "About",
    versionLabel: "Version 1.0.0",
    themeLabel: "Theme",
    defaultCityLabel: "Default City",
    errorTitle: "Network error",
    errorText: "It looks like you don't have a network.",
    retry: "Retry",
    high: "H",
    low: "L",
    now: "Now",
    humidity: "Humidity",
    wind: "Wind",
    summary: "{condition} today, with temperatures from {min} to {max} degrees.",
    light: "Light",
    black: "Black"
  },
  ru: {
    loading: "Загружаем погоду...",
    notFound: "Город не найден",
    saved: "Город по умолчанию сохранен",
    chooseDefault: "Выберите город по умолчанию",
    notifications: "Уведомления включены",
    searchTitle: "Погода",
    settingsTitle: "Настройки",
    searchPlaceholder: "Поиск города или аэропорта",
    forecastTitle: "Прогноз на 10 дней",
    notificationsLabel: "Уведомления",
    languageLabel: "Язык",
    unitsLabel: "Единицы",
    aboutLabel: "О приложении",
    versionLabel: "Версия 1.0.0",
    themeLabel: "Тема",
    defaultCityLabel: "Город",
    errorTitle: "Ошибка сети",
    errorText: "Похоже, у вас нет подключения к интернету.",
    retry: "Повторить",
    high: "В",
    low: "Н",
    now: "Сейчас",
    humidity: "Влажность",
    wind: "Ветер",
    summary: "{condition} сегодня, температура от {min} до {max} градусов.",
    light: "Светлая",
    black: "Черная"
  }
};

const CONDITION_RU = {
  "Clear sky": "Ясно",
  "Mainly clear": "Преимущественно ясно",
  "Partly cloudy": "Переменная облачность",
  "Overcast": "Пасмурно",
  "Fog": "Туман",
  "Rime fog": "Инейный туман",
  "Light drizzle": "Небольшая морось",
  "Drizzle": "Морось",
  "Dense drizzle": "Сильная морось",
  "Light rain": "Небольшой дождь",
  "Rain": "Дождь",
  "Heavy rain": "Сильный дождь",
  "Light snow": "Небольшой снег",
  "Snow": "Снег",
  "Heavy snow": "Сильный снег",
  "Rain showers": "Ливневый дождь",
  "Heavy showers": "Сильный ливень",
  "Thunderstorm": "Гроза",
  "Thunderstorm hail": "Гроза с градом",
  "Heavy thunderstorm hail": "Сильная гроза с градом",
  "Weather data": "Данные погоды"
};

const ICONS = {
  home: `<svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round"><path d="m3 11 9-8 9 8"/><path d="M5 10v10h5v-6h4v6h5V10"/></svg>`,
  search: `<svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.1" stroke-linecap="round"><circle cx="10.8" cy="10.8" r="7.2"/><path d="m16.3 16.3 5 5"/></svg>`,
  settings: `<svg viewBox="0 0 24 24" fill="white"><path d="M19.4 13.5c.1-.5.1-.9.1-1.5s0-1-.1-1.5l2-1.5-2-3.4-2.4 1a7.4 7.4 0 0 0-2.6-1.5L14 2.5h-4l-.4 2.6A7.4 7.4 0 0 0 7 6.6l-2.4-1-2 3.4 2 1.5c-.1.5-.1.9-.1 1.5s0 1 .1 1.5l-2 1.5 2 3.4 2.4-1a7.4 7.4 0 0 0 2.6 1.5l.4 2.6h4l.4-2.6a7.4 7.4 0 0 0 2.6-1.5l2.4 1 2-3.4-2-1.5ZM12 15.6A3.6 3.6 0 1 1 12 8a3.6 3.6 0 0 1 0 7.2Z"/></svg>`,
  refresh: `<svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6v6h-6"/><path d="M20 12a8 8 0 1 0-2.3 5.7"/></svg>`
};

const WEATHER_ICONS = {
  sun: `<svg viewBox="0 0 32 32"><circle cx="16" cy="16" r="6" fill="#ffd200"/><g stroke="#ffd200" stroke-width="2.4" stroke-linecap="round"><path d="M16 2v5"/><path d="M16 25v5"/><path d="M2 16h5"/><path d="M25 16h5"/><path d="m6 6 3.5 3.5"/><path d="m22.5 22.5 3.5 3.5"/><path d="m26 6-3.5 3.5"/><path d="m9.5 22.5-3.5 3.5"/></g></svg>`,
  "cloud-sun": `<svg viewBox="0 0 32 32"><circle cx="12" cy="12" r="5" fill="#ffd200"/><path d="M10 23h15a5 5 0 0 0 0-10 8 8 0 0 0-15.2 2.4A4.4 4.4 0 0 0 10 23Z" fill="#dce8f2"/></svg>`,
  cloud: `<svg viewBox="0 0 32 32"><path d="M8 23h17a5.4 5.4 0 0 0 0-10.8A8.5 8.5 0 0 0 8.5 15 4 4 0 0 0 8 23Z" fill="#dce8f2"/></svg>`,
  rain: `<svg viewBox="0 0 32 32"><path d="M8 18h17a5.2 5.2 0 0 0 0-10.4A8.4 8.4 0 0 0 8.5 10 4.2 4.2 0 0 0 8 18Z" fill="#dce8f2"/><g stroke="#56c7ff" stroke-width="2.2" stroke-linecap="round"><path d="m10 23-2 4"/><path d="m17 23-2 4"/><path d="m24 23-2 4"/></g></svg>`,
  drizzle: `<svg viewBox="0 0 32 32"><path d="M8 18h17a5.2 5.2 0 0 0 0-10.4A8.4 8.4 0 0 0 8.5 10 4.2 4.2 0 0 0 8 18Z" fill="#dce8f2"/><g fill="#56c7ff"><circle cx="10" cy="25" r="1.4"/><circle cx="17" cy="25" r="1.4"/><circle cx="24" cy="25" r="1.4"/></g></svg>`,
  snow: `<svg viewBox="0 0 32 32"><path d="M8 18h17a5.2 5.2 0 0 0 0-10.4A8.4 8.4 0 0 0 8.5 10 4.2 4.2 0 0 0 8 18Z" fill="#dce8f2"/><g fill="white"><circle cx="10" cy="25" r="1.8"/><circle cx="17" cy="25" r="1.8"/><circle cx="24" cy="25" r="1.8"/></g></svg>`,
  storm: `<svg viewBox="0 0 32 32"><path d="M8 17h17a5.2 5.2 0 0 0 0-10.4A8.4 8.4 0 0 0 8.5 9 4.2 4.2 0 0 0 8 17Z" fill="#dce8f2"/><path d="m16 18-4 7h5l-2 5 7-9h-5l3-3Z" fill="#ffd200"/></svg>`,
  fog: `<svg viewBox="0 0 32 32"><path d="M8 16h17a5.2 5.2 0 0 0 0-10.4A8.4 8.4 0 0 0 8.5 8 4.2 4.2 0 0 0 8 16Z" fill="#dce8f2"/><g stroke="white" stroke-width="2.2" stroke-linecap="round"><path d="M6 22h20"/><path d="M9 27h17"/></g></svg>`
};

const dom = {
  screens: document.querySelectorAll(".screen"),
  navButtons: document.querySelectorAll("[data-nav]"),
  iconSlots: document.querySelectorAll("[data-icon]"),
  homeCity: document.getElementById("homeCity"),
  currentTemp: document.getElementById("currentTemp"),
  degreeSymbol: document.getElementById("degreeSymbol"),
  conditionLabel: document.getElementById("conditionLabel"),
  highPrefix: document.getElementById("highPrefix"),
  lowPrefix: document.getElementById("lowPrefix"),
  dailyHigh: document.getElementById("dailyHigh"),
  dailyLow: document.getElementById("dailyLow"),
  summaryText: document.getElementById("summaryText"),
  forecastTitle: document.getElementById("forecastTitle"),
  hourlyList: document.getElementById("hourlyList"),
  forecastList: document.getElementById("forecastList"),
  searchTitle: document.getElementById("searchTitle"),
  settingsTitle: document.getElementById("settingsTitle"),
  cityInput: document.getElementById("cityInput"),
  cityList: document.getElementById("cityList"),
  searchForm: document.getElementById("searchForm"),
  notificationsLabel: document.getElementById("notificationsLabel"),
  languageLabel: document.getElementById("languageLabel"),
  unitsLabel: document.getElementById("unitsLabel"),
  aboutLabel: document.getElementById("aboutLabel"),
  versionLabel: document.getElementById("versionLabel"),
  themeLabel: document.getElementById("themeLabel"),
  defaultCityLabel: document.getElementById("defaultCityLabel"),
  defaultCityValue: document.getElementById("defaultCityValue"),
  languageValue: document.getElementById("languageValue"),
  themeValue: document.getElementById("themeValue"),
  notificationsToggle: document.getElementById("notificationsToggle"),
  errorTitle: document.getElementById("errorTitle"),
  errorText: document.getElementById("errorText"),
  retryButton: document.getElementById("retryButton"),
  toast: document.getElementById("toast")
};

let state = {
  city: "Bryansk",
  defaultCity: "Bryansk",
  units: "celsius",
  language: "en",
  theme: "black",
  notifications: false,
  lastWeather: null
};

let toastTimer = null;
let searchTimer = null;
let cityPreviewCache = new Map();
let pickingDefaultCity = false;

function cityCacheKey(city) {
  const name = typeof city === "string" ? city : city.name;
  const timezone = typeof city === "string" ? "" : (city.timezone || "");
  return `${name}|${timezone}`;
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify({
    city: state.city,
    defaultCity: state.defaultCity,
    units: state.units,
    language: state.language,
    theme: state.theme,
    notifications: state.notifications
  }));
}

function loadState() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
    state = { ...state, ...saved };
  } catch {
    saveState();
  }
}

function showScreen(name) {
  dom.screens.forEach((screen) => screen.classList.toggle("is-active", screen.dataset.screen === name));
  dom.navButtons.forEach((button) => button.classList.toggle("is-active", button.dataset.nav === name));
}

function showToast(message) {
  dom.toast.textContent = message;
  dom.toast.classList.add("is-visible");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => dom.toast.classList.remove("is-visible"), 2400);
}

function unitSymbol() {
  return state.units === "fahrenheit" ? "°F" : "°C";
}

function locale() {
  return state.language === "ru" ? "ru-RU" : "en-US";
}

function translateCondition(label) {
  return state.language === "ru" ? (CONDITION_RU[label] || label) : label;
}

function languageParam() {
  return state.language === "ru" ? "ru" : "en";
}

function getDefaultCities() {
  return state.language === "ru" ? DEFAULT_CITIES_RU : DEFAULT_CITIES;
}

function isNightTime(time) {
  const hour = Number((time || "").split("T")[1]?.slice(0, 2));
  if (Number.isFinite(hour)) {
    return hour < 6 || hour >= 20;
  }
  return false;
}

function chooseWeatherBackgroundByCode(weatherCode, time) {
  const code = Number(weatherCode);
  const night = isNightTime(time);
  const isRain = [51, 53, 55, 61, 63, 65, 80, 81, 82, 95, 96, 99].includes(code);
  const isCloudy = [2, 3, 45, 48].includes(code);

  if (isRain && night) {
    return WEATHER_BACKGROUNDS.rainNight;
  }
  if (isRain) {
    return WEATHER_BACKGROUNDS.rain;
  }
  if (isCloudy) {
    return WEATHER_BACKGROUNDS.cloudy;
  }
  return night ? WEATHER_BACKGROUNDS.clearNight : WEATHER_BACKGROUNDS.clearDay;
}

function chooseWeatherBackground(data) {
  return chooseWeatherBackgroundByCode(data.current.weatherCode, data.current.time);
}

function applyWeatherBackground(data) {
  const homeScreen = document.querySelector(".screen--home");
  homeScreen?.style.setProperty("--weather-bg", `url("${chooseWeatherBackground(data)}")`);
}

function buildSummary(data) {
  const today = data.forecast[0] || {};
  return TEXT[state.language].summary
    .replace("{condition}", translateCondition(data.current.condition.label))
    .replace("{min}", today.min ?? "--")
    .replace("{max}", today.max ?? "--");
}

function formatTemp(value, withUnit = false) {
  if (value === null || value === undefined) {
    return "--";
  }
  return `${value}${withUnit ? unitSymbol().replace("°", "°") : ""}`;
}

function formatHour(isoString, index) {
  if (index === 0) {
    return TEXT[state.language].now;
  }
  return new Intl.DateTimeFormat(locale(), { hour: "numeric" }).format(new Date(isoString));
}

function formatDay(dateString, index) {
  if (index === 0) {
    return state.language === "ru" ? "Сегодня" : "Today";
  }
  return new Intl.DateTimeFormat(locale(), { weekday: "short" }).format(new Date(dateString));
}

function renderWeatherIcon(iconName) {
  return WEATHER_ICONS[iconName] || WEATHER_ICONS.cloud;
}

function renderWeather(data) {
  state.lastWeather = data;
  const forecastToday = data.forecast[0] || {};
  applyWeatherBackground(data);
  dom.homeCity.textContent = data.city.name;
  dom.currentTemp.textContent = formatTemp(data.current.temperature);
  dom.degreeSymbol.textContent = "°";
  dom.conditionLabel.textContent = `${translateCondition(data.current.condition.label)} · ${TEXT[state.language].humidity} ${data.current.humidity ?? "--"}% · ${TEXT[state.language].wind} ${data.current.wind ?? "--"} ${data.units.wind}`;
  dom.dailyHigh.textContent = `${formatTemp(forecastToday.max)}°`;
  dom.dailyLow.textContent = `${formatTemp(forecastToday.min)}°`;
  dom.summaryText.textContent = buildSummary(data);

  dom.hourlyList.innerHTML = data.hourly.map((hour, index) => `
    <article class="hour-item">
      <time>${formatHour(hour.time, index)}</time>
      <span class="weather-icon">${renderWeatherIcon(hour.condition.icon)}</span>
      <strong>${formatTemp(hour.temperature)}°</strong>
    </article>
  `).join("");

  dom.forecastList.innerHTML = data.forecast.slice(0, 10).map((day, index) => `
    <article class="forecast-row">
      <span>${formatDay(day.date, index)}</span>
      <span class="weather-icon">${renderWeatherIcon(day.condition.icon)}</span>
      <span class="range">${formatTemp(day.min)}°-${formatTemp(day.max)}°</span>
    </article>
  `).join("");

  dom.defaultCityValue.textContent = state.defaultCity;
}

async function fetchWeather(city = state.city) {
  dom.conditionLabel.textContent = TEXT[state.language].loading;
  try {
    const response = await fetch(`/api/weather?city=${encodeURIComponent(city)}&units=${state.units}&language=${languageParam()}`);
    if (!response.ok) {
      throw new Error(response.status === 404 ? TEXT[state.language].notFound : "Network error");
    }
    const data = await response.json();
    const requestedDefault = state.defaultCity === city;
    state.city = data.city.name;
    if (requestedDefault) {
      state.defaultCity = data.city.name;
    }
    saveState();
    renderWeather(data);
    showScreen("home");
  } catch (error) {
    if (!navigator.onLine || error.message === "Network error") {
      showScreen("error");
    } else {
      showToast(error.message || TEXT[state.language].notFound);
      showScreen("search");
    }
  }
}

async function searchCities(query) {
  if (query.trim().length < 2) {
    renderDefaultCities();
    return;
  }

  try {
    const response = await fetch(`/api/search?query=${encodeURIComponent(query)}&limit=6&language=${languageParam()}`);
    if (!response.ok) {
      throw new Error("Search error");
    }
    const data = await response.json();
    renderCityList(data.cities);
    hydrateCityPreviews(data.cities);
  } catch {
    showScreen("error");
  }
}

async function fetchCityPreview(city) {
  const response = await fetch(`/api/weather?city=${encodeURIComponent(city.name)}&units=${state.units}&language=${languageParam()}`);
  if (!response.ok) {
    throw new Error(city.name);
  }

  const data = await response.json();
  const preview = {
    temperature: data.current.temperature,
    admin1: data.city.admin1,
    country: data.city.country,
    timezone: data.city.timezone,
    weatherCode: data.current.weatherCode,
    currentTime: data.current.time,
    background: chooseWeatherBackground(data)
  };

  cityPreviewCache.set(cityCacheKey(city), preview);
  cityPreviewCache.set(city.name, preview);
  return preview;
}

async function hydrateCityPreviews(cities) {
  const missingCities = cities.filter((city) => !cityPreviewCache.has(cityCacheKey(city)));
  if (!missingCities.length) {
    return;
  }

  const previews = await Promise.allSettled(missingCities.map(fetchCityPreview));
  if (previews.some((item) => item.status === "fulfilled")) {
    renderCityList(cities);
  }
}

function renderCityList(cities) {
  dom.cityList.innerHTML = "";
  cities.forEach((city) => {
    const cached = cityPreviewCache.get(cityCacheKey(city)) || cityPreviewCache.get(city.name);
    const cachedTemperature = city.temperature ?? cached?.temperature ?? "";
    const timeZone = city.timezone ?? cached?.timezone;
    const background = city.background ?? cached?.background ?? WEATHER_BACKGROUNDS.cloudy;
    const card = document.createElement("button");
    card.className = "city-card";
    card.type = "button";
    card.style.setProperty("--image", `url("${background}")`);
    card.dataset.city = city.name;
    card.innerHTML = `
      <span>
        <strong>${escapeHtml(city.name)}</strong>
        <span>${escapeHtml(localTimeLabel(timeZone))}</span>
      </span>
      <em>${cachedTemperature !== "" ? `${cachedTemperature}°` : ""}</em>
    `;
    dom.cityList.append(card);
  });
}

async function renderDefaultCities() {
  const defaultCities = getDefaultCities();
  renderCityList(defaultCities.map((name) => ({
    name,
    timezone: cityPreviewCache.get(name)?.timezone,
    temperature: cityPreviewCache.get(name)?.temperature ?? "",
    background: cityPreviewCache.get(name)?.background
  })));

  const missingCities = defaultCities.filter((name) => !cityPreviewCache.has(name));
  if (!missingCities.length) {
    return;
  }

  const previews = await Promise.allSettled(missingCities.map((name) => fetchCityPreview({ name })));

  if (previews.some((item) => item.status === "fulfilled")) {
    renderCityList(defaultCities.map((name) => ({
      name,
      admin1: cityPreviewCache.get(name)?.admin1,
      country: cityPreviewCache.get(name)?.country,
      timezone: cityPreviewCache.get(name)?.timezone,
      temperature: cityPreviewCache.get(name)?.temperature ?? "",
      background: cityPreviewCache.get(name)?.background
    })));
  }
}

function localTimeLabel(timeZone) {
  const options = { hour: "numeric", minute: "2-digit" };
  if (timeZone) {
    options.timeZone = timeZone;
  }
  try {
    return new Intl.DateTimeFormat(locale(), options).format(new Date());
  } catch {
    return new Intl.DateTimeFormat(locale(), { hour: "numeric", minute: "2-digit" }).format(new Date());
  }
}

function syncSettings() {
  const text = TEXT[state.language];
  document.body.classList.toggle("light", state.theme === "light");
  dom.searchTitle.textContent = text.searchTitle;
  dom.settingsTitle.textContent = text.settingsTitle;
  dom.cityInput.placeholder = text.searchPlaceholder;
  dom.forecastTitle.textContent = text.forecastTitle;
  dom.notificationsLabel.textContent = text.notificationsLabel;
  dom.languageLabel.textContent = text.languageLabel;
  dom.unitsLabel.textContent = text.unitsLabel;
  dom.aboutLabel.textContent = text.aboutLabel;
  dom.versionLabel.textContent = text.versionLabel;
  dom.themeLabel.textContent = text.themeLabel;
  dom.defaultCityLabel.textContent = text.defaultCityLabel;
  dom.errorTitle.textContent = text.errorTitle;
  dom.errorText.textContent = text.errorText;
  dom.retryButton.textContent = text.retry;
  dom.highPrefix.textContent = text.high;
  dom.lowPrefix.textContent = text.low;
  dom.languageValue.textContent = state.language === "en" ? "Eng" : "Rus";
  dom.themeValue.textContent = state.theme === "black" ? text.black : text.light;
  dom.defaultCityValue.textContent = state.defaultCity;
  dom.notificationsToggle.checked = state.notifications;
  document.querySelectorAll("[data-unit]").forEach((button) => {
    button.classList.toggle("is-active", button.dataset.unit === state.units);
  });

  if (state.lastWeather) {
    renderWeather(state.lastWeather);
  }
}

function escapeHtml(value) {
  return String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function bindEvents() {
  dom.navButtons.forEach((button) => {
    button.addEventListener("click", () => {
      showScreen(button.dataset.nav);
      if (button.dataset.nav === "search") {
        dom.cityInput.focus();
      }
    });
  });

  document.addEventListener("click", (event) => {
    const action = event.target.closest("[data-action]")?.dataset.action;
    if (action === "refresh" || action === "retry") fetchWeather();
    if (action === "open-search") showScreen("search");
    if (action === "toggle-language") {
      state.language = state.language === "en" ? "ru" : "en";
      cityPreviewCache = new Map();
      syncSettings();
      renderDefaultCities();
      saveState();
      fetchWeather(state.city);
    }
    if (action === "toggle-theme") {
      state.theme = state.theme === "black" ? "light" : "black";
      syncSettings();
      saveState();
    }
    if (action === "set-default-city") {
      pickingDefaultCity = true;
      dom.cityInput.value = "";
      renderDefaultCities();
      showScreen("search");
      dom.cityInput.focus();
      showToast(TEXT[state.language].chooseDefault);
    }
  });

  document.querySelectorAll("[data-unit]").forEach((button) => {
    button.addEventListener("click", () => {
      state.units = button.dataset.unit;
      cityPreviewCache = new Map();
      syncSettings();
      saveState();
      fetchWeather(state.city);
    });
  });

  dom.notificationsToggle.addEventListener("change", async () => {
    state.notifications = dom.notificationsToggle.checked;
    if (state.notifications && "Notification" in window) {
      await Notification.requestPermission();
      showToast(TEXT[state.language].notifications);
    }
    saveState();
  });

  dom.searchForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const city = dom.cityInput.value.trim();
    if (city) {
      if (pickingDefaultCity) {
        pickingDefaultCity = false;
        state.defaultCity = city;
        state.city = city;
        syncSettings();
        saveState();
        showToast(TEXT[state.language].saved);
      }
      fetchWeather(city);
    }
  });

  dom.cityInput.addEventListener("input", () => {
    clearTimeout(searchTimer);
    searchTimer = setTimeout(() => searchCities(dom.cityInput.value), 260);
  });

  dom.cityList.addEventListener("click", (event) => {
    const card = event.target.closest("[data-city]");
    if (card) {
      dom.cityInput.value = card.dataset.city;
      if (pickingDefaultCity) {
        pickingDefaultCity = false;
        state.defaultCity = card.dataset.city;
        state.city = card.dataset.city;
        syncSettings();
        saveState();
        showToast(TEXT[state.language].saved);
      }
      fetchWeather(card.dataset.city);
    }
  });

  window.addEventListener("offline", () => showScreen("error"));
  window.addEventListener("online", () => fetchWeather());
}

function injectIcons() {
  dom.iconSlots.forEach((slot) => {
    slot.innerHTML = ICONS[slot.dataset.icon] || "";
  });
}

function init() {
  loadState();
  injectIcons();
  bindEvents();
  syncSettings();
  renderDefaultCities();
  fetchWeather(state.defaultCity || state.city);
}

init();
