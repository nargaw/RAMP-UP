import Controls from "../../Utils/Controls"
import Experience from "../../Experience"
import { lerp } from "three/src/math/MathUtils"

export default class CarControls extends Controls 
{
    constructor()
    {
        super()
        this.controls = new Controls()
        this.experience = new Experience()
        this.debug = this.experience.debug
        this.time = this.experience.time
        this.deltaTime = this.time.delta
        this.forwardVel = 0
        this.rightVel = 0
        this.thrusting = false
        this.turning = false
        
        this.setDebugger()
    }

    forward()
    {   
        //console.log(this.deltaTime)
        if (this.keyMap['w'] || this.hoverMap['3']  || this.hoverTouch['3']|| this.keyMap['ArrowUp']){
            this.forwardVel = lerp(this.forwardVel, this.default.maxSpeed * this.time.delta, 0.0125)
            //console.log('speed: ' + this.forwardVel)
            this.thrusting = true 
        }
    }

    backward()
    {
        if (this.keyMap['s'] || this.hoverMap['4'] || this.hoverTouch['4'] || this.keyMap['ArrowDown']){
            this.forwardVel = lerp(this.forwardVel, this.time.delta * -10.25, 0.125)
            this.thrusting = true  
        }
    }

    left()
    {
        if (this.keyMap['a'] || this.hoverMap['1'] || this.hoverTouch['1']|| this.keyMap['ArrowLeft']){
            this.rightVel = lerp(this.rightVel, this.time.delta * -2.5, 0.0125)
            this.turning = true
        }
    }

    right()
    {
       if (this.keyMap['d'] || this.hoverMap['2'] || this.hoverTouch['2']|| this.keyMap['ArrowRight']){
        this.rightVel = lerp(this.rightVel, this.time.delta * 2.5, 0.0125)
            this.turning = true
        }
    }

    boost()
    {
       if (this.clickMap['boost'] || this.hoverMap['boost'] || this.hoverTouch['boost']||this.keyMap['m']||this.keyMap['M']){
            this.forwardVel = lerp(this.forwardVel, this.default.maxSpeed * 5 * this.time.delta, 0.0125)
            this.turning = false
            this.thrusting = false
            this.boosting = true
        }
    }

    stablize()
    {


        if(!this.thrusting && !this.boosting){
            this.forwardVel = lerp(this.forwardVel, 0.0, 0.0125)
        }

        if(!this.turning){
            this.rightVel = lerp(this.rightVel, 0.0, 0.125)
        }
    }

    setJoystick()
    {
        //console.log(this.joystickValue)
        if(this.joystickValue.y > 0)
        {
            this.forwardVel = lerp(this.forwardVel, this.default.maxSpeed * this.time.delta * this.joystickValue.y * 2, 0.075)
            //console.log('speed: ' + this.forwardVel)
            this.thrusting = true 
            //console.log('forward')
        }
        if(this.joystickValue.y < 0)
        {
            this.forwardVel = lerp(this.forwardVel, this.time.delta * -0.5 * 2 * Math.abs(this.joystickValue.y), 0.125)
            this.thrusting = true 
            //console.log('backward')
        }
        if(this.joystickValue.x > 0)
        {
            this.rightVel = lerp(this.rightVel, this.time.delta * 0.0125 * 1 * (this.joystickValue.x), 0.125)
            this.turning = true
            //console.log('right')
        }
        if(this.joystickValue.x < 0)
        {
            this.rightVel = lerp(this.rightVel, this.time.delta * -0.0125 * 1 * Math.abs(this.joystickValue.x), 0.125)
            this.turning = true
            //console.log('left')
        }
    }

    setDebugger()
    {
        this.default = 
        {
            maxSpeed: 300.75,
            forwardLerpValue: 0.01,

            maxBackingSpeed: -50,
            backingLerpValue: 0.125,

            maxLeftTurningSpeed: -20.15,
            maxRightTurningSpeed: 20.15,
            turningLerpValue: 0.05,

            noThrustingLerpValue: 0.45,
            noTurningLerpValue: 0.25
        }

        if(this.debug.active)
        {
            //debug folder
            this.debugFolder = this.debug.ui.addFolder('Speed and Lerp')
            
            //forward debug
            this.forwardDebug = this.debugFolder.addFolder('Forward')
            this.forwardDebug.add(
                this.default, 'maxSpeed', 1, 5, 0.1
            ).name('Max Speed Factor')
             this.forwardDebug.add(
                this.default, 'forwardLerpValue', 0.001, 0.1, 0.001
            ).name('Speed Lerp Vector')

            //backward debug
            this.backwardDebug = this.debugFolder.addFolder('Backward')
            this.backwardDebug.add(
                this.default, 'maxBackingSpeed', -10, -1, -0.1
            ).name('Max Backing Speed')
            this.backwardDebug.add(
                this.default, 'backingLerpValue', 0.005, 0.25, 0.001
            ).name('Backing Lerp Vector')

            //Turning Debug
            this.turningDebug = this.debugFolder.addFolder('Turning')
            this.turningDebug.add(
                this.default, 'maxLeftTurningSpeed', -0.75, -0.01, -0.01
            ).name('Left Max Turning Speed')
            this.turningDebug.add(
                this.default, 'maxRightTurningSpeed', 0.01, 0.75, 0.01
            ).name('Right Max Turning Speed')
            this.turningDebug.add(
                this.default, 'turningLerpValue', 0.01, 0.05, 0.001
            ).name('Turning Lerp Value')

            //Stopping
            this.stoppingDebug = this.debugFolder.addFolder('Stopping')
            this.stoppingDebug.add(
                this.default, 'noThrustingLerpValue', 0.01, 0.1, 0.001
            ).name('Deceleration Lerp Value')
            this.stoppingDebug.add(
                this.default, 'noTurningLerpValue', 0.01, 0.25, 0.01
            ).name('Stop Turning Lerp Value')
        }
    }
}