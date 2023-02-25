function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = [date.getMinutes()];
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
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

  return `${day}, ${hours}:${minutes}`;
}
function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;

  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
          <div class="col-2">
            <div class="weather-forecast-date">${formatDay(
              forecastDay.dt
            )}</div>
            <img 
            src="http://openweathermap.org/img/wn/${
              forecastDay.weather[0].icon
            }@2x.png" 
            alt=""
            width="42"
            />
            <div class="weather-forecast-temperature">
              <span class="weather-forecast-temperature-max"> ${Math.round(
                forecastDay.temp.max
              )}° </span>
              <span class="weather-forecast-temperature-min">${Math.round(
                forecastDay.temp.min
              )}° </span>
            </div>
          </div>
        `;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}
function getForecast(coordinates) {
  let apiKey = "ca0db41e2e878c74a1dfc7ffece370d4";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayForecast);
}

//
function showResponse(response) {
  let cityName = document.querySelector("#city");
  let temperatureElement = document.querySelector("#number");
  let humidityElement = document.querySelector("#humid");
  let windElement = document.querySelector("#windval");
  let descripElement = document.querySelector("#description");
  let icon = document.querySelector("#icon");
  let dateElement = document.querySelector("#sun");
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
  dateElement.innerHTML = formatDate(response.data.dt * 1000);

  celciusTemperature = response.data.main.temp;

  icon.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );

  icon.setAttribute("alt", response.data.weather[0].description);

  getForecast(response.data.coord);
}

function searchCity(city) {
  let apiKey = "ca0db41e2e878c74a1dfc7ffece370d4";
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

//

//function searchLocation(position) {
//let lat = position.coords.latitude;
//let lon = position.coords.longitude;
//let apiKey = "ca0db41e2e878c74a1dfc7ffece370d4";
//let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
//axios.get(apiUrl).then(showResponse);
//}

//function getCurrentPosition(event) {
//event.preventDefault();
//navigator.geolocation.getCurrentPosition(searchLocation);
//}
//let currentCity = document.querySelector("#current-button");
//currentCity.addEventListener("click", getCurrentPosition);
