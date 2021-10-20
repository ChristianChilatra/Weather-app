import {weeklyWeather} from "./weekly-wheather.js" 
import {currentWeather} from "./current-wheather.js"
import {setViewPort} from "./utils/view-port.js"
import draggable from "./draggable.js"
import {} from "./tab-days.js"
import {} from "./tab-temps.js"



const $bodyElement = document.querySelector("body") // Traemos el objeto DOM de Body
const $loaderElement = document.querySelector("#loader") // Traemos el objeto DOM de loader
const $draggable = document.querySelector("main") // Traemos el objeto DOM de main para interaccion Drag

setViewPort($bodyElement) // ejecuta configuracion de alto de Body cuando se cambia el tamaño de la vista del documento (ventana) 
setViewPort($loaderElement) // ejecuta configuracion de alto de backGround Loader cuando se cambia el tamaño de la vista del documento (ventana) 
currentWeather() //Se muestran datos de API https://openweathermap.org/api
weeklyWeather() //Se muestran datos de API https://openweathermap.org/api
draggable($draggable)
