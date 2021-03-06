import Controls from "../../Utils/Controls"
import Time from "../../Utils/Time"


export default class CarControls extends Controls 
{
    constructor()
    {
        super()
        
        this.time = new Time()
        this.deltaTime = this.time.delta
        this.controls = new Controls()
        this.forwardVel = 0
        this.rightVel = 0
        //this.highFPSmaxSpeed = 12
        this.maxSpeed = this.time.delta
        // this.lowFPSmaxSpeed = 60
        this.speed = 0.75
        this.thrusting = false 
        this.timeCounter = 0 
        this.add = 0    
    }

    forward()
    {
        if (this.keyMap['w'] || this.hoverMap['3']  || this.hoverTouch['3']|| this.keyMap['ArrowUp']){
            this.currentTime = new Date().getTime()
            this.newTime = new Date().getTime() + 1
            this.increment = this.newTime - this.currentTime
            this.add += this.increment
            if(this.forwardVel <= 20){
                this.forwardVel = this.add * this.time.delta
                console.log(this.forwardVel)
            }
            this.thrusting = true
            if(this.rightVel > 0){
                this.rightVel -= 0.01
            }
            if(this.rightVel < 0){
                this.rightVel += 0.01
            }
            if(this.rightVel > 0 && this.rightVel < 0.01){
                this.rightVel = 0
            } 
            // if(this.forwardVel < this.maxSpeed && this.time.delta < 25){
            //     this.forwardVel += this.time.delta * 0.002
            //     this.thrusting = true
            //     if(this.rightVel > 0){
            //         this.rightVel -= 0.01
            //     }
            //     if(this.rightVel < 0){
            //         this.rightVel += 0.01
            //     }
            //     if(this.rightVel > 0 && this.rightVel < 0.01){
            //         this.rightVel = 0
            //     }  
            // }
            
            // if(this.forwardVel < this.lowFPSmaxSpeed && this.time.delta > 25){
                
            //     this.forwardVel += ((this.speed / this.lowFPSmaxSpeed) * this.deltaTime) * 1.75
            //     this.thrusting = true
            //     if(this.rightVel > 0){
            //         this.rightVel -= 0.01
            //     }
            //     if(this.rightVel < 0){
            //         this.rightVel += 0.01 
            //     }
            //     if(this.rightVel > 0 && this.rightVel < 0.01){
            //         this.rightVel = 0
            //     }  
            // }

            // if(this.forwardVel < this.maxSpeed){
                
            //     this.forwardVel += ((this.speed / this.maxSpeed) * this.deltaTime) * 0.75
            //     this.thrusting = true
            //     if(this.rightVel > 0){
            //         this.rightVel -= 0.01
            //     }
            //     if(this.rightVel < 0){
            //         this.rightVel += 0.01 
            //     }
            //     if(this.rightVel > 0 && this.rightVel < 0.01){
            //         this.rightVel = 0
            //     }  
            // }
        } 
    }

    backward()
    {
        if (this.keyMap['s'] || this.hoverMap['4'] || this.hoverTouch['4'] || this.keyMap['ArrowDown']){
            if(this.forwardVel > -11.0 ){
                this.forwardVel -= 0.5
            }
            this.thrusting = true
            console.log(this.forwardVel) 
            // if(this.forwardVel > -11.0 && this.time.delta > 25){
            //     // this.forwardVel -= 2
            //     this.thrusting = true 
            // }  
        }
    }

    left()
    {
        if (this.keyMap['a'] || this.hoverMap['1'] || this.hoverTouch['1']|| this.keyMap['ArrowLeft']){
            if(this.rightVel > -0.2){
                this.rightVel -= 0.05
            }
            // if(this.rightVel > -0.125 && this.time.delta > 25){
            //     this.rightVel -= 0.025
            // }  
        }
    }

    right()
    {
       if (this.keyMap['d'] || this.hoverMap['2'] || this.hoverTouch['2']|| this.keyMap['ArrowRight']){
            if(this.rightVel < 0.2){
                this.rightVel += 0.05
            }
            // if(this.rightVel < 0.125 && this.time.delta > 25){
            //     this.rightVel += 0.025
            // }  
        }
    }

    idle()
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
            if(this.add > 0){
                this.add -= 5
            }
            this.time.start = this.start
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