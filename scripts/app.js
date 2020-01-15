const cityForm = document.querySelector('form');
const card = document.querySelector('.card');
const details = document.querySelector('.details-weather');
const holidayDetails = document.querySelector('.holiday-details .details');
const holidayData = document.querySelector('.holiday-data');
const detailsForecastOne = document.querySelector('.details-forecast-one');
const detailsForecastTwo = document.querySelector('.details-forecast-two');
const detailsForecastThree = document.querySelector('.details-forecast-three');
const currentTime = document.querySelector('.current-time');
const time = document.querySelector('img.time-weather');
const icon = document.querySelector('.icon-weather img');
const forecastIconOne = document.querySelector('.forecast-icon-one img');
const forecastIconTwo = document.querySelector('.forecast-icon-two img');
const forecastIconThree = document.querySelector('.forecast-icon-three img');
const content = document.querySelector('.content');
const mobileBtn = document.querySelector('.mobile-nav');
const conditionsCard = document.querySelector('.conditions-card');
const weatherInfo = document.querySelector('.weather-info');
const forecastCard = document.querySelector('.weather-forecast'); 
const weatherWarnings = document.querySelector('.weather-warnings .details');
const forecast = new Forecast();
const cityTime = new Time();
const countryHolidays = new Holidays();
let timeSet = false;

//Takes in a dateString and returns the day of the week and date
const getDayDate = (dateString) => {
    const d = new Date(dateString);
    const weekday = new Array(7);

    weekday[0] = "Sun";
    weekday[1] = "Mon";
    weekday[2] = "Tues";
    weekday[3] = "Wed";
    weekday[4] = "Thurs";
    weekday[5] = "Fri";
    weekday[6] = "Sat";

    const dayOfWeek = weekday[d.getDay()];

    const date = d.getDate();
    const month = d.getMonth() + 1; // Since getMonth() returns month from 0-11 not 1-12
    const year = d.getFullYear();
    
    const dateStr = date + "/" + month + "/" + year;

    return `${dayOfWeek} ${dateStr}`;
}

//Updates weather warning card with weather warnings for the next 24 hours
const updateWeatherWarningsUI = (data) => {
    forecast.getWeatherAlarm(data.cityDetails.Key)
        .then((data) => {
            console.log(data);
            if(data.length > 0){
                weatherWarnings.innerHTML = `
                    <h5 class="my-3">Weather Warnings</h5>
                    <div class="my-3">[Description]</div>
                `;
            } else {
                weatherWarnings.innerHTML = `
                    <h5 class="my-3">Weather Warnings</h5>
                    <div class="my-3">No Current Weather Warnings</div>
                `;
            }
            
        }).catch((err) => console.log(err));
};

//Updates holiday card with national holidays this month
const updateHolidayUI = (data) => {
    holidayData.innerHTML = '';

    countryHolidays.getHolidays(data.cityDetails)
        .then((data) => {
            if(data.response.holidays.length > 0){
                data.response.holidays.forEach((holiday) => {
                    let p = document.createElement("P");
                    let holidayText = document.createTextNode(`${holiday.name} ${holiday.date.datetime.day}/${holiday.date.datetime.month}/${holiday.date.datetime.year}`);
                    p.appendChild(holidayText);
                    holidayData.appendChild(p);
                });
            } else {
                holidayData.innerHTML = `
                    <div>
                        <p>No National Holidays this month</p>
                    </div>
                `;
            }
            
        }).catch((err) => console.log(err));
};

//Updates the local time of the city in the UI
const updateTimeUI = (data, localTime) => {
    //Setting local time
    timeSet = localTime !== 'N/A' ? true : false;
    
    //Update current time template
    currentTime.innerHTML = `
        <h5 class="my-3">Local Time:</h5>
        <div class="local-time">${localTime}</div>
        <h6 class="my-3">${getDayDate(data.cityForecast.DailyForecasts[0].Date.slice(0, 10))}</h6>
    `;
}

