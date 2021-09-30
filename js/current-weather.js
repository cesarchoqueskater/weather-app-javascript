// import weather from '../data/current-weather.js'
import { formatDate, formatTemp } from './utils/format-data.js'
import { weatherConditionCodes } from './constants.js'
import { getLatLon } from './geolocation.js'
import { getCurrentWeather } from './services/weather.js'

function setCurrentCity($el, city) {
    $el.textContent = city
}

function setCurrentDate($el) {
    const date = new Date()
    const formattedDate = formatDate(date)
    $el.textContent = formattedDate
}

function setCurrentTemp($el, temp) {
    $el.textContent = formatTemp(temp)
}

function solarStatus(sunriseTime, sunsetTime) {
    const currentHours = new Date().getHours()
    const sunsetHours = sunsetTime.getHours()
    const sunriseHours = sunriseTime.getHours()
    if (currentHours > sunsetHours || currentHours < sunriseHours) {
        return 'night'
    }
    return 'morning'

}

function setBackground($el, conditionCode, solarStatus) {
    const weatherType = weatherConditionCodes[conditionCode]

    // https://developer.mozilla.org/es/docs/Web/API/Window/matchMedia
    if (window.matchMedia("(min-width: 1200px)").matches) {
        /* La pantalla tiene al menos 400 píxeles de ancho */
        $el.style.backgroundImage = `url(./images/${solarStatus}-${weatherType}@3x.jpg)`;
        return true
    }
    const size = window.matchMedia('(-webkit-min-device-pixel-ratio:2)').matches ? '@2x' : ''
    $el.style.backgroundImage = `url(./images/${solarStatus}-${weatherType}${size}.jpg)`;

}

function showCurrentWeather($app, $loader) {
    $app.hidden = false
    $loader.hidden = true

}

function configCurrentWeather(weather) {
    const $app = document.querySelector('#app')
    const $loader = document.querySelector('#loading')

    // loader
    showCurrentWeather($app, $loader)

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
        // const $app = document.querySelector('#app')
    const conditionCode = String(weather.weather[0].id).charAt(0)
    setBackground($app, conditionCode, solarStatus(sunriseTime, sunsetTime))
}

export default async function currentWeather() {
    //GEO // API - weather //Config
    // Dado que la funcion devuelve un promesa, podeos usar then, catch
    // getCurrentPosition().then((data) => {
    //         console.log("data", data)
    //     })
    //     .catch((message) => {
    //         console.log(message)
    //     })

    // Asincronismo
    // https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Statements/async_function
    const { lat, lon, isError } = await getLatLon();
    // console.log(lat, lon, isError)
    if (isError) return console.log('A ocurrido un error ubicandote')
        // Dado que es una promesa, puedo colocarle un await
        // Renombremos el data, con weather 
    const { isError: currentWeatherError, data: weather } = await getCurrentWeather(lat, lon)
    if (currentWeatherError) return console.log('Oh a ocurrido un error trayendo los datos del Clima')
    configCurrentWeather(weather)
        // console.log(weather)
}