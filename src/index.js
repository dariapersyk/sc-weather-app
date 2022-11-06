function formatDate(timestamp) {
  let date = new Date(timestamp);
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let day = days[date.getDay()];
  let hours = date.getHours();
  let minutes = date.getMinutes();

  if (hours < 10) {
    hours = `0${hours}`;
  }
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${day}, ${hours}:${minutes}`;
}

function showConditions(response) {
  let currentCity = document.querySelector("#heading");
  let currentTemperature = document.querySelector("#current-temp");
  let wind = document.querySelector("#wind");
  let humidity = document.querySelector("#humidity");
  let feeling = document.querySelector("#feels-like");
  let conditions = document.querySelector("#conditions");
  let currentDate = document.querySelector("#current-time");

  currentCity.innerHTML = response.data.city;
  currentTemperature.innerHTML = Math.round(response.data.temperature.current);
  wind.innerHTML = response.data.wind.speed;
  humidity.innerHTML = response.data.temperature.humidity;
  feeling.innerHTML = Math.round(response.data.temperature.feels_like);
  conditions.innerHTML = response.data.condition.description;
  currentDate.innerHTML = formatDate(response.data.time * 1000);
}

function getLocation(city) {
  let units = "metric";
  let apiKey = "2607db43507580fb79e389f9t9o21fab";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&units=${units}&key=${apiKey}`;
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
  let apiKey = "2607db43507580fb79e389f9t9o21fab";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?lon=${lon}&lat=${lat}&units=${units}&key=${apiKey}`;

  axios.get(apiUrl).then(showConditions);
}

function getMyLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(getMyCity);
}

let myLocation = document.querySelector("#my-location");
myLocation.addEventListener("click", getMyLocation);

getLocation("Kyiv");
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
