import * as CANNON from 'cannon-es'
import Time from './Time.js'

let instance = null

export default class Physics
{
    constructor()
    {
        // Singleton
        if(instance)
        {
            return instance
        }
        instance = this

        // Global access
        window.physics = this

        this.time = new Time()
        this.world = new CANNON.World()
        this.world.gravity.set(0, -9.82, 0)
        this.defaultMaterial = new CANNON.Material('default')
        this.defaultContactMaterial = new CANNON.ContactMaterial(
            this.defaultMaterial,
            this.defaultMaterial,
            {
                friction: 0.5,
                restitution: 0.5
            }
        )
        this.world.broadphase = new CANNON.SAPBroadphase(this.world)
        this.world.allowSleep = true
        this.world.defaultContactMaterial = this.defaultContactMaterial
        this.world.addContactMaterial(this.defaultContactMaterial)

        this.update()
    }

    update()
    {
        this.world.step(1/60, this.time.delta, 3 )
    }
}