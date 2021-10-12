import { getLatLong } from "./geolocation.js";
import { getWeather } from "./services/weather.js";
import { showWeeklyWeather} from "./tab-temps.js"



export async function weeklyWeather(){
  try {
    //obtenemos lat y lon de Geolocation
    const { latitud, longitud } = await getLatLong()
    //contenemos en variable objeto API Weather
    const {weeklyWeather } = await getWeather(latitud, longitud)
    //Ejecutamos configuracion visual de datos
    showWeeklyWeather(weeklyWeather)
  } catch (err) {
    console.log(err.message)
  }
}


