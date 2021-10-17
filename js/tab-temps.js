import { setListWeeklyWeather, setListTemp } from "./utils/format-data.js";
import { createDOM } from "./utils/dom.js";
import { weatherConditionsCodes } from "./utils/constants.js"


function setDomIcon(elementListTemp) {
  return weatherConditionsCodes[String(elementListTemp.weather[0].id)[0]]
}

function setDomTab($setWeeklyWeather, getListTemp, iterator) {

  if (getListTemp[iterator-1].length === 0) {
    $setWeeklyWeather.append(createDOM(`
    <h2>No hay pronosticos disponibles</h2>`))
  }else{

    const detailsTemp = []

    getListTemp[iterator - 1].forEach((elemento, index) => {

      const icon = setDomIcon(elemento)
      const arrayTemporal = []
      arrayTemporal.push(elemento.main.temp_max, elemento.main.temp_min, elemento.main.temp_min, elemento.wind.speed, elemento.main.humidity)
      detailsTemp.push(arrayTemporal)


      let tempWeeklyWeather = Math.floor(elemento.main.temp)

      $setWeeklyWeather.append(createDOM(`
                  <button class="tabTemp" id=tabTemp${index}>
                    <strong>${elemento.dt_txt.split(" ")[1].split(":")[0]} Hr</strong>
                    <img src="icon/${icon}.png" alt="imagen soleado" Width=19px Height=22px>
                    <span id="temp">${tempWeeklyWeather}°</span>
                  </button>
                  `))
    })

    const $tabTemps = document.querySelector(".containerWeather")
    const $tabTemp = $tabTemps.querySelectorAll("button")
    const $tabDetail = document.querySelector(".containerDetails")

    showTabDetails($tabTemp, $tabDetail, detailsTemp)

  }

    
}


function showTabDetails($tabTemp, $tabDetail, detailsTemp) {

  const $detailsText = $tabDetail.querySelectorAll("div")

  $tabTemp.forEach(($element, index) => {

    $element.addEventListener("click", (event) => {
      $tabDetail.style.display = "grid"

      $detailsText[0].querySelector("#tempMax").value = `${detailsTemp[index][0]}°`
      $detailsText[1].querySelector("#tempMin").value = `${detailsTemp[index][1]}°`
      $detailsText[2].querySelector("#Viento").value = `${detailsTemp[index][2]} Km-h`
      $detailsText[3].querySelector("#Humedad").value = `${detailsTemp[index][3]}%`

    })
  })
}
export function showWeeklyWeather(weather) {

  const $setWeeklyWeather = document.querySelector(".containerWeather")
  const getListWeeklyWeather = setListWeeklyWeather(weather)
  const getListTemp = setListTemp(getListWeeklyWeather)

  const $tabDays = document.querySelector(".containerTime")
  const $tabDay = $tabDays.querySelectorAll(".tabDays")


  $tabDay.forEach(($elemento) => {
    $elemento.addEventListener("click", (event) => {

      const targetId = event.target.id

      $setWeeklyWeather.innerHTML = ""

      switch (targetId) {
        case "tab1":
          setDomTab($setWeeklyWeather, getListTemp, 1)
          break;
        case "tab2":
          setDomTab($setWeeklyWeather, getListTemp, 2)
          break;
        case "tab3":
          setDomTab($setWeeklyWeather, getListTemp, 3)
          break;
        case "tab4":
          setDomTab($setWeeklyWeather, getListTemp, 4)
          break;
      }
    })
  })

}