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

const TEMP_UNIT = {
  CELSIUS: "celsius", // DEFAULT
  FAHRENHEIT: "fahrenheit",
};

const PRECIP_UNIT = {
  MM: "mm", // DEFAULT
  IN: "in",
};

const WIND_UNIT = {
  KPH: "kph", // DEFAULT
  MPH: "mph",
};

const VISIBILITY_UNIT = {
  KM: "km", // DEFAULT
  MILES: "miles",
};

export function createWeatherData() {
  let data = null;
  let tempUnit = TEMP_UNIT.CELSIUS;
  let precipUnit = PRECIP_UNIT.MM;
  let windUnit = WIND_UNIT.KPH;
  let visibilityUnit = VISIBILITY_UNIT.KM;

  return {
    setData(newData) {
      data = newData;
    },

    // Temperature
    toggleTemperature() {
      tempUnit =
        tempUnit === TEMP_UNIT.CELSIUS
          ? TEMP_UNIT.FAHRENHEIT
          : TEMP_UNIT.CELSIUS;
    },

    getTemperature() {
      if (!data) return null;
      const isCelsius = tempUnit === TEMP_UNIT.CELSIUS;

      return {
        temperature: isCelsius ? data.tempC : data.tempF,
        feelsLike: isCelsius ? data.feelsLikeC : data.feelsLikeF,
        unit: isCelsius ? "°C" : "°F",
      };
    },

    // Precipitation
    togglePrecipitation() {
      precipUnit =
        precipUnit === PRECIP_UNIT.MM ? PRECIP_UNIT.IN : PRECIP_UNIT.MM;
    },

    getPrecipitation() {
      if (!data) return null;
      const isMm = precipUnit === PRECIP_UNIT.MM;

      return {
        value: isMm ? data.precipMm : data.precipIn,
        unit: isMm ? "mm" : "in",
      };
    },

    // Wind
    toggleWind() {
      windUnit = windUnit === WIND_UNIT.KPH ? WIND_UNIT.MPH : WIND_UNIT.KPH;
    },

    getWind() {
      if (!data) return null;
      const isKph = windUnit === WIND_UNIT.KPH;

      return {
        value: isKph ? data.windKph : data.windMph,
        unit: isKph ? "km/h" : "mph",
      };
    },

    // Visibility
    toggleVisibility() {
      visibilityUnit =
        visibilityUnit === VISIBILITY_UNIT.KM
          ? VISIBILITY_UNIT.MILES
          : VISIBILITY_UNIT.KM;
    },

    getVisibility() {
      if (!data) return null;
      const isKm = visibilityUnit === VISIBILITY_UNIT.KM;

      return {
        value: isKm ? data.visibilityKm : data.visibilityMiles,
        unit: isKm ? "km" : "mi",
      };
    },

    isEmpty() {
      return !data;
    },

    // Get all formatted data
    getFormatted() {
      if (!data) return null;

      const temp = this.getTemperature();
      const precip = this.getPrecipitation();
      const wind = this.getWind();
      const visibility = this.getVisibility();

      return {
        conditionIcon: data.conditionIcon,
        temperature: temp.temperature,
        tempUnit: temp.unit,
        conditionText: data.conditionText,

        location: data.location,

        feelsLike: temp.feelsLike,

        precipitation: precip.value,
        precipUnit: precip.unit,

        windSpeed: wind.value,
        windUnit: wind.unit,

        humidity: data.humidity,

        uv: data.uv,

        visibility: visibility.value,
        visibilityUnit: visibility.unit,

        cloudCover: data.cloudCover,
      };
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
