import {getLatLong} from "../geolocation.js"
import { KEY_API, BASE_API} from "../utils/constants.js"

export async function getCurrentWeather(latitud, longitud){

  try {
    const response = await fetch(`${BASE_API}?lat=${latitud}&lon=${longitud}&appid=${KEY_API}&units=metric`)
    const data = await response.json()
    return data
  } catch (error) {
    console.log(error.message)
  }

}


