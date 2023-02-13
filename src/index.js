let now = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursdy",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];
let months = [
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
let month = months[now.getMonth()];
let year = [now.getFullYear()];
let date = [now.getDate()];
let hours = [now.getHours()];
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = [now.getMinutes()];
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let p = document.querySelector("p.sun");
p.innerHTML = `${day}, ${month}, ${date}, ${year}. ${hours}:${minutes}`;
//
function showResponse(response) {
  let cityName = document.querySelector("#city");
  let temperature = document.querySelector("#number");
  let humidity = document.querySelector("#humid");
  let wind = document.querySelector("#windval");
  let temperatureval = Math.round(response.data.main.temp);
  let humidityval = Math.round(response.data.main.humidity);
  let windval = Math.round(response.data.wind.speed);
  let city = response.data.name;
  temperature.innerHTML = temperatureval;
  humidity.innerHTML = humidityval;
  wind.innerHTML = windval;
  cityName.innerHTML = city;
}
function searchCity(city) {
  let apiKey = "08cffde9ad7a38f4c307f61119d5c0cd";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showResponse);
}
function submitSearch(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  searchCity(city);
}

let searchForm = document.querySelector("form");
searchForm.addEventListener("submit", submitSearch);

searchCity("Brownsburg");

//

function searchLocation(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "08cffde9ad7a38f4c307f61119d5c0cd";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showResponse);
}

function getCurrentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}
let currentCity = document.querySelector("#current-button");
currentCity.addEventListener("click", getCurrentPosition);
