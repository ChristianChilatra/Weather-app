import { KEY_API, BASE_API_CURRENTLY, BASE_API_WEEKLY } from "../utils/constants.js"  //importamos parametros de usuario registrado en API

export async function getWeather(latitud, longitud) {  //retorna objeto con datos de clima segun ubicacion establecida por parametros de geolocalizacion
  try {
    const responseCurrentlyWeather = await fetch(`${BASE_API_CURRENTLY}?lat=${latitud}&lon=${longitud}&appid=${KEY_API}&units=metric`) //fetch para consumo de API, almacenamos el objeto estado de clima actual
    const currentlyWeather = await responseCurrentlyWeather.json() //configuramos la respuesta con formato JSON
    const responseWeeklyWeather = await fetch(`${BASE_API_WEEKLY}?lat=${latitud}&lon=${longitud}&appid=${KEY_API}&units=metric`) //fetch para consumo de API, almacenamos el objeto estado de clima semanal
    const weeklyWeather = await responseWeeklyWeather.json() //configuramos la respuesta con formato JSON
    return { responseCurrentlyWeather, currentlyWeather, weeklyWeather } //retornamos Objeto de Clima actual, clima actual en JSON y clima semanal en JSON

  } catch (error) {
    console.log(error.message) //retornamos mensaje si la peticion FETCH retorna error (Promise)
  }
}