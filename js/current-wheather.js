import {setFormatTime} from "./utils/format-data.js";
import {setFormatTemp} from "./utils/format-data.js";
import {setBackground} from "./utils/format-data.js";
import {getLatLong} from "./geolocation.js";
import {getWeather} from "./services/weather.js";

export async function currentWeather() {
  //Try para contener error en peticion fetch
  try {
    const { latitud, longitud } = await getLatLong() //obtenemos lat y lon de Geolocation
    //contenemos en variable de FETCH responseCurrentlyWeather-> Response // currentlyWeather -> Responsive JSON
    const { responseCurrentlyWeather, currentlyWeather } = await getWeather(latitud, longitud) 
    configCurrentWeather(responseCurrentlyWeather, currentlyWeather) //Ejecutamos configuracion visual de datos
  } catch (err) {
    console.log(err.message) // si el consumo de Geolocalizacion o API weather genera error, se imprime aqui
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
  $elemento.style.backgroundImage = setBackground(weather) //llamada de funcion que establece BackGround
}
function setBackgroundLoader($elemento, response){
  if (response.ok){ //Se muestra background loader hasta que fecth retorne OK de peticion a API
    $elemento.hidden = true
  }
}

function configCurrentWeather(response, weather) { 
  //Funcion que configura la visual actual del clima en APP // response-> ResponsiveAPI // weather -> Response JSON

  const $currentCity = document.querySelector("#dateGps") //almacenamos elemento DOM "#dataGps"" // "Muestra ubicacion Actual"
  const $currentDate = document.querySelector("#dataTime") //almacenamos elemento DOM "#dataTime"" // "Muestra fecha Actual"
  const $currentTemp = document.querySelector("#tempGps") //almacenamos elemento DOM "#tempGps"" // "Muestra temperatura Actual"
  const $currentBackground = document.querySelector("body") //almacenamos elemento DOM "body"" // "Almacena cuerpo principal "
  const $loader = document.querySelector("#loader")  //almacenamos elemento DOM "#loader"" // "Muestra loading"
  const city = weather.name //almacenamos del objeto Reponse API el nombre de la ciudad
  const temp = weather.main.temp //almacenamos del objeto Reponse API la temperatura de ubicacion

  setCurrentCity($currentCity, city) //configuramos en vista la ciudad
  setCurrentDate($currentDate) //configuramos en vista la fecha actual
  setCurrentTemp($currentTemp, temp) //configuramos en vista la temperatura de ubicacion
  setCurrentBackground($currentBackground, weather) //configuramos el BackGround segun el estado del clima
  setBackgroundLoader($loader, response) //configuramos tiempo de carga y visualiacion de backGround Loader

}
