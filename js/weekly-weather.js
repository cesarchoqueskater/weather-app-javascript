import { getWeeklyWeather } from './services/weather.js'
import { getLatLon } from './geolocation.js'
import { formatWeekList } from './utils/format-data.js'
import { createDOM } from './utils/dom.js'
import { createPeriodTime } from './period-time.js'
import draggable from './draggable.js'
import { createSummaryTime } from './summary-time.js'

function tabPanelTemplate(id) {
    return `
            <div class="tabPanel" tabindex="0" aria-labelledby="tab-${id}">
                <div class="dayWeather" id="dayWeather-${id}">
                    <ul class="dayWeather-list" id="dayWeather-list-${id}">
                    </ul>
                </div>
            </div>
    `
}

function createTabPanel(id) {
    const $panel = createDOM(tabPanelTemplate(id))
    if (id > 0) {
        $panel.hidden = true
    }
    return $panel
}

function configWeeklyWeather(weeklist) {
    const $container = document.querySelector('.tabs')
    weeklist.forEach((day, index) => {
        const $panel = createTabPanel(index)
        $container.append($panel)
        day.forEach((weather, indexWeather) => {
            $panel.querySelector('.dayWeather-list').append(createPeriodTime(weather, indexWeather))
            $panel.addEventListener('click', selectionWeeklyWeather)
            $panel.append(createSummaryTime(weather, indexWeather))
        })
    })
}

function selectionWeeklyWeather(event) {

    console.log("Hice Click en este : " + event.path[1].id)
        // dayWeather-item-4
    const $numberDayWeather = String(event.path[1].id).charAt(16)
    const $selectionDayWeather = document.querySelector(`#dayWeather-item-${$numberDayWeather}`)
    const $activeDayWeather = document.querySelector('.dayWeather-item[is-selected="true"]')

    // Seleccionar y pintar/no pintar el .dayWeather-item
    $activeDayWeather.removeAttribute('is-selected')
    $selectionDayWeather.setAttribute('is-selected', true)

    // Mostrar su respectivo summary de lo seleccionado
    const $summaryInformation = document.querySelector(`#dayWeather-summary-${$numberDayWeather}`)
    const $summaryInformationSelected = document.querySelector(`.dayWeather-summary:not([hidden])`)
    $summaryInformation.hidden = false
    $summaryInformationSelected.hidden = true
}


export default async function weeklyWeather() {
    const $container = document.querySelector('.weeklyWeather')
    const { lat, lon, isError } = await getLatLon();
    if (isError) return console.log('A ocurrido en el pronostico del clima')
    const { isError: weeklyWeatherError, data: weather } = await getWeeklyWeather(lat, lon)
    if (weeklyWeatherError) return console.log('Oh a ocurrido un error trayendo el pronostico del Clima')

    const weeklist = formatWeekList(weather.list)
    configWeeklyWeather(weeklist)
    draggable($container)
}