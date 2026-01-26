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
