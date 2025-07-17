// script.js

const apiKey = "b96e30397196a7325b3a6dbb1879bd32"; // Use your own API key here
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".input-box");
const searchBtn = document.getElementById("searchBtn");

const temperature = document.querySelector(".temprature");
const description = document.querySelector(".description");
const humidity = document.getElementById("humidity");
const windSpeed = document.getElementById("wind-speed");
const weatherImg = document.querySelector(".weather-img");

const weatherIcons = {
  Clear: "/assets/clear.png",
  Clouds: "/assets/cloud.png",
  Rain: "/assets/rain.png",
//   Drizzle: "/assets/drizzle.png",
  Mist: "/assets/mist.png",
  Haze: "/assets/mist.png",
  Snow: "/assets/snow.png",
//   Thunderstorm: "/assets/thunderstorm.png"
};

async function checkWeather(city) {
  try {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
    if (!response.ok) throw new Error("City not found");

    const data = await response.json();

    temperature.innerHTML = `${Math.round(data.main.temp)}<sup>°C</sup>`;
    description.innerHTML = data.weather[0].description;
    humidity.innerHTML = `${data.main.humidity}%`;
    windSpeed.innerHTML = `${data.wind.speed} km/hr`;

    const weatherMain = data.weather[0].main;
    weatherImg.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
  } catch (error) {
    alert("❌ Unable to fetch weather. Please check the city name!");
  }
}

searchBtn.addEventListener("click", () => {
  const city = searchBox.value.trim();
  if (city !== "") checkWeather(city);
});
