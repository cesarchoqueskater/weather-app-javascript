import { createDOM } from "./utils/dom.js";
import { formatTemp } from './utils/format-data.js'

export function summaryDetailsTimeTemplate({ minTemperature, maxTemperature, wind, humidity, indexWeather, index }) {
    if (indexWeather === 0) {
        return `
            <div class="dayWeather-summary" id="dayWeather-summary-${index}-${indexWeather}">
                <span>Max: ${maxTemperature}°</span>
                <span>Min: ${minTemperature}°</span>
                <span>Viento: ${wind}km-h </span>
                <span>Humedad: ${humidity}%</span>
            </div>
        `
    }
    return `
            <div class="dayWeather-summary" id="dayWeather-summary-${index}-${indexWeather}" hidden>
                <span>Max: ${maxTemperature}°</span>
                <span>Min: ${minTemperature}°</span>
                <span>Viento: ${wind}km-h </span>
                <span>Humedad: ${humidity}%</span>
            </div>
        `
}

export function createSummaryTime(weather, indexWeather, index) {

    const minTemperature = formatTemp(weather.main.temp_min);
    const maxTemperature = formatTemp(weather.main.temp_max);
    const wind = weather.wind.speed;
    const humidity = weather.main.humidity;

    const config = {
        index,
        indexWeather,
        minTemperature,
        maxTemperature,
        wind,
        humidity
    }
    return createDOM(summaryDetailsTimeTemplate(config))
}