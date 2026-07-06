//get weather elements
const getWeatherBtn = document.getElementById('get-weather-btn');
const locationDropDwn = document.getElementById('location-dropdown');
const unitSwitch = document.getElementById('unit-switch');

//main weather stats
const mainWeather = document.getElementById('weather-main');
const weatherIcon = document.getElementById('weather-icon');
const mainTempEl = document.getElementById('main-temperature');
const feelsLikeEl = document.getElementById('feels-like');

//secondary stats
const humidity = document.getElementById('humidity');
const wind = document.getElementById('wind');
const gust = document.getElementById('wind-gust');

async function getWeather (city) {
  const cityTLC = city.toLowerCase();
  try {
    const url = `https://weather-proxy.freecodecamp.rocks/api/city/${cityTLC}`;
     const response = await fetch(url);
     const data = await response.json();
     return data;
  } catch(error) {
    console.log("could not fetch weather data.");
  }
  
};

//helper functions; all test if data is present/valid and returns "N/A" for undefined values

function imperialOrMetric () {
  return unitSwitch.checked;
}


function getWeatherMain (arr) {
//grabs main weather description
  const mainVal = arr[0].main
  console.log(mainVal)
  if(!mainVal) {return "N/A";}
  return mainVal;
}

function getIconURL(arr) {
  const iconURL = arr[0].icon;
  console.log(iconURL);
  //takes url and updates img element's href and alt attributes
  if(!url) {return "N/A";}
  return iconURL;
}

function getTemp (obj) {
  const temp = obj.main.temp;
  //gets temp and updates text content with number and phrase 'degrees celsius/fahrenheit'; will also do conversion based on toggle input
  if(!temp) {return "N/A";}
  
  if(!imperialOrMetric()) {
  const fahrenheit = Math.round((temp * 1.8) + 32);
  return `${fahrenheit} <span>&#176;</span>F`;
  } else {
  const celsius = Math.round(temp);
  return `${celsius} <span>&#176;</span>C`;
  }
}

function getFeels (obj) {
const feltTemp = obj.main.feels_like;
  //gets feels like data and updates text content

  if(!feltTemp) {return "N/A";}

  if(!imperialOrMetric()) {
  const fahrenheit = Math.round((feltTemp * 1.8) + 32);
  return `feels like ${fahrenheit}`;
  } else {
  const celsius = Math.round(feltTemp);
  return `feels like ${celsius}`;
  }
}

function getHumidity (obj) {
  const humid = obj.main.humidity;
  //grabs humidity and updates text content with '%'

  if(!humid) {return "N/A";}

  return `${humid}%`;
}

function getWindSpeed (obj) {
  const windSpeed = obj.wind.speed;
  //gets wind speed and updates text content after converting to mph based on toggle input
  
  if(!windSpeed) {return "N/A";}
  if(!imperialOrMetric()) {
  const MPH = Math.round(windSpeed / 0.44704);
  return `${MPH} mph`;
  } else {
    const mPS = Math.round(windSpeed);
    return `${mPS} m/s`;}
};

function getGust (obj) {
  const windGust = obj.wind.gust;
  //updates wind gust based on conversion; 
  if(!windGust) {return "N/A";}
  if(!imperialOrMetric()) {
    const gustPH = Math.round(windGust / 0.44704);
    return `${gustPH} mph`;
    } else {
    const gustPS = Math.round(windGust);
    return `${gustPS} m/s`}
};

async function showWeather (city) {
  try {
    const weatherData =  await getWeather(city);
    const mainWeatherArr = weatherData.weather;

    mainWeather.textContent = getWeatherMain(mainWeatherArr);
    //weatherIcon.src = getIconURL(mainWeatherArr);
    mainTempEl.innerHTML = getTemp(weatherData);
    feelsLikeEl.textContent = getFeels(weatherData);
    humidity.textContent = getHumidity(weatherData);
    wind.textContent = getWindSpeed(weatherData);
    gust.textContent = getGust(weatherData);


    console.log(weatherData)
    return weatherData

  } catch(error) {
    console.log("Something went wrong, please try again later");
  }
  

}

console.log(showWeather("London"))

