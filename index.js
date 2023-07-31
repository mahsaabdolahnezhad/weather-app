// Feature 1
let now = new Date();

let week = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = week[now.getDay()];
let weekdays = document.querySelector("#weekday");
weekdays.innerHTML = `${day} ${now.getHours()}:${now.getMinutes()}`;

// Feature #2
function handlePosition(position) {
  let apiKey = "1d038ee28ef2727a9f0310860ac10ae9";
  let geoApi = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric&appid=${apiKey}`;
  axios.get(`${geoApi}`).then((response) => {
    showTemp(response, position);
  });
}

function city(event) {
  let input = document.querySelector("#search");
  let h1 = document.querySelector("h1");
  event.preventDefault();
  let cityname = input.value;
  h1.innerHTML = `${cityname}`;
  input.value = "";

  let apiKey = "1d038ee28ef2727a9f0310860ac10ae9";

  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityname}&units=metric`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then((response) => {
    showTemp(response, null);
  });
}

let form = document.querySelector("form");
form.addEventListener("submit", city);

function showTemp(response, position) {
  let temperature = Math.round(response.data.main.temp);
  let tempElement = document.querySelector("#temp");
  tempElement.innerHTML = `${temperature}℃`;

  let description = response.data.weather[0].description;
  let desElement = document.querySelector("#description");
  desElement.innerHTML = description;

  let humidity = response.data.main.humidity;
  let humidElement = document.querySelector("#humidity");
  humidElement.innerHTML = `Humidity = ${humidity}%`;

  let windSpeed = response.data.wind.speed * 3.6;
  let windElement = document.querySelector("#windspeed");
  windElement.innerHTML = `wind= ${windSpeed} km/h`;

  if (position) {
    let apiKey = "1d038ee28ef2727a9f0310860ac10ae9";
    let geoApi = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric&appid=${apiKey}`;

    axios.get(`${geoApi}`).then((response) => {
      let currentCity = response.data.name;
      let h1 = document.querySelector("h1");
      h1.innerHTML = currentCity;

      let currentTemp = Math.round(response.data.main.temp);
      tempElement.innerHTML = `${currentTemp}℃`;

      let currentHumidity = response.data.main.humidity;
      humidElement.innerHTML = `Humidity = ${currentHumidity}%`;

      let currentWindSpeed = response.data.wind.speed * 3.6;
      windElement.innerHTML = `wind= ${currentWindSpeed} km/h`;
    });
  }
}

let button = document.querySelector("#current-location-button");
button.addEventListener("click", () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(handlePosition);
  } else {
    alert("Geolocation is not supported by this browser.");
  }
});
