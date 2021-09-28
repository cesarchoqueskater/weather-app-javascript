import { createDOM } from "./utils/dom.js";

export function summaryDetailsTimeTemplate({ minTemperature, maxTemperature, wind, humidity, indexWeather }) {
    if (indexWeather === 0) {
        return `
            <div class="dayWeather-summary" id="dayWeather-summary-${indexWeather}">
                <span>Max ${maxTemperature}°</span>
                <span>Min ${minTemperature}°</span>
                <span>Viento:${wind}km-h </span>
                <span>Humedad: ${humidity}%</span>
            </div>
        `
    }
    return `
            <div class="dayWeather-summary" id="dayWeather-summary-${indexWeather}" hidden>
                <span>Max ${maxTemperature}°</span>
                <span>Min ${minTemperature}°</span>
                <span>Viento:${wind}km-h </span>
                <span>Humedad: ${humidity}%</span>
            </div>
        `
}

export function createSummaryTime(weather, indexWeather) {

    const minTemperature = weather.main.temp_min;
    const maxTemperature = weather.main.temp_max;
    const wind = weather.wind.speed;
    const humidity = weather.main.humidity;

    const config = {
        indexWeather,
        minTemperature,
        maxTemperature,
        wind,
        humidity
    }
    return createDOM(summaryDetailsTimeTemplate(config))
}