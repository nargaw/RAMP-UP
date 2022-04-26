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
        this.resource.scene.scale.set(6, 6, 6)
        this.resource.scene.rotation.y = -Math.PI * 0.5
        this.buildingMaterial = new THREE.MeshStandardMaterial(
            {
                color: 0x000000
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
        this.model.position.y = -50
        this.model.position.z = -250
        this.model.position.x = 0
    }
}