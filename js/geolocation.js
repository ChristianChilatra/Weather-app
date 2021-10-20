function geolocationSupport() {
  return "geolocation" in navigator   //Confirmamos si hay soporte de Geolocalizacion en Navegador
}

const defaultOptions = {  
  enableHighAccuracy: true,
  timeout: 5000,                 //Configuracion default parametros Geolocalizacion
  maximumAge: 1000000
}

export function getCurrentPosition(option = defaultOptions) { // Obtenemos posicion actual GPS

  if (!geolocationSupport()) throw new Error("No hay soporte de Geolocalizacion en tu navegador") // Retornamos mss si no hay soporte en navegador

  return new Promise((resolve, reject) => {                               //Ejecutamos Promise para obtener resultado de peticiona Geolocalizacion
    navigator.geolocation.getCurrentPosition((position) => {              // CallBack obteniendo posicion actual
      resolve(position)                                                   // Si la promesa se completa optenemos la posicion de Geolocalizacion
    }, () => {
      reject(console.log("No hemos podido acceder a los datos de la ubicación")) // Si la promesa no se completa retorna mss mas parametros usados en el consumo
    }, option)
  })
}

export async function getLatLong(option = defaultOptions) {  //La funcion obtiene latitud y longitud de objeto "position" -- Funcion async ya que retorna valor de una PROMISE
  try { // contiene error si Promise no se completa
    const { coords: { latitude: latitud, longitude: longitud} } = await getCurrentPosition(option) //creamos objeto con el datos de promise
    return {latitud, longitud} //retornamos latitud y longitud
  } catch (error) {
    console.log("No se pudo obtener Latitud y Longitud, " + error.message) //retornamos mensaje de error si Promise no se completa
  }
}