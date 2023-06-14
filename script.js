const weatherContainer = document.getElementById('weather-container');
const weatherContainer2 = document.getElementById('weather-container2');
const locationInput = document.getElementById('search');
const searchBtn = document.getElementById('search-btn');

searchBtn.addEventListener('click', function() {
  const location = locationInput.value;
  const apiKey = 'API_Key';
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(location)}&appid=${apiKey}&units=metric`;
  
  fetch(apiUrl)
  .then(response => response.json())
  .then(data => {
    displayWeather(data);
    miniDisplay(data);
    setWeatherBackground(data.weather[0].icon);
    
    console.log(data);
  })
  .catch(error => {
    weatherContainer.innerHTML = '오류 발생: ' + error;
  });
});

searchBtn.addEventListener('click', function() {
  weatherContainer2.style.visibility = 'visible';
});

searchBtn.addEventListener('click', function() {
  weatherContainer.style.visibility = 'visible';
});

function miniDisplay(data) {
  
  const cityName = document.getElementById('cityName');
  const temperature = document.getElementById('temp');
  const weatherIcon = document.getElementById('Icon');
  
  const { name, main, weather } = data;
  
  cityName.textContent = `${name}`;
  temperature.textContent = `${Math.round(main.temp)}°C`;
  
  const iconCode = weather[0].icon;
  const iconClass = getWeatherIconClass(iconCode);
  weatherIcon.className = `fas ${iconClass}`;
}

function displayWeather(data) {
  
  const maxTempElement = document.getElementById('max-temp');
  const minTempElement = document.getElementById('min-temp');
  const windElement = document.getElementById('wind');
  const humidityElement = document.getElementById('humidity');
  const cloudsElement = document.getElementById('clouds');
  
  const { main, wind, clouds } = data;
  
  maxTempElement.textContent = ` ${main.temp_max} °C`;
  minTempElement.textContent = ` ${main.temp_min} °C`;
  windElement.textContent = ` ${wind.speed} m/s`;
  humidityElement.textContent = ` ${main.humidity} %`;
  cloudsElement.textContent = ` ${clouds.all} %`;
}

function setWeatherBackground(iconCode) {
  const weatherBackgroundMap = {
    '01d': 'url(img/01d.jpg)',
    '01n': 'url(img/01n.jpg)',
    '02d': 'url(img/02d.jpg)',
    '02n': 'url(img/02n.jpg)',
    '03d': 'url(img/03d.jpg)',
    '03n': 'url(img/03n.jpg)',
    '04d': 'url(img/04d.jpg)',
    '04n': 'url(img/04n.jpg)',
    '09d': 'url(img/10d.jpg)',
    '09n': 'url(img/10d.jpg)',
    '10d': 'url(img/10d.jpg)',
    '10n': 'url(img/10d.jpg)',
    '11d': 'url(img/01d.jpg)',
    '11n': 'url(img/01d.jpg)',
    '13d': 'url(img/13d.jpg)',
    '13n': 'url(img/13d.jpg)',
    '50d': 'url(img/50d.jpg)',
    '50n': 'url(img/50d.jpg)',
  };

  const backgroundUrl = weatherBackgroundMap[iconCode] || '';

  const bodyElement = document.body;
  const currentBackgroundUrl = bodyElement.style.backgroundImage;

  if (backgroundUrl !== currentBackgroundUrl) {
    bodyElement.style.backgroundImage.opacity = 0;
    setTimeout(() => {
      bodyElement.style.backgroundImage = backgroundUrl;
      bodyElement.style.backgroundImage.opacity = 1;
    }, 500);
  }
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