//Updates the UI with the weather information of the city the user has entered
const updateWeatherUI = (data) => {

    console.log(data);

    //Destructure properties
    const { cityDetails, cityWeather, cityForecast } = data;

    //Update img and time text color
    let timeSrc = null;

    if(cityWeather[0].IsDayTime){
        timeSrc = "img/day.svg";
        currentTime.classList.remove('text-white');
        currentTime.classList.add('text-muted');
    } else {
        timeSrc = "img/night.svg";
        currentTime.classList.remove('text-muted');
        currentTime.classList.add('text-white');
    }

    const iconSrc = `img/icons/${cityWeather[0].WeatherIcon}.svg`;
    const iconForecastOneSrc = `img/icons/${cityForecast.DailyForecasts[1].Day.Icon}.svg`;
    const iconForecastTwoSrc = `img/icons/${cityForecast.DailyForecasts[2].Day.Icon}.svg`;
    const iconForecastThreeSrc = `img/icons/${cityForecast.DailyForecasts[3].Day.Icon}.svg`;

    time.setAttribute('src', timeSrc);
    icon.setAttribute('src', iconSrc);
    forecastIconOne.setAttribute('src', iconForecastOneSrc);
    forecastIconTwo.setAttribute('src', iconForecastTwoSrc);
    forecastIconThree.setAttribute('src', iconForecastThreeSrc);

    //Update details template
    details.innerHTML = `
        <h5 class="my-4">${cityDetails.EnglishName}</h5>
        <div class="my-4">${cityWeather[0].WeatherText}</div>
        <div class="my-5">
            <div class="my-4">
                <span>Min: ${cityForecast.DailyForecasts[0].Temperature.Minimum.Value}</span>
                <span>&deg;C</span>
            </div>
            <div class='display-4'>
                <span>${cityWeather[0].Temperature.Metric.Value}</span>
                <span>&deg;C</span>
            </div>
            <div class="my-4">
                <span>Max: ${cityForecast.DailyForecasts[0].Temperature.Maximum.Value}</span>
                <span>&deg;C</span>
            </div>
        </div>
    `;

    //Update forecast UI cards
    detailsForecastOne.innerHTML = `
        <h5 class="my-3">${getDayDate(cityForecast.DailyForecasts[1].Date.slice(0, 10))}</h5>
        <div class="my-3">${cityForecast.DailyForecasts[1].Day.LongPhrase}</div>
        <div class="my-4">
            <span>Min: ${cityForecast.DailyForecasts[1].Temperature.Minimum.Value}</span>
            <span>&deg;C</span>
            <span>Max: ${cityForecast.DailyForecasts[1].Temperature.Maximum.Value}</span>
            <span>&deg;C</span>
        </div>
    `;

    detailsForecastTwo.innerHTML = `
        <h5 class="my-3">${getDayDate(cityForecast.DailyForecasts[2].Date.slice(0, 10))}</h5>
        <div class="my-3">${cityForecast.DailyForecasts[2].Day.LongPhrase}</div>
        <div class="my-4">
            <span>Min: ${cityForecast.DailyForecasts[2].Temperature.Minimum.Value}</span>
            <span>&deg;C</span>
            <span>Max: ${cityForecast.DailyForecasts[2].Temperature.Maximum.Value}</span>
            <span>&deg;C</span>
        </div>
    `;

    detailsForecastThree.innerHTML = `
        <h5 class="my-3">${getDayDate(cityForecast.DailyForecasts[3].Date.slice(0, 10))}</h5>
        <div class="my-3">${cityForecast.DailyForecasts[3].Day.LongPhrase}</div>
        <div class="my-4">
            <span>Min: ${cityForecast.DailyForecasts[3].Temperature.Minimum.Value}</span>
            <span>&deg;C</span>
            <span>Max: ${cityForecast.DailyForecasts[3].Temperature.Maximum.Value}</span>
            <span>&deg;C</span>
        </div>
    `;

    //Remove d-none class if present
    if(content.classList.contains('d-none')){
        content.classList.remove('d-none');
    }
};

//Mobile Nav bar click event listener
mobileBtn.addEventListener('click', (e) => {
    if(e.target.id == 'Weather'){
        conditionsCard.classList.add('show');
        //conditions-card display
        weatherInfo.classList.remove('show');
        forecastCard.classList.remove('show');
    } else if(e.target.id == 'Forecast'){
        forecastCard.classList.add('show');
        //forecast-info display
        conditionsCard.classList.remove('show');
        weatherInfo.classList.remove('show');
    } else if(e.target.id == 'Warnings'){
        weatherInfo.classList.add('show');
        //weather-info display
        forecastCard.classList.remove('show');
        conditionsCard.classList.remove('show');
    }
});

//Listens for form submission
cityForm.addEventListener('submit', (e) => {
    //Prevent default action
    e.preventDefault();

    //Get city value
    const city = e.target.city.value.trim().toLowerCase();
    cityForm.reset();

    //Set local storage
    localStorage.setItem('city', city);

    //Update UI with city info
    forecast.updateCity(city)
        .then(data => {
            cityTime.getTime(data.cityDetails).then((localTime) => {
                updateHolidayUI(data);
                updateTimeUI(data, localTime);
                updateWeatherUI(data);
                updateWeatherWarningsUI(data);
            }).catch(err => console.log(err));
        })
        .catch(err => console.log(err));
});

if(localStorage.getItem('city')){
    forecast.updateCity(localStorage.getItem('city'))
        .then(data => {
            cityTime.getTime(data.cityDetails).then((localTime) => {
                updateHolidayUI(data);
                updateTimeUI(data, localTime);
                updateWeatherUI(data);
                updateWeatherWarningsUI(data);
            }).catch(err => console.log(err));
        }).catch(err => console.log(err));
}

// setInterval(() => {
//     if(timeSet){
//         cityTime.getTime(forecast.cityDetails).then((data) => {
//             updateTimeUI(data);
//         }).catch(err => console.log(err));
//     }
// }, 10000);

