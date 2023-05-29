class CityWeather {
  constructor(info) {
    this.info = info;
  }

  getCity() {
    mainCity.textContent = this.info.name;
  }

  getDates() {
    let dates = [];
    for (let i = 0; i < this.info.list.length; i++) {
      let newDate = new Date(this.info.list[i].dt * 1000).toLocaleString("en", {
        month: "long",
        day: "numeric",
        year: 'numeric',
        weekday: "short",
        timeZone: "UTC",
      });
      if (dates.indexOf(newDate) == -1) {
        dates.push(newDate);
      }
    }
    return dates;
  }

  getTodaysDate(day) {
    let date = new Date(this.info.dt * 1000);
    todaysDate.textContent = `${date.toDateString()}`;

    if (day) {
      for (let i = 0; i < 5; i++) {
        todaysDate.textContent = day;
      }
    }
  }

  getAllDays() {
    let date;
    date = new Date(this.info.list[0].dt * 1000);
    for (let i = 0; i < days.length; i++) {
      day[i].textContent = `${this.getDates()[i]}`;
      day[i].dataset.index = `${this.getDates()[i]}`;
    }
  }

  getDegrees() {
    let date;
    let count = 0;
    let newDate;
    for (let k = 0; k < this.getDates().length; k++) {
      let arrayDay = this.getDates()[k];
      let today = new Date(arrayDay).toISOString().slice(8, 10);
      for (let i = 0; i < this.info.list.length; i++) {
        date = this.info.list[i].dt_txt;
        if (count > 0) {
          newDate = `${date.slice(0, 8)}${today} 15:00:00`;
        }
        if (date == newDate) {
          day2[count].innerHTML =
            Math.floor(this.info.list[i].main.temp) + " t&#176;";
          images[count].src =
            "https://openweathermap.org/img/wn/" +
            this.info.list[i].weather[0].icon +
            "@2x.png";
          count++;
          newDate = `${date.slice(0, 8)}${today} 15:00:00`;
        } else if (
          count == 0 &&
          date == `${date.slice(0, 8)}${today} 21:00:00`
        ) {
          day2[count].innerHTML =
            Math.floor(this.info.list[i].main.temp) + " t&#176;";
          images[count].src =
            "https://openweathermap.org/img/wn/" +
            this.info.list[i].weather[0].icon +
            "@2x.png";
          count = 1;
          newDate = `${date.slice(0, 8)}${today + count} 15:00:00`;
        }
      }
    }
  }

  getInfo(newDate) {
    if (newDate) {
      for (let i = 0; i < this.info.list.length; i++) {
        let dt = this.info.list[i].dt_txt;
        let data = dt.slice(8, 10);
        let time = dt.slice(11, 19);
        let dayTimes = dt.replace(data, newDate);
        dayTimes = dayTimes.replace(time, "15:00:00");

        if (dayTimes == dt) {
          infoWindPerSecond.textContent = this.info.list[i].wind.speed + " m/s";
          infoFill.innerHTML =
            Math.floor(this.info.list[i].main.feels_like) + " t&#176;";
          infoPressure.textContent = this.info.list[i].main.pressure + " mmHg";
        }
      }
    } else {
      infoWindPerSecond.textContent = this.info.wind.speed + " m/s";
      infoFill.innerHTML = Math.floor(this.info.main.feels_like) + " t&#176;";
      infoPressure.textContent = this.info.main.pressure + " mmHg";
      infoTimeSunrise.textContent =
        new Date(this.info.sys.sunrise * 1000).getHours() + " a.m";
      infoTimeSunset.textContent =
        new Date(this.info.sys.sunset * 1000).getHours() + " p.m";
    }
  }

  getTemperature(newDate) {
    let date = new Date().toISOString().slice(0, 10).split("-").join("-");

    if (newDate) {
      let day = new Date(newDate)
        .toLocaleString({
          month: "numeric",
        })
        .slice(0, 5)
        .split(".")
        .reverse()
        .join("-");

      let today = date.slice(5, 10);
      date = date.replace(today, day);
    }
    let timeArray = [];
    for (let i = 0; i < this.info.list.length; i++) {
      let dt = this.info.list[i].dt_txt;
      let d = dt.substr(0, 10);
      if (d == date) {
        let time = dt.substr(11, 5);
        for (let k = 0; k < timeList.length; k++) {
          if (timeArray.indexOf(time) == -1) timeArray.push(time);
          if (timeList[k].id == time) {
            timeList[k].innerHTML =
              Math.floor(this.info.list[i].main.temp) + " t&#176;";
          }
          if (timeArray.indexOf(timeList[k].id) == -1) {
            timeList[k].innerHTML = "-";
          }
        }
      }
    }
  }

  getOtherDates(date) {
    this.getTodaysDate(date);
    this.getTemperature(date);
    this.getInfo(date);
  }
}
