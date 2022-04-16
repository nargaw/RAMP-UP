import * as THREE from 'three'
import Experience from '../../Experience'

export default class CarLights
{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.setTailLightMaterialOFF()
        this.setTailLightMaterialON()
    }

    setTailLightMaterialOFF()
    {
        this.tailLightMaterial = new THREE.MeshBasicMaterial(
            {
                color: 0x110000
            }
        )
    }

    setTailLightMaterialON()
    {
        this.tailLightMaterial2 = new THREE.MeshBasicMaterial(
            {
                color: 0xff0000
            }
        )
    }
}