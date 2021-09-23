import weather from '../data/current-weather.js'
import { formatData, formatTemp } from './utils/format-data.js'


function setCurrentCity($el, city) {
    $el.textContent = city
}

function setCurrentDate($el) {
    const date = new Date()
    const formattedDate = formatData(date)
    $el.textContent = formattedDate
}

function setCurrentTemp($el, temp) {
    $el.textContent = formatTemp(temp)
}

function solarStatus(sunsetTime, sunriseTime) {
    const currentHours = new Date().getHours()
    const sunsetHours = sunsetTime.getHours()
    const sunriseHours = sunriseTime.getHours()
    if (currentHours > sunsetHours || currentHours < sunriseHours) {
        return 'night'
    }
    return 'morning'

}

function setBackground($el, solarStatus) {
    $el.style.backgroundImage = `url(./images/${solarStatus}-cloudy.jpg)`;
}

function configCurrentWeather(weather) {

    // loader
    // date

    const $currentWeatherDate = document.querySelector('#current-weather-date')
    setCurrentDate($currentWeatherDate)
        // city
    const $currentWeatherCity = document.querySelector('#current-weather-city')
    const city = weather.name
    setCurrentCity($currentWeatherCity, city)

    // temp
    const $currentWeatherTemp = document.querySelector('#current-weather-temp')
    const temp = weather.main.temp
    setCurrentTemp($currentWeatherTemp, temp)

    // background
    // Multiplicamos por 1000, para convertirlos en milisegundos
    const sunriseTime = new Date(weather.sys.sunrise * 1000)
    const sunsetTime = new Date(weather.sys.sunset * 1000)
        // debugger
    const $app = document.querySelector('#app')
    setBackground($app, solarStatus(sunriseTime, sunsetTime))
}

export default function currentWeather() {
    //GEO // API - weather //Config
    configCurrentWeather(weather)
    console.log(weather)
}