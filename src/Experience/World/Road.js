import Experience from "../Experience";
import * as THREE from 'three'

export default class Road
{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        this.resource = this.resources.items.roadModel
        
        this.setModel()
    }

    setModel()
    {
        //main street
        this.resource.scene.scale.set(10, 1, 20)
        this.model = this.resource.scene
        this.scene.add(this.model)
        this.model.position.set(-1, 0, 0)

        this.modelClone1 = this.model.clone()
        this.modelClone1.position.set(-2.35, 0, 90)
        this.modelClone1.rotation.y = -Math.PI * 0.01
        this.scene.add(this.modelClone1)

        this.modelClone2 = this.model.clone()
        this.modelClone2.position.set(-3.8, 0, 180)
        //this.modelClone2.rotation.y = -Math.PI * 0.01
        this.scene.add(this.modelClone2)

        this.modelClone3 = this.model.clone()
        this.modelClone3.position.set(-0.25, 0, -90)
        this.modelClone3.rotation.y = -Math.PI * 0.005
        this.scene.add(this.modelClone3)

        this.modelClone4 = this.model.clone()
        this.modelClone4.position.set(1, 0, -180)
        this.modelClone4.rotation.y = -Math.PI * 0.005
        this.scene.add(this.modelClone4)

        this.modelClone5 = this.model.clone()
        this.modelClone5.position.set(2.25, 0, -270)
        this.modelClone5.rotation.y = -Math.PI * 0.005
        this.scene.add(this.modelClone5)
    }
}