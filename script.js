let cityServise = {
  getCityInfoWeather(cityId, temp) {
    return fetch(
      "https://api.openweathermap.org/data/2.5/weather?id=" +
        cityId +
        "&appid=bf35cac91880cb98375230fb443a116f&units=" +
        temp
    ).then((resObj) => resObj.json());
  },

  getCityInfoForecast(cityId, temp) {
    return fetch(
      "https://api.openweathermap.org/data/2.5/forecast?id=" +
        cityId +
        "&appid=bf35cac91880cb98375230fb443a116f&units=" +
        temp
    ).then((resObj) => resObj.json());
  },
};
