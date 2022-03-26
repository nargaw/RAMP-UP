import * as THREE from 'three'
import Experience from '../Experience'

export default class ChaseCam
{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.views()
        this.chasecamera()      
    }

    views()
    {
        this.v = new THREE.Vector3()
        this.birdeyeView = new THREE.Vector3(0, 10, 20)
        this.closeupView = new THREE.Vector3(0, 4, 8)
        this.cams = [this.birdeyeView, this.closeupView]
        this.currentCam = this.birdeyeView
    }

    chasecamera()
    {
        this.chaseCam = new THREE.Object3D()
        this.chaseCam.position.set(0, 0, 0)
        this.chaseCamPivot = new THREE.Object3D()
        this.chaseCamPivot.position.copy(this.currentCam)
        this.chaseCam.add(this.chaseCamPivot)
        this.scene.add(this.chaseCam)
    }
}