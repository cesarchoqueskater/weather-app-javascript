import { getWeeklyWeather } from './services/weather.js'
import { getLatLon } from './geolocation.js'
import { formatWeekList } from './utils/format-data.js'

function configWeeklyWeather() {

}

export default async function weeklyWeather() {
    const { lat, lon, isError } = await getLatLon();
    if (isError) return console.log('A ocurrido en el pronostico del clima')
    const { isError: weeklyWeatherError, data: weather } = await getWeeklyWeather(lat, lon)
    if (weeklyWeatherError) return console.log('Oh a ocurrido un error trayendo el pronostico del Clima')

    const weeklist = formatWeekList(weather.list)
        // debugger
    configWeeklyWeather(weather)
}