
import { weatherConditionsCodes } from "./constants.js"


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

export function setFormatTemp(temp) {
  return `${Math.floor(temp)}°`
}

export function setBackground(weather) {

  const date = new Date()
  const currentHours = date.getHours()
  const sunRiseTime = new Date(weather.sys.sunrise * 1000).getHours()
  const sunSetTime = new Date(weather.sys.sunset * 1000).getHours()
  let idWeather = String(weather.weather[0].id)[0]


  let size = (window.matchMedia("(-webkit-max-device-pixel-ratio:2)").matches) ? "-x2" : ""
  if (currentHours >= sunRiseTime && currentHours <= sunSetTime) {
    return `url(img/day-${weatherConditionsCodes[idWeather]}-bg${size}.jpg)`
  } else if (currentHours < sunRiseTime || currentHours > sunSetTime) {
    return `url(img/nigth-${weatherConditionsCodes[idWeather]}-bg${size}.jpg)`
  }
}

export function setListWeeklyWeather(weather) {
  const listTempWeekly = []
  let listTemporal = []
  for (const prop in weather.list) {
    listTemporal.push(weather.list[prop])
    if (listTemporal.length === 8) {
      listTempWeekly.push(listTemporal)
      listTemporal = []
    }
  }
  return listTempWeekly
}

export function setListTemp(listWeeklyWeather) {
  const date = new Date()
  const currentHours = date.getHours()
  const currentDay = date.getDate()
  const newArray = []
  const dayDate = listWeeklyWeather[0][0].dt_txt.split(" ")[0].split("-")[2]
  const hourDate = listWeeklyWeather[0][0].dt_txt.split(" ")[1].split(":")[0]
  console.log(currentDay)
  console.log(Number(dayDate))

  if (Number(dayDate) === currentDay) {
    listWeeklyWeather[0].forEach((elemento) => {
      if (hourDate >= currentHours) {
        newArray.push(elemento)
      }
    })
    listWeeklyWeather.shift()
    listWeeklyWeather.unshift(newArray)


  } else {
    listWeeklyWeather.unshift(newArray)
  }
  return listWeeklyWeather
}
