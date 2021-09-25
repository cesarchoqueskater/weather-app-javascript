import { BASE_API, API_KEY } from '../constants.js'

// https://developer.mozilla.org/es/docs/Web/API/Fetch_API

// https: //api.openweathermap.org/data/2.5/weather?q=Lima&appid=5ba6a18b8f30a80c2ecce6c444c813e8

export async function getCurrentWeather(lat, lon) {
    const response = await fetch(`${BASE_API}weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`)
        // console.log("🚀 response", response)
        // el ok es un nombre de un valor devuelto del api
    if (!response.ok) return {
        isError: true,
        data: null
    }
    const data = await response.json()
        // debugger
    return {
        isError: false,
        // Si se llamara el valor igual que la propiedad, solo coloco la propieda y funciona
        data,
    }
}