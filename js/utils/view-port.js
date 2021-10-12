function getViewPort() {
  return window.innerHeight
}

function updateViewPort($elemento){
  $elemento.style.blockSize = `${getViewPort()}px`
}

function configViewPort(callBack) {
  window.addEventListener('resize',callBack)
}

export function setViewPort($elemento){
  configViewPort(()=>updateViewPort($elemento))
}