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
        this.setPhysics()
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
        
    }

    setPhysics()
    {
        //add ground bodies
        this.groundShape = new CANNON.Plane()
        this.groundBody = new CANNON.Body({
            mass: 0,
            material: this.physics.defaultMaterial
        })
        this.groundBody.addShape(this.groundShape)
        this.groundBody.quaternion.setFromEuler(Math.PI * 0.5, 0, 0)
        this.groundBody.position.set(0, 0, 0)
        this.world.addBody(this.groundBody)
    }
}