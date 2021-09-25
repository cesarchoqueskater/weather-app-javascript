// https://developer.mozilla.org/es/docs/Web/API/Geolocation
function geolocationSupport() {
    // if ('geolocation' in navigator) {
    //     return true
    // }
    // return false

    //De por si la linea devuelve true or false
    return 'geolocation' in navigator
}

// https://developer.mozilla.org/es/docs/Web/Api/PositionOptions
const defaultOptions = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 1000000
}

export function getCurrentPosition(options = defaultOptions) {
    //Si es false, devolvemos un error, sino se salta la linea de codigo
    if (!geolocationSupport()) throw new Error('No hay soporte de geolocalización en tu navegador')

    //Promesas
    // https://developer.mozilla.org/es/docs/Web/JavaScript/Guide/Using_promises
    return new Promise((resolve, reject) => {
        //Asincrona
        //El getCurrentPosition devuelve 3 funciones, parametros, la 1era es cuando todo sale bien, damos permisos
        navigator.geolocation.getCurrentPosition((position) => {
                // console.log(position)
                const lat = position.coords.latitude
                const lon = position.coords.longitude
                    // Al metodo resolve se le puede enviar solo 1 cosa, puede ser un objeto
                resolve(position)
            },
            //2do parametro, se ejecuta cuando no damos permisos
            () => {
                //En esta parte es cuando no damos permisos para la ubicacion
                reject('No hemos podido obtener tu ubicación')
            },
            // Es un objeto de configuracion, para cuando queremos revalidar la ubicacion
            options)
    })
}


export async function getLatLon(options = defaultOptions) {
    try {
        // Podemos renombrar con :
        const { coords: { latitude: lat, longitude: lon } } = await getCurrentPosition(options)
        return { lat, lon, isError: false }
    } catch (error) {
        return { isError: true, lat: null, lon: null }
    }
}