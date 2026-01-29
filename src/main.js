import "./assets/fonts.css";
import "./style.css";
import {
  weatherSearch,
  weatherCurrent,
  fetchJSON,
  normalizeWeatherData,
  createWeatherData,
} from "./modules/api";
import { createLocationItem, elements, updateWeatherCard } from "./modules/ui";

const weatherData = createWeatherData();
const API_KEY = "185f9080f22643cd89d35208262001";

const list = document.querySelector("#suggestions");
const search = document.querySelector("#weather-search");
let timeoutID;

function handleSearchInput(e) {
  clearTimeout(timeoutID);

  timeoutID = setTimeout(() => {
    const input = e.target?.value ?? "";

    if (input === "") {
      list.replaceChildren();
      suggestions.classList.remove("open");

      return;
    }

    const url = weatherSearch(API_KEY, input); // For location
    console.log(url);

    fetchJSON(url)
      .then((data) => {
        console.log(data);
        list.replaceChildren();

        if (data.length === 0) {
          suggestions.classList.remove("open");
          return;
        }

        suggestions.classList.add("open");

        data.forEach((item) => {
          const li = createLocationItem(item);
          list.appendChild(li);
        });
      })
      .catch((err) => {
        console.error(err);
      });
  }, 500);
}

// Search Input Event
search.addEventListener("input", handleSearchInput);

document.addEventListener("click", (e) => {
  const button = e.target.closest(".suggestion-item"); // In Suggestion
  const clickedInsideList = list.contains(e.target);
  const hasSuggestions = list.textContent.trim();
  const clickableWeatherItem = e.target.closest(".clickable");

  if (clickableWeatherItem && !weatherData.isEmpty()) {
    const id = clickableWeatherItem.id;

    if (id === "toggle-temperature") {
      weatherData.toggleTemperature();

      const { temperature, feelsLike, unit } = weatherData.getTemperature();

      // TEMPERATURE
      elements.temperature.textContent = `${temperature}${unit}`;

      // FEELS LIKE
      elements.feelsLike.textContent = `${feelsLike}${unit}`;

      return;
    } else if (id === "precipitation-toggle") {
      weatherData.togglePrecipitation();

      const { value, unit } = weatherData.getPrecipitation();

      // PRECIPTATION
      elements.precipitation.textContent = `${value} ${unit}`;

      return;
    } else if (id === "wind-speed-toggle") {
      weatherData.toggleWind();

      const { value, unit } = weatherData.getWind();

      // WIND SPEED
      elements.windSpeed.textContent = `${value} ${unit}`;
    } else if (id == "visibility-toggle") {
      weatherData.toggleVisibility();

      const { value, unit } = weatherData.getVisibility();

      // VISIBILITY
      elements.visibility.textContent = `${value} ${unit}`;
    }
  }

  // Open suggestions when clicking the search input
  if (e.target.id === "weather-search" && hasSuggestions) {
    suggestions.classList.add("open");
    return;
  }

  // Handle suggestion selection (click anywhere inside the button)
  if (button && clickedInsideList) {
    suggestions.classList.remove("open");
    const query = button.dataset.url;
    const url = weatherCurrent(API_KEY, query);
    console.log(url);

    fetchJSON(url)
      .then((data) => {
        const cleanData = normalizeWeatherData(data);
        weatherData.setData(cleanData);
        updateWeatherCard(weatherData.getFormatted());
      })
      .catch((err) => {
        console.error(err);
      });

    return;
  }

  // Close suggestions when clicking outside the suggestions list
  if (!clickedInsideList) {
    suggestions.classList.remove("open");
    return;
  }
});
