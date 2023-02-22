let now = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];
//let months = [
//"January",
//"February",
//"March",
//"April",
//"May",
//"June",
//"July",
//"August",
//"September",
//"October",
//"November",
//"December",
//];
//let month = months[now.getMonth()];
//let year = [now.getFullYear()];
//let date = [now.getDate()];
let hours = [now.getHours()];
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = [now.getMinutes()];
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let today = document.querySelector("#sun");
today.innerHTML = `${day}, ${hours}:${minutes}`;

function displayForecast() {
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
  let dys = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  dys.forEach(function (dy) {
    forecastHTML =
      forecastHTML +
      `
          <div class="col-2">
            <div class="weather-forecast-date">${dy}</div>
            <img src="#" />
            <div class="weather-forecast-temperature">
              <span class="weather-forecast-temperature-max">38° </span>
              <span class="weather-forecast-temperature-min">30° </span>
            </div>
          </div>
        `;
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

//
function showResponse(response) {
  let cityName = document.querySelector("#city");
  let temperatureElement = document.querySelector("#number");
  let humidityElement = document.querySelector("#humid");
  let windElement = document.querySelector("#windval");
  let descripElement = document.querySelector("#description");
  let icon = document.querySelector("#icon");
  let temperatureValue = Math.round(response.data.main.temp);
  let humidityValue = Math.round(response.data.main.humidity);
  let windValue = Math.round(response.data.wind.speed);
  let descriptionValue = response.data.weather[0].main;
  let cityValue = response.data.name;
  temperatureElement.innerHTML = temperatureValue;
  humidityElement.innerHTML = humidityValue;
  windElement.innerHTML = windValue;
  descripElement.innerHTML = descriptionValue;
  cityName.innerHTML = cityValue;

  celciusTemperature = response.data.main.temp;

  icon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );

  icon.setAttribute("alt", response.data.weather[0].description);
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
function displayCelciusTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#number");
  celciusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  temperatureElement.innerHTML = Math.round(celciusTemperature);
}
function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#number");
  fahrenheitLink.classList.add("active");
  celciusLink.classList.remove("active");
  let fahrenheitTemperature = (celciusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}
let celciusTemperature = null;

let searchForm = document.querySelector("form");
searchForm.addEventListener("submit", submitSearch);

let celciusLink = document.querySelector("#celcius-link");
celciusLink.addEventListener("click", displayCelciusTemperature);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

searchCity("Brownsburg");
displayForecast();

//

function searchLocation(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "08cffde9ad7a38f4c307f61119d5c0cd";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showResponse);
}

function getCurrentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}
let currentCity = document.querySelector("#current-button");
currentCity.addEventListener("click", getCurrentPosition);
