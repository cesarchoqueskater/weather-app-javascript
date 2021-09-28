import { createDOM } from './utils/dom.js'
import { formatDate, formatTemp } from './utils/format-data.js'

export function periodTimeTemplate({ temp, date, icon, description, indexWeather }) {
    if (indexWeather === 0) {
        return `
            <li class="dayWeather-item" id="dayWeather-item-${indexWeather}" is-selected="true">
                <span class="dayWeather-time">${date}</span>
                <img class="dayWeather-icon" height="48" width="48" src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="${description}" rain="">
                <span class="dayWeather-temp">${temp}</span>
            </li> 
        `
    }
    return `
    <li class="dayWeather-item" id="dayWeather-item-${indexWeather}">
        <span class="dayWeather-time">${date}</span>
        <img class="dayWeather-icon" height="48" width="48" src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="${description}" rain="">
        <span class="dayWeather-temp">${temp}</span>
    </li> 
`
}

export function createPeriodTime(weather, indexWeather) {
    // debugger
    //temp
    //icon
    //date
    //description
    const dateOptions = {
        hour: 'numeric',
        hour12: true
    }
    const temp = formatTemp(weather.main.temp)
    const date = formatDate(new Date(weather.dt * 1000), dateOptions)
    const config = {
        indexWeather,
        temp,
        date,
        icon: weather.weather[0].icon,
        description: weather.weather[0].description

    }
    return createDOM(periodTimeTemplate(config))
}