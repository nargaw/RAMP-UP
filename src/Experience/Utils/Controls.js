import { lerp } from "three/src/math/MathUtils"

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
        this.fireMap = {}
        this.joystickValue = {}
        this.touchMap = {}
        this.ongoingTouches = []
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

        this.fireCount = 0;

        this.onDocumentFire = (e) => {
            // document.removeEventListener('keydown', this.onDocumentFire)
            // this.fireMap[e.key]
            this.fireCount = this.fireCount + 1
            // console.log(this.fireCount, e.target.id)
            if(this.fireCount < 6){
                this.fireMap[e.target.id] = e.type === 'click'
            }  
        }

        this.copyTouch = ({identifier, pageX, pageY}) => {
            return {identifier, pageX, pageY}
        }

        this.ongoingTouchIndexById = (idToFind) => {
            for (let i = 0; i < this.ongoingTouches.length; i++)
            {
                this.id = this.ongoingTouches[i].identifier
                if(this.id === idToFind)
                {
                    return i
                }
            }
            return -1
        }

        this.onMobileTouchStart = (e) => {
            e.preventDefault()
            //console.log('touchstart')
            this.touches  = e.changedTouches
            //console.log(this.touches)
            this.joystick = document.getElementById('joystick')
            const rect = e.target.getBoundingClientRect()
            for(let i = 0;  i < this.touches.length; i++)
            {
                //console.log(`touchstart: ${i}`)
                this.ongoingTouches.push(this.copyTouch(this.touches[i]))
                this.joystick.style.left = (this.touches[i].pageX - rect.x) + 'px'
                this.joystick.style.top = (this.touches[i].pageY - rect.y) + 'px'
            
                this.touchX = ((this.touches[i].pageX - rect.left)/rect.width)-0.5
                this.touchY = -(((this.touches[i].pageY - rect.top)/rect.height)-0.5)
                //console.log(this.touchX, this.touchY)
            }
             
            if(this.touchX <= 0.5 && this.touchX >= -0.5 && this.touchY <= 0.5 && this.touchY >= -0.5)
            {
                this.joystickValue.x = this.touchX
                this.joystickValue.y = this.touchY
            }
        }

        this.onMobileTouchMove = (e) => {
            e.preventDefault()
            this.touches  = e.changedTouches
            //console.log(this.touches)
            this.joystick = document.getElementById('joystick')
            const rect = e.target.getBoundingClientRect()
            for(let i = 0;  i < this.touches.length; i++)
            {
                this.idx = this.ongoingTouchIndexById(this.touches[i].identifier)
                if(this.idx >= 0)
                {
                    this.joystick.style.left = (this.touches[i].pageX - rect.x) + 'px'
                    this.joystick.style.top = (this.touches[i].pageY - rect.y) + 'px'

                    this.touchX = ((this.touches[i].pageX - rect.left)/rect.width)-0.5
                    this.touchY = -(((this.touches[i].pageY - rect.top)/rect.height)-0.5)
                    //console.log(this.touchX, this.touchY)

                    if(this.touchX <= 0.5 && this.touchX >= -0.5 && this.touchY <= 0.5 && this.touchY >= -0.5)
                    {
                        this.joystickValue.x = this.touchX
                        this.joystickValue.y = this.touchY
                    }
                }  
            }  
        }

        this.onMobileTouchEnd = (e) => {
            e.preventDefault()
            this.touches = e.changedTouches
            this.joystick = document.getElementById('joystick')
            const rect = e.target.getBoundingClientRect()
            this.joystick.style.top = '50%'
            this.joystick.style.left = '50%'
            this.joystickValue.x = 0
            this.joystickValue.y = 0
            //console.log('here cancel')
            //this.joystick.style.color = '#ff0000'
            // for(let i=0; i < this.touches.length; i++)
            // {
            //     this.idx = this.ongoingTouchIndexById(this.touches[i].identifier)
            //     //this.ongoingTouches.push(this.copyTouch(this.touches[i]))
            //     if(this.idx >= 0)
            //     {
                    
            //         this.joystick.style.left = (this.touches[i].pageX - rect.x) + 'px'
            //         this.joystick.style.top = (this.touches[i].pageY - rect.y) + 'px'

            //         this.touchX = ((this.touches[i].pageX - rect.left)/rect.width)-0.5
            //         this.touchY = -(((this.touches[i].pageY - rect.top)/rect.height)-0.5)
            //         //console.log(this.touchX, this.touchY)

            //         if(this.touchX <= 0.5 && this.touchX >= -0.5 && this.touchY <= 0.5 && this.touchY >= -0.5)
            //         {
            //             this.joystickValue.x = this.touchX
            //             this.joystickValue.y = this.touchY
            //         }
            //         //this.ongoingTouches.splice(this.idx, 1)
            //         console.log('here end')
            //     } else {
            //         this.joystick.style.top = '50%'
            //         this.joystick.style.left = '50%'
            //         this.joystickValue.x = 0
            //         this.joystickValue.y = 0
            //         console.log('here cancel')
            //         this.joystick.style.color = '#ff0000'
            //     }
           // }
        }

        this.onMobileTouchCancel = (e) => {
            e.preventDefault()
            this.touches = e.changedTouches
            this.joystick = document.getElementById('joystick')
            for(let i =0;  i <this.touches.length; i++)
            {
                
                this.idx = this.ongoingTouchIndexById(this.touches[i].identifier)
                this.ongoingTouches.splice(this.idx, 1)
                
                
            }
            this.joystick.style.top = '50%'
            this.joystick.style.left = '50%'
            this.joystickValue.x = 0
            this.joystickValue.y = 0
            //console.log('here cancel')
            this.joystick.style.color = '#ff0000'
            
        }

        this.onMouseMove = (e) => {
            e.preventDefault()
            this.joystick = document.getElementById('joystick')
            const rect = e.target.getBoundingClientRect() 
            this.joystick.style.left = (e.clientX - rect.x) + 'px'
            this.joystick.style.top = (e.clientY - rect.y) + 'px'

            this.x = ((e.clientX - rect.left)/rect.width)-0.5
            this.y = -(((e.clientY - rect.top)/rect.height)-0.5)

            if(this.x <= 0.5 && this.x >= -0.5 && this.y <= 0.5 && this.y >= -0.5)
            {
                this.joystickValue.x = this.x
                this.joystickValue.y = this.y
            }
        }

        this.onMouseLeave = (e) => {
            //console.log('mouseleave')
            this.joystick.style.top = '50%'
            this.joystick.style.left = '50%'
            this.joystickValue.x = 0
            this.joystickValue.y = 0
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
        document.addEventListener('click', this.onDocumentFire, {passive: false})
        document.addEventListener('contextmenu', event => event.preventDefault())
        
        document.getElementById('bound').addEventListener('touchstart', this.onMobileTouchStart)
        document.getElementById('bound').addEventListener('touchend', this.onMobileTouchEnd)
        document.getElementById('bound').addEventListener('touchcancel', this.onMobileTouchCancel)
        document.getElementById('bound').addEventListener('touchmove', this.onMobileTouchMove)
        
        document.getElementById('bound').addEventListener('mousemove', this.onMouseMove)
        document.getElementById('bound').addEventListener('mouseleave', this.onMouseLeave)
    }
}