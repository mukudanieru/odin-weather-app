export function weatherSearch(key, query) {
  return `https://api.weatherapi.com/v1/search.json?key=${key}&q=${query}`;
}

export function weatherCurrent(key, location) {
  return `https://api.weatherapi.com/v1/current.json?key=${key}&q=${location}&aqi=no`;
}

export function fetchJSON(url) {
  return fetch(url).then((response) => {
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    return response.json();
  });
}

export function createWeatherData() {
  let data = null;
  let unit = "celsius";

  return {
    setData(newData) {
      data = newData;
    },

    getTemperature() {
      return {};
    },

    toggleUnit() {
      unit = unit === "celsius" ? "farenheit" : "celsius";
    },

    getFormatted() {
      if (!data) return null;

      return data;
    },
  };
}

export function normalizeWeatherData(data) {
  const {
    location: { name, region, country },
    current: {
      temp_c,
      temp_f,
      feelslike_c,
      feelslike_f,
      precip_mm,
      precip_in,
      wind_mph,
      wind_kph,
      humidity,
      uv,
      vis_km,
      vis_miles,
      cloud,
      condition: { icon, text },
    },
  } = data;

  return {
    conditionIcon: icon,
    conditionText: text,

    tempC: temp_c,
    tempF: temp_f,
    feelsLikeC: feelslike_c,
    feelsLikeF: feelslike_f,

    precipMm: precip_mm,
    precipIn: precip_in,

    windMph: wind_mph,
    windKph: wind_kph,

    humidity,
    uv,

    visibilityKm: vis_km,
    visibilityMiles: vis_miles,

    cloudCover: cloud,

    location: `${name}, ${region} from ${country}`,
  };
}
