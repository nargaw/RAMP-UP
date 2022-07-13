import Experience from "../Experience";
import * as THREE from 'three'
import * as CANNON from 'cannon-es'

export default class Track{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.physics = this.experience.physics
        this.world = this.physics.world
        this.resources = this.experience.resources
        this.resource = this.resources.items.trackModel
        this.setModel()
    }

    setModel()
    {
        this.model = this.resource.scene
        this.model.scale.set(10, 10, 10)
        this.model.position.set(0, 0, 0)
        this.model.traverse((child) => {
            if(child.isMesh)
            {
                //console.log(child.material)
                child.receiveShadow = true
            }
        })
        console.log(this.model)
        this.scene.add(this.model)
        this.setPhysics()
    }

    setPhysics()
    {
        //add ground bodies
        this.groundShape = new CANNON.Box(new CANNON.Vec3(200, 0.25, 200))
        this.groundBody = new CANNON.Body({
            mass: 0,
            material: this.physics.defaultContactMaterial
        })
        this.groundBody.addShape(this.groundShape, new CANNON.Vec3(-10, 0.35, -2.5))
        this.groundBody.quaternion.setFromAxisAngle(
            new CANNON.Vec3(-1, 0, 0),
            Math.PI 
        )
        //this.groundBody.position.set(0, -0.4, 0)
        this.world.addBody(this.groundBody)
    }
}