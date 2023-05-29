let mainCity = document.querySelector("h1");
let todaysDate = document.querySelector(".cityName span");
let days = document.querySelectorAll(".day");
let images = document.querySelectorAll("img");
let day = document.querySelectorAll(".day :nth-child(2)");
let day2 = document.querySelectorAll(".day :nth-child(3)");
let infoWindPerSecond = document.querySelector("#infoWindPerSecond");
let infoFill = document.querySelector("#infoFill");
let infoPressure = document.querySelector("#infoPressure");
let infoTimeSunrise = document.querySelector("#infoTimeSunrise");
let infoTimeSunset = document.querySelector("#infoTimeSunset");
let timeList = document.querySelectorAll(".time-list :nth-child(1)");
let citySelect = document.querySelector("#citySelect");
let temperature = document.querySelector("#temperature");
let changeDay = document.querySelector("#days");
let cityId = null;
let temp = null;
let citiesArr = [
  { name: "London", id: "2643743" },
  { name: "Kyiv", id: "703448" },
  { name: "New York", id: "5128638" },
  { name: "Kharkiv", id: "706483" },
  { name: "Boston", id: "4930956" },
  { name: "Chernivtsi", id: "710741" },
  { name: "Montevideo", id: "3441575" },
  { name: "Voronezh", id: "472045" },
];

function initializeData() {
  days.forEach((elem) => {
    elem.style.backgroundColor = "#1e038b";
  });
  if (!cityId || !temp) {
    citiesArr.forEach((city) => {
      if (citySelect.value == city.name) cityId = city.id;
      if (!temp) temp = "metric";
      initializeData();
    });
  } else {
    (weatherList = new WeatherList(cityId, temp));
      weatherList.showWeather();
      weatherList.showForecast();
      return;
    }
}
temperature.addEventListener("input", function (e) {
  if (e.target.value == "Сelsius") {
    temp = "metric";
  } else {
    temp = "imperial";
  }
  initializeData();
});

citySelect.addEventListener("input", function (e) {
  citiesArr.forEach((city) => {
    if (city.name == e.target.value) {
      cityId = city.id;
      initializeData();
    }
  });
});

initializeData();

days.forEach((day) => {
  day.addEventListener("click", () => {
    days.forEach((elem) => {
      elem.style.backgroundColor = "#1e038b";
    });
    let span = day.querySelector("span");
    day.style.backgroundColor = "#336eef";
    weatherList = new WeatherList(cityId, temp, span.dataset.index)
    weatherList.showForecast()
    
  });
});
