document.addEventListener('DOMContentLoaded', () => {
  const apiKey = '29071f0cb39bc2d1d3e93f0fe50cae3a';
  const weatherDataDiv = document.getElementById('weather-data');
  const getWeatherButton = document.getElementById('get-weather');

  getWeatherButton.addEventListener('click', function (event) {
    event.preventDefault();
    const location = document.getElementById('location').value;
    if (location){
      getWeather(location, apiKey);
    } else {
      weatherDataDiv.textContent = 'Please enter a city.';
    }
  })

  function getWeather(location, apiKey){
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;

    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
      })
      .then(data => {
        displayWeather(data);
      })
      .catch(error => {
        weatherDataDiv.textContent = 'Error fetching weather data: ' + error.message;
      })
  }

  function displayWeather(data) {
    const {name, main, weather} = data;
    const weatherHTML = `
    <h2>Weather in ${name}</h2>
    <p>Temperature: ${main.temp}°C</p>
    <p>Weather: ${weather[0].description}</p>
    `;
    weatherDataDiv.innerHTML = weatherHTML;
  }
})