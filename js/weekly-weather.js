import { getWeeklyWeather } from './services/weather.js'
import { getLatLon } from './geolocation.js'
import { formatWeekList } from './utils/format-data.js'
import { createDOM } from './utils/dom.js'


function configWeeklyWeather(weeklist) {
    const $container = document.querySelector('.weeklyWeather')
    weeklist.forEach((item) => {
        const $el = createDOM('<h2>Hola Mundo</h2>')
            // $el.textContent = 'Hola Mundo'
        $container.append($el)
    })
}

export default async function weeklyWeather() {
    const { lat, lon, isError } = await getLatLon();
    if (isError) return console.log('A ocurrido en el pronostico del clima')
    const { isError: weeklyWeatherError, data: weather } = await getWeeklyWeather(lat, lon)
    if (weeklyWeatherError) return console.log('Oh a ocurrido un error trayendo el pronostico del Clima')

    const weeklist = formatWeekList(weather.list)
    configWeeklyWeather(weeklist)
}