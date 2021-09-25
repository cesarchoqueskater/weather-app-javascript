// https://developer.mozilla.org/es/docs/Web/API/Geolocation
function geolocationSupport() {
    // if ('geolocation' in navigator) {
    //     return true
    // }
    // return false

    //De por si la linea devuelve true or false
    return 'geolocation' in navigator
}

export function getCurrentPosition() {
    //Si es false, devolvemos un error, sino se salta la linea de codigo
    if (!geolocationSupport()) throw new Error('No hay soporte de geolocalización en tu navegador')

    navigator.geolocation.getCurrentPosition((position) => {
        console.log(position)
        const lat = position.coords.latitude
        const lon = position.coords.longitude
    })

}