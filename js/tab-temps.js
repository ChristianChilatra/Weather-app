import { setListWeeklyWeather, setListTemp } from "./utils/format-data.js";
import { createDOM } from "./utils/dom.js";



export function showWeeklyWeather(weather) {

  const $setWeeklyWeather = document.querySelector(".containerWeather")
  const getListWeeklyWeather = setListWeeklyWeather(weather)
  const getListTemp = setListTemp(getListWeeklyWeather)

  const $tabDays = document.querySelector(".containerTime")
  const $tabDay = $tabDays.querySelectorAll(".tabDays")

  $tabDay.forEach(($elemento) => {
    $elemento.addEventListener("click", (event) => {

      const targetId = event.target.id

      $setWeeklyWeather.innerHTML  = ""

      switch (targetId) {
        case "tab1":
          getListTemp[0].forEach((elemento) => {
            let tempWeeklyWeather = Math.floor(elemento.main.temp)
            $setWeeklyWeather.append(createDOM(`
              <button class="tabTemp">
                Día <br> ${elemento.dt_txt.split(" ")[0].split("-")[2]}<br>
                ${elemento.dt_txt.split(" ")[1].split(":")[0]} Hr
                <img src="icon/sunny.png" alt="imagen soleado" Width=19px Height=22px>
                <span id="temp">${tempWeeklyWeather}°</span>
              </button>
              `))
          })
          break;
        case "tab2":
          getListTemp[1].forEach((elemento) => {
            let tempWeeklyWeather = Math.floor(elemento.main.temp)
            $setWeeklyWeather.append(createDOM(`
              <button class="tabTemp">
                Día <br> ${elemento.dt_txt.split(" ")[0].split("-")[2]}<br>
                ${elemento.dt_txt.split(" ")[1].split(":")[0]} Hr
                <img src="icon/sunny.png" alt="imagen soleado" Width=19px Height=22px>
                <span id="temp">${tempWeeklyWeather}°</span>
              </button>
              `))
          })
          break;
        case "tab3":
          getListTemp[2].forEach((elemento) => {
            let tempWeeklyWeather = Math.floor(elemento.main.temp)
            $setWeeklyWeather.append(createDOM(`
              <button class="tabTemp">
                Día <br> ${elemento.dt_txt.split(" ")[0].split("-")[2]}<br>
                ${elemento.dt_txt.split(" ")[1].split(":")[0]} Hr
                <img src="icon/sunny.png" alt="imagen soleado" Width=19px Height=22px>
                <span id="temp">${tempWeeklyWeather}°</span>
              </button>
              `))
          })
          break;
        case "tab4":
          getListTemp[3].forEach((elemento) => {
            let tempWeeklyWeather = Math.floor(elemento.main.temp)
            $setWeeklyWeather.append(createDOM(`
              <button class="tabTemp">
                Día <br> ${elemento.dt_txt.split(" ")[0].split("-")[2]}<br>
                ${elemento.dt_txt.split(" ")[1].split(":")[0]} Hr
                <img src="icon/sunny.png" alt="imagen soleado" Width=19px Height=22px>
                <span id="temp">${tempWeeklyWeather}°</span>
              </button>
              `))
          })
          break;
      }
    })
  })

}