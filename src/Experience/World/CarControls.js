import Controls from "../Utils/Controls"

export default class CarControls extends Controls 
{
    constructor()
    {
        super()

        this.controls = new Controls()
        this.forwardVel = 0
        this.rightVel = 0
        this.thrusting = false   
    }

    forward()
    {
        if (this.keyMap['w'] || this.hoverMap['3']  || this.hoverTouch['3']|| this.keyMap['ArrowUp']){
            if(this.forwardVel < 7.5){
                this.forwardVel += 0.5
                this.thrusting = true
            } 
        }
    }

    backward()
    {
        if (this.keyMap['s'] || this.hoverMap['4'] || this.hoverTouch['4'] || this.keyMap['ArrowDown']){
            if(this.forwardVel > -2.5){
                this.forwardVel -= 1
                this.thrusting = true 
            } 
        }
    }

    left()
    {
        if (this.keyMap['a'] || this.hoverMap['1'] || this.hoverTouch['1']|| this.keyMap['ArrowLeft']){
            if(this.rightVel > -0.75){
                this.rightVel -= 0.035
            } 
        }
    }

    right()
    {
       if (this.keyMap['d'] || this.hoverMap['2'] || this.hoverTouch['2']|| this.keyMap['ArrowRight']){
            if(this.rightVel < 0.75){
                this.rightVel += 0.035
            } 
        } 
    }

    idel()
    {
       if (this.keyMap[' ']){
            if(this.forwardVel > 0){
                this.forwardVel -= 1
            }
            if(this.forwardVel < 0){
                this.forwardVel += 1
            }
        } 
    }

    stablize()
    {
        if (!this.thrusting){
            if (this.forwardVel > 0){
                this.forwardVel -= 0.25
            }
            if(this.forwardVel < 0){
                this.forwardVel += 0.25
            }
            if(this.rightVel > 0){
                this.rightVel -= 0.02
            }
            if(this.rightVel < 0){
                this.rightVel += 0.02
            }
        }
    }
}