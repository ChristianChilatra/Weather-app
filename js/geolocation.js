function geolocationSupport() {
  return "geolocation" in navigator
}

const defaultOptions = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 1000000
}

export function getCurrentPosition(option) {

  if (!geolocationSupport()) throw new Error("No hay soporte de Geolocalizacion en tu navegador")

  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition((position) => {
      resolve(position)
    }, () => {
      reject(console.log("No hemos podido acceder a los datos de la ubicación"))
    }, option)
  })
}

export async function getLatLong(option = defaultOptions) {
  try {
    const { coords: { latitude: latitud, longitude: longitud} } = await getCurrentPosition(option)
    return {latitud, longitud}
  } catch (error) {
    console.log("No se pudo obtener Latitud y Longitud, " + error.message)
  }
}