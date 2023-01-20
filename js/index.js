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

//searchButton
let form = document.querySelector("#search-form");
form.addEventListener("submit", searchButton);
function searchButton(event) {
  event.preventDefault();
  let input = document.querySelector("#input-el");
  search(input.value);
}
// search box
search("urmia");
function search(cityName) {
  let appKey = "ab8e7ef210556986d1c9a75d6007b825";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${appKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);
}
function displayTemperature(response) {
  let cityCountryDisplay = document.querySelector("#city-country-el");
  let city = response.data.name;
  let country = response.data.sys.country;
  cityCountryDisplay.innerHTML = `${city},${country}`;
  let temperatureDisplay = document.querySelector("#temperature-el");
  let celsiusTemperature = Math.round(response.data.main.temp);
  temperatureDisplay.innerHTML = `${celsiusTemperature}°C`;
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

// display fahrenheit
let displayFahrenheitTemperatureBtn = document.querySelector("#fahrenheit-el");
displayFahrenheitTemperatureBtn.addEventListener(
  "click",
  displayFahrenheitTemperature
);

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let temperatureDisplay = document.querySelector("#temperature-el");
  let fahrenheit = (14 * 9) / 5 + 32;
  temperatureDisplay.innerHTML = fahrenheit;
}
//  display celsius;
let displayCelsiusTemperatureBtn = document.querySelector("#celsius-el");
displayCelsiusTemperatureBtn.addEventListener(
  "click",
  displayCelsiusTemperature
);

function displayCelsiusTemperature(event) {
  event.preventDefault();
  let temperatureDisplay = document.querySelector("#temperature-el");
}
