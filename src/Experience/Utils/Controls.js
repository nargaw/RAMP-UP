export default class Controls 
{
    constructor()
    {
        this.initMaps()
        this.controlers()
        this.eventListeners()
    }

    initMaps()
    {
        this.pressMap = {}
        this.clickMap = {}
        this.keyMap = {}
        this.hoverMap = {}
        this.hoverTouch = {}
        this.logEvents = false
        this.tpCache = new Array()
    }

    controlers()
    {
        this.onDocumentKey = (e) => {
            this.keyMap[e.key] = e.type === 'keydown'
        }
        this.onDocumentHover = (e) => {
            e.preventDefault()
            this.hoverMap[e.target.id] = e.type === 'mouseover'
        }
        this.onDocumentTouch = (e) => {
            e.preventDefault()
            if (e.targetTouches.length == 2){
                for ( let i = 0; i < e.targetTouches.length; i++){
                    this.tpCache.push(e.targetTouches[i]);
                }
            }
            if(this.logEvents) log('touchStart', e, true)
            this.hoverTouch[e.target.id] = e.type === 'touchstart'
        }

        this.onDocumentClick = (e) => {
            e.preventDefault()
            this.clickMap[e.target.id] = e.type === 'click'
        }

        this.onDocumentPress = (e) => {
            e.preventDefault()
            this.pressMap[e.target.id] = e.type === 'touchstart'
        }
    }

    eventListeners()
    {
        document.addEventListener('click', this.onDocumentClick, false)
        document.addEventListener('keydown', this.onDocumentKey, false)
        document.addEventListener('keyup', this.onDocumentKey, false)
        document.addEventListener('touchstart', this.onDocumentTouch, {passive: false} )
        document.addEventListener('touchend', this.onDocumentTouch, {passive: false}, false)
        document.addEventListener('mouseover', this.onDocumentHover, false)
        document.addEventListener('mouseout', this.onDocumentHover, false)
        document.addEventListener('touchstart', this.onDocumentPress, {passive: false})
        document.addEventListener('contextmenu', event => event.preventDefault())
    }
}