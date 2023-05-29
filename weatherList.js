class WeatherList{
    constructor(city, temp, date){
        this.city = city,
        this.temp = temp,
        this.date = date
    }


    showWeather(){
        let promiseArray = [];
        promiseArray.push(cityServise.getCityInfoWeather(this.city, this.temp))
        Promise.all(promiseArray)
        .then(info => 
            this.drawListWeather(info))
    }

    drawListWeather(info){
        info.forEach(cityInfo => {
            let cityObject = new CityWeather(cityInfo)
            cityObject.getCity()
            cityObject.getTodaysDate()
            cityObject.getInfo()
            
        })
    }

    showForecast(){
        let promiseArray = [];
        promiseArray.push(cityServise.getCityInfoForecast(this.city, this.temp))
        Promise.all(promiseArray)
        .then(info => 
            this.drawListForecast(info))
    }


    drawListForecast(info){
        info.forEach(cityInfo => {
            
            let cityObject = new CityWeather(cityInfo)
            cityObject.getAllDays()
            cityObject.getDegrees()
            cityObject.getTemperature()
            if (this.date){
                cityObject.getOtherDates(this.date)
        }
        })
    }

}