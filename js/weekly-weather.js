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
                    <ul class="dayWeather-list dayWeather-${id}" id="dayWeather-list-${id}">
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
            // <div class="tabPanel" tabindex="0" aria-labelledby="tab-0">
            //     <div class="dayWeather" id="dayWeather-0">
            //         <ul class="dayWeather-list" id="dayWeather-list-0">
            //     </div>
            // </div>
            // debugger
        $container.append($panel)
        day.forEach((weather, indexWeather) => {
            $panel.querySelector('.dayWeather-list').append(createPeriodTime(weather, indexWeather, index))
            $panel.append(createSummaryTime(weather, indexWeather, index))

            const valueIndexWeather = document.querySelector(`#dayWeather-item-${index}-${indexWeather}`)
            valueIndexWeather.addEventListener('click', function(event) {
                // debugger
                console.log('Se hizo click ' + event.currentTarget.id)
                const $activeDayWeather = document.querySelector(`#dayWeather-list-${index} li.is-selected`)
                const $selectionDayWeather = document.querySelector(`#dayWeather-item-${index}-${indexWeather}`)
                $activeDayWeather.classList.remove('is-selected')
                $selectionDayWeather.classList.add('is-selected')

                //Mostrar respectivo summaryWeather
                const $summaryInformation = document.querySelector(`#dayWeather-summary-${index}-${indexWeather}`)
                    // debugger
                    // Aquellos que no tienen la propiedad hidden
                const $summaryInformationSelected = document.querySelector(`.tabPanel[aria-labelledby="tab-${index}"] div.dayWeather-summary:not([hidden])`)
                $summaryInformation.hidden = false
                $summaryInformationSelected.hidden = true
            })
        })
    })
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