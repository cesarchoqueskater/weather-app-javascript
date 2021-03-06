export function setViewportSize($el) {
    const ViewportBlockSize = getViewport()
        //Agrego la propiedad block-size desde javascript 
    $el.style.blockSize = `${ViewportBlockSize}px`
}
export function getViewport() {
    // Obtener el alto de un navegador
    return window.innerHeight
}

//Evento dentro de window
export function onViewportResize(callback) {
    window.addEventListener('resize', callback)
}

export function offViewportResize(callback) {
    window.removeEventListener('resize', callback)
}

export function viewportSize($el) {
    setViewportSize($el)

    onViewportResize(() => setViewportSize($el))
}