const defaultConfig = {
  open: true,
  debbug:true,
  animatable: true
}

export default function draggable($elemento, config = defaultConfig){
  if($elemento instanceof HTMLElement){

  }else(
    console.warn("Se esperaba elemento HTML, se recibio " + $elemento)
  )

  let isOpen = config.open
  isOpen ? open($elemento) : close($elemento)

  function logger(message){
    if (config.debbug){
      console.info(message)
    }
  }

  function open($elemento){
    logger("Abrir Widgt")
    isOpen = true
    console.log($elemento)
    $elemento.style.insetBlockStart = "0%"
  }
  function close($elemento){
    logger("Abrir Widgt")
    isOpen = false
    $elemento.style.insetBlockStart = "75%"
  }
}