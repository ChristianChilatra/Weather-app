import { KEY_API, BASE_API_CURRENTLY, BASE_API_WEEKLY } from "../utils/constants.js"

export async function getWeather(latitud, longitud) {

  try {
    const responseCurrentlyWeather = await fetch(`${BASE_API_CURRENTLY}?lat=${latitud}&lon=${longitud}&appid=${KEY_API}&units=metric`)
    const currentlyWeather = await responseCurrentlyWeather.json()
    const responseWeeklyWeather = await fetch(`${BASE_API_WEEKLY}?lat=${latitud}&lon=${longitud}&appid=${KEY_API}&units=metric`)
    const weeklyWeather = await responseWeeklyWeather.json()
    return { responseCurrentlyWeather, currentlyWeather, weeklyWeather }

  } catch (error) {
    console.log(error.message)
  }
}