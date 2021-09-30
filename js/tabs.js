// https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Date/getDay
const $tabContainer = document.querySelector('#tabs')

const $tabList = $tabContainer.querySelectorAll('.tab')

const today = new Date()
let weekday = today.getDay()

const week = [
    'Domingo',
    'Lunes',
    'Martes',
    'Miercoles',
    'Jueves',
    'Viernes',
    'Sabado'
]

function nextDay(day) {
    if (day == 6) {
        return 0
    }
    return day + 1
}

$tabList.forEach(($tab, index) => {
    // $tab -> <div class="tab" role="tab" aria-selected="true" id="tab-0"></div>
    $tab.addEventListener('click', handleSelectTabClick)
    if (index === 0) {
        $tab.textContent = 'Hoy'
        weekday = nextDay(weekday)
        return false
    }
    $tab.textContent = week[weekday]
    weekday = nextDay(weekday)
})

function handleSelectTabClick(event) {
    const $tabSelected = event.target
        // <div class=​"tab" role=​"tab" id=​"tab-3">​Viernes​</div>​
        // debugger
    const $tabActive = document.querySelector('.tab[aria-selected="true"]')

    $tabActive.removeAttribute('aria-selected')
    $tabSelected.setAttribute('aria-selected', true)

    const id = $tabSelected.id
        // debugger
    const $tabPanel = document.querySelector(`[aria-labelledby=${id}]`)
    const $tabPanelSelected = document.querySelector(`.tabPanel:not([hidden])`)
    $tabPanel.hidden = false
    $tabPanelSelected.hidden = true
}