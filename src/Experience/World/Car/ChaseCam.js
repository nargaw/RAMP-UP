import * as THREE from 'three'
import Experience from '../../Experience'

export default class ChaseCam
{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.debug = this.experience.debug

        //debug
        if(this.debug.active)
        {
            this.debugFolder = this.debug.ui.addFolder('Camera')
        }

        this.views()
        this.chasecamera()      
    }

    views()
    {
        this.v = new THREE.Vector3()
        this.birdeyeView = new THREE.Vector3(0, 12, 40)
        this.closeupView = new THREE.Vector3(0, 4, 8)
        this.cams = [this.birdeyeView, this.closeupView]
        this.currentCam = this.birdeyeView

        if(this.debug.active)
        {
            this.debugFolder
                .add(this.currentCam, 'x')
                .name('CameraX')
                .min(-5)
                .max(5)
                .step(0.001)
        }
    }

    chasecamera()
    {
        this.chaseCam = new THREE.Object3D()
        this.chaseCam.position.set(0, 0, 0)
        this.chaseCamPivot = new THREE.Object3D()
        this.chaseCamPivot.position.copy(this.birdeyeView)
        this.chaseCam.add(this.chaseCamPivot)
        this.scene.add(this.chaseCam)
    }
}