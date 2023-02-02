function displayWeatherForecast(response) {
  let forecast = response.data.daily;
  console.log(forecast);
  let forecastDisplay = document.querySelector("#forecast");
  let forecastHtml = `<div class="row mt-2 gx-1 gx-lg-2 d-flex justify-content-center">`;
  for (let i = 0; i < 6; i++) {
    let forecastDay = forecast[i];
    forecastHtml =
      forecastHtml +
      `          <div class="col-2 col-sm-2 col-md-2 col-lg-1">
            <div class="card w-100">
            <h3>${formatDay(new Date(forecastDay.dt * 1000))}</h3>
            <img
            src="http://openweathermap.org/img/wn/${
              forecastDay.weather[0].icon
            }@2x.png"
                alt="animated cloudy icon"
                class="w-100"
                />
                <div class ="min-max-temp">
                  <span id ="max-temp">${Math.round(
                    forecastDay.temp.max
                  )}°</span>
                  <span id ="min-temp">${Math.round(
                    forecastDay.temp.min
                  )}°</span>
                </div>
            </div>
          </div>
`;
  }
  forecastHtml = forecastHtml + `</div>`;
  forecastDisplay.innerHTML = forecastHtml;
}
function getForecast(coordinates) {
  let appKey = "ab8e7ef210556986d1c9a75d6007b825";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${appKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherForecast);
}

function formatDay(now) {
  let weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let day = weekdays[now.getDay()];
  return day;
}
// day
function day(now) {
  let weekdays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = weekdays[now.getDay()];
  return day;
}
// time , hour and  minutes
function time(now) {
  let hour = now.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${hour}:${minutes}`;
}
// date , month
function date(now) {
  let monthsName = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let date = now.getDate();
  let month = monthsName[now.getMonth()];
  return `${month}‘ ${date}`;
}
let celsiusTemperature = null;

function displayTemperature(response) {
  let cityCountryDisplay = document.querySelector("#city-country-el");
  let city = response.data.name;
  let country = response.data.sys.country;
  cityCountryDisplay.innerHTML = `${city},${country}`;
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let temperatureDisplay = document.querySelector("#temperature-el");
  celsiusTemperature = response.data.main.temp;
  temperatureDisplay.innerHTML = `${Math.round(celsiusTemperature)}°C`;
  let humidityDisplay = document.querySelector("#humidity-el");
  let humidity = response.data.main.humidity;
  humidityDisplay.innerHTML = `${humidity} %`;
  let windDisplay = document.querySelector("#wind-el");
  let wind = Math.round(response.data.wind.speed);
  windDisplay.innerHTML = `${wind} km/h`;
  let descriptionDisplay = document.querySelector("#description-el");
  let description = response.data.weather[0].main;
  descriptionDisplay.innerHTML = description;
  let timeEl = document.querySelector("#time-el");
  timeEl.innerHTML = time(new Date(response.data.dt * 1000));
  let dayEl = document.querySelector("#day-el");
  dayEl.innerHTML = day(new Date(response.data.dt * 1000));
  let dateEl = document.querySelector("#date-el");
  dateEl.innerHTML = date(new Date(response.data.dt * 1000));
  let weatherIconDisplay = document.querySelector("#weather-icon-el");
  weatherIconDisplay.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  weatherIconDisplay.setAttribute("alt", response.data.weather[0].description);
  getForecast(response.data.coord);
}

// current button
let currentBtn = document.querySelector("#current-btn");
currentBtn.addEventListener("click", getCurrentPosition);
function showPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let appKey = "ab8e7ef210556986d1c9a75d6007b825";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?appid=${appKey}&units=metric&lat=${latitude}&lon=${longitude}`;
  axios.get(apiUrl).then(cityTemperature);
}
function getCurrentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

// search box
function search(cityName) {
  let appKey = "ab8e7ef210556986d1c9a75d6007b825";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${appKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);
}
//searchButton
function searchButton(event) {
  event.preventDefault();
  let input = document.querySelector("#input-el");
  search(input.value);
}
// display fahrenheit
function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let temperatureDisplay = document.querySelector("#temperature-el");
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureDisplay.innerHTML = `${Math.round(fahrenheitTemperature)}°F`;
}
//  display celsius;
function displayCelsiusTemperature(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let temperatureDisplay = document.querySelector("#temperature-el");
  temperatureDisplay.innerHTML = `${Math.round(celsiusTemperature)}°C`;
}
let form = document.querySelector("#search-form");
form.addEventListener("submit", searchButton);

let fahrenheitLink = document.querySelector("#fahrenheit-el");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-el");
celsiusLink.addEventListener("click", displayCelsiusTemperature);
search("urmia");
