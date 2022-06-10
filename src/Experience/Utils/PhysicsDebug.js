import CannonDebugger from "cannon-es-debugger";
import Experience from "../Experience";
import Physics from "./Physics"

export default class PhysicsDebugger
{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.physics = this.experience.physics
        this.debugUI = this.experience.debug
        
        this.debug()
        //console.log(this.scene)
    }

    debug()
    { 
        this.cannonDebugger = new CannonDebugger(
            this.scene,
            this.physics.world,
            {
                color: 0xff0000,
            }
        )
        const debugObject = {
            myBoolean: false,
        }
        if (this.debugUI.active)
        {
            this.debugFolder = this.debugUI.ui.addFolder('Physics Debugger')
            this.debugFolder.add(
                debugObject, 'myBoolean'
            )
            .name('Physics Debugger')
            .onChange(()=>{
                console.log(debugObject)
            })
        }
        // this.destroy = this.debugUI.ui.$children[].destroy()
        // console.log(this.debugUI.ui.$children)

        // this.debugStatus = 'active'
        // this.debugFolder.add(
        //     this.cannonDebugger, 'update'
        // ).name()
    }

    update()
    {
        if(this.cannonDebugger){
            
            this.cannonDebugger.update()
        } 
    }
}
