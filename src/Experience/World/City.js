import Experience from "../Experience";
import * as THREE from 'three'

export default class City
{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        this.resource = this.resources.items.buildingModel

        this.setModel()
    }

    setModel()
    {
        this.buildingMaterial = new THREE.MeshStandardMaterial(
            {
                color: 0x1f1f1f
            }
        )
        this.model = this.resource.scene
        this.model.traverse((child) => {
            if (child.isMesh)
            {
                child.material = this.buildingMaterial
            }
        })
        this.scene.add(this.model)
        this.model.position.y = -5 
    }
}