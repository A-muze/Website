const weatherContainer = document.getElementById('weather-container');
const minidisplay = document.getElementById("weather-container2")
const locationInput = document.getElementById('search');
const searchBtn = document.getElementById('search-btn');

searchBtn.addEventListener('click', function() {
  const location = locationInput.value;
  const apiKey = '4979309d527f606942cb791496ed23b5';
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(location)}&appid=${apiKey}&units=metric`;

  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      displayWeather(data);
      miniDisplay(data);
      setWeatherBackground(data.weather[0].icon);
    })
    .catch(error => {
      weatherContainer.innerHTML = '오류 발생: ' + error;
    });
});

function miniDisplay(data) {
  const { name, main, weather } = data;

  const cityName = document.createElement('h2');
  cityName.textContent = name;

  const temperature = document.createElement('p');
  temperature.innerHTML = `${main.temp}°C`;

  const weatherIcon = document.createElement('i');
  const iconCode = weather[0].icon;
  const iconClass = getWeatherIconClass(iconCode);
  weatherIcon.className = iconClass;

  minidisplay.innerHTML = '';
  minidisplay.appendChild(temperature);
  
  minidisplay.appendChild(cityName);
  minidisplay.appendChild(weatherIcon);
}

function displayWeather(data) {
  const { name, main, wind, weather } = data;

  const temperature_Max = document.createElement('p');
  temperature_Max.innerHTML = `<i class="fas fa-temperature-high"></i> ${main.temp_max} °C`;

  const temperature_Min = document.createElement('p');
  temperature_Min.innerHTML = `<i class="fas fa-temperature-low"></i> ${main.temp_min} °C`;

  const Wind = document.createElement('p');
  Wind.innerHTML = `<i class="fas fa-wind"></i> ${wind.speed} m/s`;

  const weatherIcon = document.createElement('i');
  const iconCode = weather[0].icon;
  const iconClass = getWeatherIconClass(iconCode);
  weatherIcon.className = iconClass;

  weatherContainer.innerHTML = '';
  weatherContainer.appendChild(weatherIcon);
  weatherContainer.appendChild(temperature_Max);
  weatherContainer.appendChild(temperature_Min);
  weatherContainer.appendChild(Wind);
}

function setWeatherBackground(iconCode) {
  const weatherBackgroundMap = {
    '01d': 'url(img/clearSky-d.jpg)',
    '01n': 'url(img/clearSky-n.jpg)',
    '02d': 'url(img/weather-few-cloud.jpg)',
    '02n': 'url(img/weather-cloudy.jpg)',
    '03d': 'url(img/weather-cloudy.jpg)',
    '03n': 'url(img/weather-cloudy.jpg)',
    '04d': 'url(img/weather-cloudy.jpg)',
    '04n': 'url(img/weather-cloudy.jpg)',
    '09d': 'url(path/to/showers-background.jpg)',
    '09n': 'url(path/to/showers-background.jpg)',
    '10n': 'url(img/weather-rain.jpg)',
    '10d': 'url(img/weather-rain.jpg)',
    '11d': 'url(path/to/thunderstorm-background.jpg)',
    '11n': 'url(path/to/thunderstorm-background.jpg)',
    '13d': 'url(path/to/snowy-background.jpg)',
    '13n': 'url(path/to/snowy-background.jpg)',
    '50d': 'url(img/weather-misty.jpg)',
    '50n': 'url(img/weather-misty.jpg)',
  };

  const backgroundUrl = weatherBackgroundMap[iconCode] || '';

  const bodyElement = document.body;
  const currentBackgroundUrl = bodyElement.style.backgroundImage;

  if (backgroundUrl !== currentBackgroundUrl) {
    bodyElement.style.opacity = 1;
    setTimeout(() => {
      bodyElement.style.backgroundImage = backgroundUrl;
      bodyElement.style.opacity = 1;
    }, 500);
  }
}

  if (weatherIcon) {
    weatherContainer.firstChild.className = weatherIcon;
  }

function getWeatherIconClass(iconCode) {
  const weatherIconMap = {
    '01d': 'fas fa-sun',
    '01n': 'fas fa-moon',
    '02d': 'fas fa-cloud-sun',
    '02n': 'fas fa-cloud-moon',
    '03d': 'fas fa-cloud',
    '03n': 'fas fa-cloud',
    '04d': 'fas fa-cloud',
    '04n': 'fas fa-cloud',
    '09d': 'fas fa-cloud-showers-heavy',
    '09n': 'fas fa-cloud-showers-heavy',
    '10d': 'fas fa-cloud-rain',
    '10n': 'fas fa-cloud-rain',
    '11d': 'fas fa-bolt',
    '11n': 'fas fa-bolt',
    '13d': 'fas fa-snowflake',
    '13n': 'fas fa-snowflake',
    '50d': 'fas fa-smog',
    '50n': 'fas fa-smog',
  };

  return weatherIconMap[iconCode] || '';
}