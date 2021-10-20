import {weeklyWeather} from "./weekly-wheather.js"
import {currentWeather} from "./current-wheather.js"
import {setViewPort} from "./utils/view-port.js"
import draggable from "./draggable.js"
import {} from "./tab-days.js"
import {} from "./tab-temps.js"



const $bodyBlockSize = document.querySelector("body")
const $loaderBlockSize = document.querySelector("#loader")
const $draggable = document.querySelector("main")

setViewPort($bodyBlockSize)
setViewPort($loaderBlockSize)
currentWeather()
weeklyWeather()
draggable($draggable)
