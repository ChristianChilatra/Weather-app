import {setFormatTime} from "./utils/format-data.js";
import {setFormatTemp} from "./utils/format-data.js";
import {setBackground} from "./utils/format-data.js";
import {getLatLong} from "./geolocation.js";
import {getWeather} from "./services/weather.js";

export async function currentWeather() {
  //Try para contener error en peticion fetch
  try {
    //obtenemos lat y lon de Geolocation
    const { latitud, longitud } = await getLatLong()
    //contenemos en variable objeto API Weather
    const { responseCurrentlyWeather, currentlyWeather } = await getWeather(latitud, longitud)
    //Ejecutamos configuracion visual de datos
    configCurrentWeather(currentlyWeather, responseCurrentlyWeather)
  } catch (err) {
    console.log(err.message)
  }
}


function setCurrentCity($elemento, city) {
  $elemento.textContent = city
}
function setCurrentDate($elemento) {
  let arrayFinal = ""
  function dateUpperCase() {
    let day = setFormatTime()
    let newArray = day.split(" ")
    newArray.forEach(function (el) {
      if (el.length > 4) {
        arrayFinal += el.replace(el[0], el[0].toUpperCase()) + " "
      } else {
        arrayFinal += el + " "
      }
    })
  }
  dateUpperCase()
  $elemento.textContent = arrayFinal
}
function setCurrentTemp($elemento, temp) {
  $elemento.textContent = setFormatTemp(temp)
}
function setCurrentBackground($elemento, weather) {
  $elemento.style.backgroundImage = setBackground(weather)
}
function setBackgroundLoader($elemento, response){
  if (response.ok){
    $elemento.hidden = true
  }
}

function configCurrentWeather(weather, response) {

  const $currentCity = document.querySelector("#dateGps")
  const $currentDate = document.querySelector("#dataTime")
  const $currentTemp = document.querySelector("#tempGps")
  const $currentBackground = document.querySelector("body")
  const city = weather.name
  const temp = weather.main.temp
  const $loader = document.querySelector("#loader")

  setCurrentCity($currentCity, city)
  setCurrentDate($currentDate)
  setCurrentTemp($currentTemp, temp)
  setCurrentBackground($currentBackground, weather)
  setBackgroundLoader($loader, response)

}
