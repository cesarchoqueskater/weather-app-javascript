const defaultConfig = {
    open: true,
    debu: true,
    animatable: true
}

export default function draggable($element, config = defaultConfig) {
    if (!($element instanceof HTMLElement)) {
        return console.warn(`Elmento invalido, se esperaba un HTMLElement y se recibio ${$element}`)
    }

    function logger(message) {
        if (config.debuge) {
            console.info(message)
        }
    }
    // debugger
}