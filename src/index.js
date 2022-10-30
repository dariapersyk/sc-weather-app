function showTime() {
  let currentDate = new Date();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let day = days[currentDate.getDay()];
  let hours = currentDate.getHours();
  let minutes = currentDate.getMinutes();

  if (hours < 10) {
    hours = `0${hours}`;
  }
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let currentTime = document.querySelector("#current-time");
  currentTime.innerHTML = `${day}, ${hours}:${minutes}`;
}
showTime();

function showConditions(response) {
  let currentCity = document.querySelector("#heading");
  let currentTemperature = document.querySelector("#current-temp");
  let wind = document.querySelector("#wind");
  let humidity = document.querySelector("#humidity");
  let feeling = document.querySelector("#feels-like");
  let conditions = document.querySelector("#conditions");

  currentCity.innerHTML = response.data.name;
  currentTemperature.innerHTML = Math.round(response.data.main.temp);
  wind.innerHTML = response.data.wind.speed;
  humidity.innerHTML = response.data.main.humidity;
  feeling.innerHTML = Math.round(response.data.main.feels_like);
  conditions.innerHTML = response.data.weather[0].description;
}

function getLocation(city) {
  let units = "metric";
  let apiKey = "bb0df6985c2eab6a171d64a6bacbb4e1";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&appid=${apiKey}`;
  axios.get(apiUrl).then(showConditions);
}

function searchCity(event) {
  event.preventDefault();
  let city = document.querySelector("#search-input").value;
  getLocation(city);
}

let searchForm = document.querySelector("#search");
searchForm.addEventListener("submit", searchCity);

function getMyCity(position) {
  let units = "metric";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "bb0df6985c2eab6a171d64a6bacbb4e1";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${units}&appid=${apiKey}`;

  axios.get(apiUrl).then(showConditions);
}

function getMyLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(getMyCity);
}

let myLocation = document.querySelector("#my-location");
myLocation.addEventListener("click", getMyLocation);

// function changeToCelsius(event) {
//   event.preventDefault();
//   let cUnit = 17;
//   currentTemperature.innerHTML = `${cUnit}`;
// }
// function changeToFarenheit(event) {
//   event.preventDefault();
//   let fUnit = 66;
//   currentTemperature.innerHTML = `${fUnit}`;
// }

// let currentTemperature = document.querySelector("#current-temp");
// cUnit.addEventListener("click", changeToCelsius);
// fUnit.addEventListener("click", changeToFarenheit);
