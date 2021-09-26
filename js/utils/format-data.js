const defaultDateOptions = {
    day: 'numeric',
    weekday: 'long',
    month: 'long'
}


//No le coloco default, pues en este archivo habra varias funciones, y asi podre seleccionar la funcion a desear

export function formatData(date, options = defaultDateOptions) {
    return new Intl.DateTimeFormat('es', options).format(date)
}

export function formatTemp(value) {
    return `${Math.floor(value)}°`
}

export function formatWeekList(rawData) {
    let dayList = []
    const weeklist = []
    rawData.forEach((item, index) => {
        dayList.push(item)
            // Colocamos 8, pues el rawData devuelve 40 valores y estamos queriendo usarlos entre los 5 dias que tenemos
        if ((index + 1) % 8 === 0) {
            weeklist.push(dayList)
            dayList = []
        }
    })
    return weeklist
}