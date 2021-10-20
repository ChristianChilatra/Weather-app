
import { weatherConditionsCodes } from "./constants.js"


export function setFormatTime() {

  const configTime = {
    day: "numeric",
    weekday: "long",    //Se establece formato de funcion Intl.DateTimeFormat
    month: "long"
  }

  const date = new Date()
  const formatTime = new Intl.DateTimeFormat("es", configTime).format(date) //Intl.DateTimeFormat atrapa objeto de fecha formatiando datos
  return formatTime //retorna fecha modificada "Miércoles, 20 de Octubre"
}

export function setFormatTemp(temp) {
  return `${Math.floor(temp)}°`  //redondea temperatura
}

export function setBackground(weather) { //establece background segun estado del clima

  const date = new Date() //almacenamos tiempo actual
  const currentHours = date.getHours() //almacenamos hora actual
  //Obtenemos del Objeto API Response sunRiseTime que seria el tiempo de salida del sol, 
  //con este dato lo convertimos a dato legible por Date() y seguido obtenemos la hora
  const sunRiseTime = new Date(weather.sys.sunrise * 1000).getHours() 
  //Obtenemos del Objeto API Response sunRiseTime que seria el tiempo en que se oculta sol, 
  //con este dato lo convertimos a dato legible por Date() y seguido obtenemos la hora
  const sunSetTime = new Date(weather.sys.sunset * 1000).getHours()

  let idWeather = String(weather.weather[0].id)[0] // obtenemos el ID que hace referencia al clima actual de ubicacion


  let size = (window.matchMedia("(-webkit-max-device-pixel-ratio:2)").matches) ? "-x2" : ""
  if (currentHours >= sunRiseTime && currentHours <= sunSetTime) {
    return `url(img/day-${weatherConditionsCodes[idWeather]}-bg${size}.jpg)`  //Establecemos los tiempos de cuando sale y se ocualta el sol
  } else if (currentHours < sunRiseTime || currentHours > sunSetTime) {       //como limites para establecer el Background de dia o noche
    return `url(img/nigth-${weatherConditionsCodes[idWeather]}-bg${size}.jpg)`  
  }                                                                           //Igualmente el ID del clima se considera en la configuracion de BackGround
}

export function setListWeeklyWeather(weather) {
  const listTempWeekly = []

  console.log(weather)
  for (const prop in weather.list) {          //Se extrae lista de los pronosticos de tiempo del response JSON
    listTempWeekly.push(weather.list[prop])       
  }
  console.log(listTempWeekly)
  return listTempWeekly
}

export function setListTemp(listWeeklyWeather) {

  const date = new Date()
  const currentHours = date.getHours()
  let currentDay = date.getDate()               //la funcion configura la lista de pronosticos  segun el dia retornando un nuevo array seccionado
  let arrayTemporal = []
  const arrayListTemp = []

  listWeeklyWeather.forEach((elemento) => {

    const dayDate = elemento.dt_txt.split(" ")[0].split("-")[2]
    const hourDate = elemento.dt_txt.split(" ")[1].split(":")[0]

    if (Number(dayDate) === currentDay){
      arrayTemporal.push(elemento)

    } else{
      arrayListTemp.push(arrayTemporal)
      currentDay++
      arrayTemporal = []
    }
  })
  return arrayListTemp
}
