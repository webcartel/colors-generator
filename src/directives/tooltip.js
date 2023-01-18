function getRect(elem) {
    const box = elem.getBoundingClientRect();

    const body = document.body
    const docEl = document.documentElement

    const scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop
    const scrollLeft = window.pageXOffset || docEl.scrollLeft || body.scrollLeft

    const clientTop = docEl.clientTop || body.clientTop || 0
    const clientLeft = docEl.clientLeft || body.clientLeft || 0

    const top  = box.top +  scrollTop - clientTop
    const left = box.left + scrollLeft - clientLeft

    return {
        top: Math.round(top),
        right: Math.round(left) + Math.round(box.width),
        bottom: Math.round(top) + Math.round(box.height),
        left: Math.round(left),
        width: Math.round(box.width),
        height: Math.round(box.height),
    }
}

function tooltip(el, value, vnode, event) {

    if ( event.type === 'mouseover' ) {
        if ( document.getElementById('tooltip') !== null ) {
            document.getElementById('tooltip').remove()
        }
    
        const text = typeof value === 'string' ? value : value.text
        const position = value.position === undefined ? 'bottom' : value.position
        const offset = value.offset === undefined ? '-10px' : value.offset
    
        let el_rect = getRect(el)
    
        const tooltip = document.createElement('div')
        tooltip.innerHTML = text
        tooltip.classList.add('tooltip', 'show')
        tooltip.setAttribute('id', 'tooltip')
        document.querySelector('body').appendChild(tooltip)
    
        tooltip.style.top = el_rect.bottom - parseInt(offset) + 'px'
        tooltip.style.left = el_rect.left + 'px'
        tooltip.style.maxWidth = 200 + 'px'
        tooltip.style.width = 100 + '%'
    }

    if ( event.type === 'mouseout' ) {

        if ( document.getElementById('tooltip') !== null ) {
            document.getElementById('tooltip').classList.remove('show')
        }
    }


}

const Tooltip = {

    beforeMount: ( el, { value }, vnode ) => {
        el.addEventListener('mouseover', tooltip.bind(null, el, value, vnode))
        el.addEventListener('mouseout', tooltip.bind(null, el, value, vnode))
    },

    beforeUnmount: () => {
        el.removeEventListener('mouseover', tooltip)
        el.removeEventListener('mouseout', tooltip)
    },

}

export default Tooltip