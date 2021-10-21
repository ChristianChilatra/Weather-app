import {daysIndexDate} from "./utils/constants.js"

const $tabDays = document.querySelector(".containerTime")
const $tabDay = $tabDays.querySelectorAll(".tabDays")
const $tabTemps = document.querySelector(".containerWeather")


let day = new Date().getDay()

$tabDay.forEach(($element, index) => {
  showTabTemps($element)
  $element.querySelector("h2").textContent = daysIndexDate[day]
  if (index === 0) {
    $element.querySelector("h2").textContent = "Hoy"
  }
  day++
  (day > 6)?day = 0 : ""
})

function showTabTemps($element){
  $element.addEventListener("click", (event)=>{ //Al reconocer evento Click sobre los TabDay modifica Display en elemento TabTemps
    $tabTemps.style.display = "flex"
  })
}
