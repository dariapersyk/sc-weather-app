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
  let icon = document.querySelector("#current-icon");

  currentCity.innerHTML = response.data.city;
  currentTemperature.innerHTML = Math.round(response.data.temperature.current);
  wind.innerHTML = response.data.wind.speed;
  humidity.innerHTML = response.data.temperature.humidity;
  feeling.innerHTML = Math.round(response.data.temperature.feels_like);
  conditions.innerHTML = response.data.condition.description;
  currentDate.innerHTML = formatDate(response.data.time * 1000);
  icon.setAttribute("src", response.data.condition.icon_url);
  icon.setAttribute("alt", response.data.condition.icon);
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

function getOdesaLocation(event) {
  event.preventDefault();
  let city = "Odesa";
  getLocation(city);
}

let odesaCity = document.querySelector("#odesa-location");
odesaCity.addEventListener("click", getOdesaLocation);

function getLvivLocation(event) {
  event.preventDefault();
  let city = "Lviv";
  getLocation(city);
}

let lvivCity = document.querySelector("#lviv-location");
lvivCity.addEventListener("click", getLvivLocation);

function getDniproLocation(event) {
  event.preventDefault();
  let city = "Dnipro";
  getLocation(city);
}

let dniproCity = document.querySelector("#dnipro-location");
dniproCity.addEventListener("click", getDniproLocation);

function getKyivLocation(event) {
  event.preventDefault();
  let city = "Kyiv";
  getLocation(city);
}

let kyivCity = document.querySelector("#kyiv-location");
kyivCity.addEventListener("click", getKyivLocation);

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
