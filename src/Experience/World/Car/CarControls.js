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
        this.highFPSmaxSpeed = 25
        this.maxSpeed = 30
        this.lowFPSmaxSpeed = 35
        this.speed = 0.5
        this.thrusting = false  
    }

    
    // forward()
    // {
    //     if (this.keyMap['w'] || this.hoverMap['3']  || this.hoverTouch['3']|| this.keyMap['ArrowUp']){
    //         if(this.forwardVel < this.maxSpeed && this.time.delta < 15){
    //             this.forwardVel += (this.speed / this.maxSpeed) * this.deltaTime
    //             this.thrusting = true
    //             if(this.rightVel > 0){
    //                 this.rightVel -= 0.01
    //             }
    //             if(this.rightVel < 0){
    //                 this.rightVel += 0.01 
    //             }
    //             if(this.rightVel > 0 && this.rightVel < 0.01){
    //                 this.rightVel = 0
    //             }  
    //         }
            
    //         if(this.forwardVel < this.maxSpeed && this.time.delta >= 15){
    //             this.maxSpeed = 30
    //             this.forwardVel += (this.speed / this.maxSpeed) * this.deltaTime * 2
    //             this.thrusting = true
    //             if(this.rightVel > 0){
    //                 this.rightVel -= 0.01
    //             }
    //             if(this.rightVel < 0){
    //                 this.rightVel += 0.01 
    //             }
    //             if(this.rightVel > 0 && this.rightVel < 0.01){
    //                 this.rightVel = 0
    //             }  
    //         }
    //     }
    // }
    forward()
    {
        if (this.keyMap['w'] || this.hoverMap['3']  || this.hoverTouch['3']|| this.keyMap['ArrowUp']){
            // if(this.forwardVel < this.highFPSmaxSpeed && this.time.delta < 14){
            //     this.forwardVel += (this.speed / this.maxSpeed) * this.deltaTime * 0.5
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
            
            // if(this.forwardVel < this.lowFPSmaxSpeed && this.time.delta > 16){
                
            //     this.forwardVel += (this.speed / this.maxSpeed) * this.deltaTime * 2.0
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

            if(this.forwardVel < this.maxSpeed){
                
                this.forwardVel += ((this.speed / this.maxSpeed) * 16) * 0.75
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
            }
        }
        
    }

    backward()
    {
        if (this.keyMap['s'] || this.hoverMap['4'] || this.hoverTouch['4'] || this.keyMap['ArrowDown']){
            if(this.forwardVel > -11.0 ){
                this.forwardVel -= 1
                this.thrusting = true 
            }
            // if(this.forwardVel > -11.0 && this.time.delta >= 16){
            //     this.forwardVel -= 1
            //     this.thrusting = true 
            // }  
        }
    }

    left()
    {
        if (this.keyMap['a'] || this.hoverMap['1'] || this.hoverTouch['1']|| this.keyMap['ArrowLeft']){
            if(this.rightVel > -0.15){
                this.rightVel -= 0.02
            }
            // if(this.rightVel > -0.15 && this.time.delta >= 16){
            //     this.rightVel -= 0.02
            // }  
        }
    }

    right()
    {
       if (this.keyMap['d'] || this.hoverMap['2'] || this.hoverTouch['2']|| this.keyMap['ArrowRight']){
            if(this.rightVel < 0.15){
                this.rightVel += 0.02
            }
            // if(this.rightVel < 0.15 && this.time.delta >= 16){
            //     this.rightVel += 0.02
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