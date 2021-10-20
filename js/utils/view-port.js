function getViewPort() {
  return window.innerHeight // retornamos el valor del alto de la pantalla visual ViewPort
}

function updateViewPort($elemento){
  $elemento.style.blockSize = `${getViewPort()}px` // Aplicamos la altura del ViewPort al Body
}

function configViewPort(callBack) {
  window.addEventListener('resize',callBack) // Funcion ejcutando callback cuando se 
                                             // detecta cambio en el tamaño de vista "resize"
}

export function setViewPort($elemento){
  configViewPort(()=>updateViewPort($elemento)) // ejecuta configuracion de alto si ocurre evento resize
}