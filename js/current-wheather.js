import weather from "../data/weatherData.js";
import {setFormatTime} from "./utils/format-data.js";
import {setFormatTemp} from "./utils/format-data.js";
import {setBackground} from "./utils/format-data.js";

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


function configCurrentWeather(weather) {
  //dateGps

  const $currentCity = document.querySelector("#dateGps")
  const $currentDate = document.querySelector("#dataTime")
  const $currentTemp = document.querySelector("#tempGps")
  const $currentBackground = document.querySelector("body")
  const city = weather.name
  const temp = weather.main.temp

  setCurrentCity($currentCity, city)
  setCurrentDate($currentDate)
  setCurrentTemp($currentTemp, temp)
  setCurrentBackground($currentBackground, weather)
}


export default function currentWeather() {
  configCurrentWeather(weather)

}