const defaultConfig = {
  open: true,
  debbug: true,
  animatable: true
}

export default function draggable($element, config = defaultConfig) {

  if ($element instanceof HTMLElement) {

  } else (
    console.warn("Se esperaba elemento HTML, se recibio " + $element)
  )

  let positionDown = 0
  let positionMove = 0
  let positionDraggable = 0

  const $marker = $element.querySelector("[data-marker]")
  const elementMarkerHeight = $marker.getBoundingClientRect().height


  const VISIBLE_Y_POSITION = 0
  const HIDDEN_Y_POSITION = setHiddenYposition()
  console.log(HIDDEN_Y_POSITION)

  let isOpen = config.open
  isOpen ? open(VISIBLE_Y_POSITION) : close(HIDDEN_Y_POSITION)

  const isAnimatable = config.open
  isAnimatable ? animation() : ""

  function setHiddenYposition() {
    const $elementHeight = $element.getBoundingClientRect().height
    return $elementHeight - elementMarkerHeight
  }


  $marker.addEventListener("click", handleClick)
  $marker.addEventListener("pointerdown", handlePointerDown)
  $marker.addEventListener("pointerup", handlePointerUp)
  $marker.addEventListener("pointerout", handlePointerOut)
  $marker.addEventListener("pointercancel", handlePointerCancel)
  $marker.addEventListener("pointermove", handlePointerMove)

  function handlePointerDown(event) {
    // logger("Pointer Down")
    if(positionDown === 0){
      positionDown = event.pageY
      console.log("No hay diferencia")
    } else if (HIDDEN_Y_POSITION != setHiddenYposition()){
      positionDown = event.pageY
      console.log("Sí hay diferencia")
    }
  }
  function handlePointerUp() {
    // logger("Pointer Up")
    bounce()
  }
  function handlePointerOut() {
    // logger("Pointer Out")
    bounce()
  }
  function handlePointerCancel() {
    // logger("Pointer Cancel")
    bounce()
  }
  function handlePointerMove(event) {
    // logger("Pointer Move")
    positionMove = event.pageY
    positionY()
  }
  function handleClick(event) {
    // logger("click")
    toggle(event)
  }
  function positionY() {
    positionDraggable = positionMove - positionDown
    // if (positionDraggable > setHiddenYposition() || positionDraggable < VISIBLE_Y_POSITION) {
    //   return false
    // }
    // console.log("posicion en pixel " + positionDraggable)
    setWidgetPosition(positionDraggable)

  }
  function toggle() {

    if (config.open === false) {
      config.open = true
      open(VISIBLE_Y_POSITION)
    } else {
      config.open = false
      close(setHiddenYposition())
    }
  }

  function bounce() {

  }

  function animation() {
    $element.style.transition = "inset-block-start .1s"
  }

  function logger(message) {
    if (config.debbug) {
      console.info(message)
    }
  }

  function open(value) {
    logger("Abrir Widgt")
    isOpen = true
    setWidgetPosition(value)
  }
  function close(value) {
    logger("Cerrar Widgt")
    isOpen = false
    setWidgetPosition(value)
  }

  function setWidgetPosition(valueCalc) {
    $element.style.insetBlockStart = `${valueCalc}px`
  }
}