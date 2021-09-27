const defaultConfig = {
    open: false,
    debu: true,
    animatable: true
}

export default function draggable($element, config = defaultConfig) {
    if (!($element instanceof HTMLElement)) {
        return console.warn(`Elmento invalido, se esperaba un HTMLElement y se recibio ${$element}`)
    }

    let isOpen = config.open

    let isDragging = false

    // .getBoundingClientRect // Permite saber el alto, izquierda, derecha de un elemento
    const elementRect = $element.getBoundingClientRect()
    const ELEMENT_BLOCK_SIZE = elementRect.height

    const $marker = $element.querySelector('[data-marker]')
    const MARKER_BLOCK_SIZE = $marker.getBoundingClientRect().height


    const VISIBLE_Y_POSITION = 0
    const HIDDEN_Y_POSITION = ELEMENT_BLOCK_SIZE - MARKER_BLOCK_SIZE

    let widgetPosition = VISIBLE_Y_POSITION

    isOpen ? open() : close()

    $marker.addEventListener('click', handleClick)
    $marker.addEventListener('pointerdown', handlePointerDown)

    //Cuando suelto el dedo en el mobile
    $marker.addEventListener('pointerup', handlePointerUp)

    // Cuando me salgo de la ventana
    $marker.addEventListener('pointerout', handlePointerOut)

    //Cuando cambio de aplicacion,etc
    $marker.addEventListener('pointercancel', handlePointerCancel)

    //Para cuando haga click y empieze a mover
    $marker.addEventListener('pointercancel', handlePointerMove)

    function handlePointerMove() {
        logger('Pointer Move')
    }

    function handlePointerUp() {
        logger('Pointer OUT')
    }

    function handlePointerOut() {
        logger('Pointer Out')
    }

    function handlePointerCancel() {
        logger('Pointer Cancel')
    }

    function handlePointerDown() {
        logger('Pointer Down')
    }

    function handleClick(event) {
        logger('CLICK')
        toggle()
    }

    function toggle() {
        if (!isDragging) {
            if (!isOpen) {
                return open()
            }
            return close()
        }
    }

    function logger(message) {
        if (config.debuge) {
            console.info(message)
        }
    }

    function open() {
        logger('Abrir Widget')
        isOpen = true
        widgetPosition = VISIBLE_Y_POSITION
        setWidgetPosition(widgetPosition)
    }

    function close() {
        logger('Cerrar  Widget')
        isOpen = false
        widgetPosition = HIDDEN_Y_POSITION
        setWidgetPosition(widgetPosition)
    }

    function setWidgetPosition(value) {
        $element.style.marginBottom = `-${value}px`
    }
}