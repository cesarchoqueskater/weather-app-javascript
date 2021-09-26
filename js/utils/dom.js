export function createDOM(string) {
    // API/DOMParse
    const parser = new DOMParser()
    const HTML = parser.parseFromString(string, "text/html")
    return HTML.body.firstChild
    debugger
}