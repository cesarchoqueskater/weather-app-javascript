const defaultConfig = {
    open: true,
    debug: true,
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

    let startY = 0

    $marker.addEventListener('click', handleClick)
    $marker.addEventListener('pointerdown', handlePointerDown)

    //Cuando suelto el dedo en el mobile
    $marker.addEventListener('pointerup', handlePointerUp)

    // Cuando me salgo de la ventana
    $marker.addEventListener('pointerout', handlePointerOut)

    //Cuando cambio de aplicacion,etc
    $marker.addEventListener('pointercancel', handlePointerCancel)

    //Para cuando haga click y empieze a mover
    $marker.addEventListener('pointermove', handlePointerMove)

    function handlePointerMove(event) {
        logger('Pointer Move')
        drag(event)
    }

    function handlePointerUp(event) {
        logger('Pointer OUT')
    }

    function handlePointerOut(event) {
        logger('Pointer Out')
    }

    function handlePointerCancel(event) {
        logger('Pointer Cancel')
    }

    function handlePointerDown(event) {
        logger('Pointer Down')
        startDrag(event)
    }

    function handleClick(event) {
        logger('CLICK')
        toggle()
    }

    function pageY(event) {
        return event.pageY || event.touches[0].pageY
    }

    function startDrag(event) {
        isDragging = true
        startY = pageY(event)
        logger({ startY })
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
        if (config.debug) {
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

    function drag(event) {
        const cursorY = pageY(event)
        const movementY = cursorY - startY
        widgetPosition = widgetPosition + movementY
        logger(movementY)
        startY = cursorY
        setWidgetPosition(widgetPosition)
    }
}