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

    setHeadLights(group)
    {
        this.headLight = new THREE.PointLight(0xffffff, 7.5 ,9.5, 0.25)
        //this.headLight2 = new THREE.PointLight(0xffffff, 5.5 ,9.5, 0.25)
        this.headLight.position.set(-0.25, 5.5,-14.0)
        //this.headLight2.position.set(0.5, 5.5,-20.0)
        //this.scene.add(this.headLight, this.headLight2)
        //this.headLightHelper = new THREE.PointLightHelper(this.headLight, 0xff00ff, 0.3)
        group.add(this.headLight)
        //group.add(this.headLightHelper)
    }
}