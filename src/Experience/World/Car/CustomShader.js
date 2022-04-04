import Experience from "../../Experience";
import * as THREE from 'three'
import Car from "./Car";

export default class CustomShader
{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.car = new Car()
        this.carGroup = this.car.carGroup

        this.setTailLightGeometry()
        this.setTailLightMaterial()
        this.setRightTailLight()
        //this.setLeftTailLight()
    }

    setTailLightGeometry()
    {
        this.tailLightGeometry = new THREE.BoxGeometry(1, 1, 0.5)
    }

    setTailLightMaterial()
    {
        this.setTailLightMaterial = new THREE.MeshStandardMaterial(
            {
                color: 0xff0000,
                side: THREE.DoubleSide
            }
        )
    }

    setRightTailLight()
    {
        this.rightTailLight = new THREE.Mesh(this.tailLightGeometry, this.setTailLightMaterial)
        if (this.carGroup){
            this.carGroup.add(this.rightTailLight)
        }
        
    }
}