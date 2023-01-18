let now = new Date();

// start day
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
let dayEl = document.querySelector("#day-el");
dayEl.textContent = day;

//  start time hour and  minutes
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
let timeEl = document.querySelector("#time-el");
timeEl.textContent = time(now);

// start search box
let celsiusFahrenheitBox = document.querySelector("#c-f-box");
let precipitationBox = document.querySelector("#precipitation-box");
celsiusFahrenheitBox.style.display = "block";
precipitationBox.style.display = "block";
let form = document.querySelector("#search-form");
form.addEventListener("submit", searchButton);
function searchButton(event) {
  event.preventDefault();
  let input = document.querySelector("#input-el");
  let cityName = input.value;
  let appKey = "ab8e7ef210556986d1c9a75d6007b825";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${appKey}&units=metric`;
  axios.get(apiUrl).then(cityTemperature);
}

function cityTemperature(response) {
  console.log(response.data);
  let cityDisplay = document.querySelector("#city-el");
  let city = response.data.name;
  let country = response.data.sys.country;
  cityDisplay.innerHTML = `${city},${country}`;
  let temperatureDisplay = document.querySelector("#temperature-el");
  let temperature = Math.round(response.data.main.temp);
  temperatureDisplay.innerHTML = `${temperature}°C`;
  let humidityDisplay = document.querySelector("#humidity-el");
  let humidity = response.data.main.humidity;
  humidityDisplay.innerHTML = `${humidity} %`;
  let windDisplay = document.querySelector("#wind-el");
  let wind = Math.round(response.data.wind.speed);
  windDisplay.innerHTML = `${wind} km/h`;
  let descriptionDisplay = document.querySelector("#description-el");
  let description = response.data.weather[0].main;
  descriptionDisplay.innerHTML = description;
}

// start current button

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

// start month
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

let month = monthsName[now.getMonth()];
let date = now.getDate();
let dateEl = document.querySelector("#date-el");
dateEl.textContent = `${month}‘ ${date}`;
