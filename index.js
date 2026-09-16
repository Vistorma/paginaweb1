//Weather App

const weatherApp = document.querySelector(".weatherApp");
const cityInput = document.querySelector(".cityInput");
const weatherInfo = document.querySelector(".weatherInfo");
const apiKey = "de6fe85b1d3446f2b03dd7b8c9c39f80";

weatherApp.addEventListener("submit", async event => {

event.preventDefault();

const city = cityInput.value;

if (city) {

    try{
    const weatherData = await getWeatherData(city);
    displayWeatherData(weatherData);
  }

  catch (error) {
    console.error(error);
    displayError("Error al obtener los datos del clima. Por favor, inténtalo de nuevo más tarde.");
  }
}
  else {
    displayError("Porfavor int. un nombre de ciudad.");
  }


});

async function getWeatherData(city) {

  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

  const response = await fetch(apiUrl);

  console.log(response);

  if (!response.ok) {
    throw new Error("Error al obtener los datos del clima");
  }
  return await response.json();
}


function translateDescription(description) {
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", "https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=es&dt=t&q=" + description, false);
    xhttp.send();
    var response = JSON.parse(xhttp.responseText);
    return response[0][0][0];
}

function displayWeatherData(data) {

  const { name: city, 
    main: { temp, humidity }, 
    weather: [{ id: weatherId, description }] } = data;

    weatherInfo.textContent = "";
    weatherInfo.style.display = "flex";

    const cityDisplay = document.createElement("h1");
    const tempDisplay = document.createElement("p");
    const humidityDisplay = document.createElement("p");
    const descriptionDisplay = document.createElement("p");
    const weatherEmoji = document.createElement("p");

    cityDisplay.textContent = city;
    cityDisplay.classList.add("errorClima");

    tempDisplay.textContent = `Temperatura: ${Math.round(temp - 273.15)}°C`;
    tempDisplay.classList.add("errorClima");

    humidityDisplay.textContent = `Humedad: ${humidity}%`;
    humidityDisplay.classList.add("errorClima");
    
    descriptionDisplay.textContent = `Descripción: ${translateDescription(description)}`;
    descriptionDisplay.classList.add("errorClima");

    weatherEmoji.textContent = getWeatherEmoji(weatherId);
    weatherEmoji.classList.add("weatherEmoji");


    weatherInfo.appendChild(cityDisplay);
    weatherInfo.appendChild(tempDisplay);
    weatherInfo.appendChild(humidityDisplay);
    weatherInfo.appendChild(descriptionDisplay);
    weatherInfo.appendChild(weatherEmoji);

}

function getWeatherEmoji(weatherId) {
  switch (true) {
    case weatherId >= 200 && weatherId < 300:
      return "⛈️"; // Tormenta
    case weatherId >= 300 && weatherId < 400:
      return "🌦️";
    case weatherId >= 500 && weatherId < 600:
      return "🌧️";
    case weatherId >= 600 && weatherId < 700:
      return "❄️";
    case weatherId >= 700 && weatherId < 800:
      return "🌫️"
      case weatherId === 800:;
      return "☀️";
    case weatherId > 800 && weatherId < 900:
      return "☁️";
    default:
      return "❓";
    
  }

}

function displayError(message) {

    const errorClima = document.createElement("p");
    errorClima.textContent = message;
    errorClima.classList.add("errorClima");

    weatherInfo.textContent = "";
    weatherInfo.style.display = "flex";
    weatherInfo.appendChild(errorClima);

}



