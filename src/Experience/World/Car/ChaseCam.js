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
        this.birdeyeView = new THREE.Vector3(0, 4.5, 20)
        this.closeupView = new THREE.Vector3(0, 4, 8)
        this.cams = [this.birdeyeView, this.closeupView]
        this.currentCam = this.birdeyeView    
    }

    chasecamera()
    {
        this.chaseCam = new THREE.Object3D()
        this.chaseCam.position.set(0, 0, 0)
        this.chaseCamPivot = new THREE.Object3D()
        this.chaseCamPivot.position.copy(this.birdeyeView)
        this.chaseCam.add(this.chaseCamPivot)
        this.scene.add(this.chaseCam)

        if(this.debug.active)
        {
            this.debugFolder
                .add(this.birdeyeView, 'y')
                .name('CameraY')
                .min(2)
                .max(15)
                .step(0.001)
                .onChange(() => 
                {
                    this.chaseCamPivot.position.copy(this.birdeyeView)
                })

            this.debugFolder
                .add(this.currentCam, 'z')
                .name('CameraZ')
                .min(5)
                .max(30)
                .step(0.001)
                .onChange(() => 
                {
                    this.chaseCamPivot.position.copy(this.birdeyeView)
                })
        }
    }
}