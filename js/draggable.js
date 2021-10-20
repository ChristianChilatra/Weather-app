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

  const $heightBody = document.querySelector("body").getBoundingClientRect().height
  const $marker = $element.querySelector("[data-marker]")


  $marker.addEventListener("pointermove", draggableMove)
  $marker.addEventListener("pointerdown", draggableDown)
  $marker.addEventListener("pointerup", draggableUp)
  $marker.addEventListener("pointercancel", draggableCancel)
  $marker.addEventListener("pointerout", draggableOut)
  $marker.addEventListener("click", draggableClick)


  let count = 0

  const isAnimatable = config.open
  isAnimatable ? animation() : ""

  let isOpen = config.open
  isOpen ? open(0) : close(calcHeightHidden())


  function draggableMove(event) {
    const cursosDirection = event.movementY
    setPositionDragabble(cursosDirection)
  }
  function draggableDown(event) {
    console.log("Se selecciono")
  }
  function draggableUp(event) {
    console.log("Se levanto")
    bounce()
  }
  function draggableCancel(event) {
    console.log("Se Cancelo")
    bounce()
  }
  function draggableOut(event) {
    console.log("Se Salio")
    bounce()
  }

  function draggableClick(event) {
    console.log("Click")
    if (config.open === false){
      config.open = true
      open(0)
    } else {
      config.open = false
      close(calcHeightHidden())
    }
  }

  function setPositionDragabble(cursosDirection) {
    if (count >= 0 || count <= calcHeightHidden()) {
      count += cursosDirection
    }
    if (count > calcHeightHidden() || count < 0) {
      return false
    }
    setStyleDraggable(count)
    $element.style.insetBlockStart = `${count}px`
  }

  function bounce() {
    if (count > $element.getBoundingClientRect().height / 2) {
      close(calcHeightHidden())
    } else{
      open(0)
    }
  }

  function open(value) {
    isOpen = true
    setStyleDraggable(value)
  }
  function close(value) {
    isOpen = false
    setStyleDraggable(value)
  }

  function setStyleDraggable(count) {
    $element.style.insetBlockStart = `${count}px`
  }

  function animation() {
    $element.style.transition = "inset-block-start .3s"
  }

  function calcHeightHidden() {
    return $element.getBoundingClientRect().height - $marker.getBoundingClientRect().height
  }

}