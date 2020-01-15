class Forecast{
    constructor(){
        this.key = 'FyLLGYqZpdQqA9GSI7L9CGxkPSGgXZXK';
        this.weatherURI = 'https://dataservice.accuweather.com/currentconditions/v1/';
        this.cityURI = 'https://dataservice.accuweather.com/locations/v1/cities/search';
        this.forecastURI = 'https://dataservice.accuweather.com/forecasts/v1/daily/5day/';
        this.weatherAlarmURI = 'https://dataservice.accuweather.com/alarms/v1/1day/';
        this.cityDetails = '';
        this.cityWeather = '';
        this.cityForecast = '';
    }

    //Returns the weather details of the city the user has entered
    async updateCity(city){
        const cityDetails = await this.getCity(city);
        const cityWeather = await this.getWeather(cityDetails.Key);
        const cityForecast = await this.getForecast(cityDetails.Key);
        this.cityDetails = await cityDetails;
        this.cityWeather = await cityWeather;
        this.cityForecast = await cityForecast;
        console.log(this.cityForecast);
        return { cityDetails,cityWeather,cityForecast };
    }

    //Get City Information
    async getCity(city){
        const query = `?apikey=${this.key}&q=${city}`;
        const response = await fetch(this.cityURI + query);
        const data = await response.json();
        return data[0];
    }

    //Get Weather Information
    async getWeather(cityKey){
        const query = `${cityKey}?apikey=${this.key}`;
        const response = await fetch(this.weatherURI + query);
        const data = await response.json();
        return data;
    }

    //Get 5-day forecast Information
    async getForecast(cityKey){
        const query = `${cityKey}?apikey=${this.key}&details=true&metric=true`;
        const response = await fetch(this.forecastURI + query);
        const data = await response.json();
        return data;
    }

    //Get weather warnings
    async getWeatherAlarm(cityKey){
        const query = `${cityKey}?apikey=${this.key}`;
        const response = await fetch(this.weatherAlarmURI + query);
        const data = await response.json();
        return data;
    }
}
