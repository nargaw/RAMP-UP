import Experience from "../Experience";
import * as THREE from 'three'


export default class Track{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        this.resource = this.resources.items.trackModel
        this.setModel()
    }

    setModel()
    {
        this.model = this.resource.scene
        this.model.scale.set(10, 10, 10)
        this.model.position.set(0, 10, 0)
        this.model.traverse((child) => {
            if(child.isMesh)
            {
                //console.log(child.material)
                child.receiveShadow = true
            }
        })
        //console.log(this.model)
        this.scene.add(this.model)
    }
}