export function createLocationItem(item) {
  const btn = document.createElement("button");
  btn.dataset.id = item.id;
  btn.dataset.url = item.url;
  btn.className = "suggestion-item";

  const title = document.createElement("div");
  title.className = "suggestion-title";
  title.textContent = `${item.name}, ${item.region}`;

  btn.appendChild(title);

  const subtitle = document.createElement("div");
  subtitle.className = " suggestion-subtitle";
  subtitle.textContent = `${item.country}`;

  btn.appendChild(subtitle);

  return btn;
}

function createWeatherIcon(src) {
  const img = document.createElement("img");
  img.src = src;
  img.alt = "Weather ICON";
  img.className = "weather-icon";

  return img;
}

const elements = {
  weatherIconContainer: document.querySelector("#weather-icon-container"),
  temperature: document.querySelector("#temperature"),
  conditionText: document.querySelector("#condition"),

  location: document.querySelector("#location"),
  feelsLike: document.querySelector("#feels-like"),

  precipitation: document.querySelector("#precipitation"),
  windSpeed: document.querySelector("#wind-speed"),
  humidity: document.querySelector("#humidity"),
  uv: document.querySelector("#uv-index"),
  visibility: document.querySelector("#visibility"),
  cloudCover: document.querySelector("#cloud-cover"),
}; // DOM Elements

export function updateWeatherCard(data) {
  // ICON
  const weatherIcon = createWeatherIcon(data.conditionIcon);
  elements.weatherIconContainer.replaceChildren();
  elements.weatherIconContainer.appendChild(weatherIcon);

  // TEMPERATURE
  elements.temperature.textContent = `${data.temperature}${data.tempUnit}`;
  elements.conditionText.textContent = data.conditionText;

  // LOCATION
  elements.location.textContent = data.location;

  // FEELS LIKE
  elements.feelsLike.textContent = `${data.feelsLike}${data.tempUnit}`;

  // PRECIPTATION
  elements.precipitation.textContent = `${data.precipitation}${data.precipUnit}`;

  // WIND SPEED
  elements.windSpeed.textContent = `${data.windSpeed}${data.windUnit}`;

  // HUMIDITY
  elements.humidity.textContent = `${data.humidity}%`;

  // UV
  elements.uv.textContent = data.uv;

  // VISIBILITY
  elements.visibility.textContent = `${data.visibility}${data.visibilityUnit}`;

  // CLOUD COVER
  elements.cloudCover.textContent = `${data.cloudCover}%`;
}
