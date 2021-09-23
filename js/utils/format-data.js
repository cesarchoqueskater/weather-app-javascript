const defaultDateOptions = {
    day: 'numeric',
    weekday: 'long',
    month: 'long'
}


//No le coloco default, pues en este archivo habra varias funciones, y asi podre seleccionar la funcion a desear

export function formatData(date, options = defaultDateOptions) {
    return new Intl.DateTimeFormat('es', options).format(date)
}