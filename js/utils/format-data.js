
import {weatherConditionsCodes} from "./constants.js"


export function setFormatTime() {

  const configTime = {
    day: "numeric",
    weekday: "long",
    month: "long"
  }

  const date = new Date()
  const formatTime = new Intl.DateTimeFormat("es", configTime).format(date)
  return formatTime
}

export function setFormatTemp(temp){
  return `${Math.floor(temp)}°`
}

export function setBackground(weather){

  const date = new Date()
  const currentHours = date.getHours()
  const sunRiseTime = new Date(weather.sys.sunrise * 1000).getHours()
  const sunSetTime = new Date(weather.sys.sunset * 1000).getHours()
  let idWeather = String(weather.weather[0].id)[0]


  let size = (window.matchMedia("(-webkit-max-device-pixel-ratio:2)").matches) ? "-x2" : ""


  if (sunSetTime < currentHours > sunRiseTime) {
    return `url(img/day-${weatherConditionsCodes[idWeather]}-bg${size}.jpg)`
  } else if (sunSetTime > currentHours < sunRiseTime){
    return `url(img/nigth-${weatherConditionsCodes[idWeather]}-bg${size}.jpg)`
  }
}