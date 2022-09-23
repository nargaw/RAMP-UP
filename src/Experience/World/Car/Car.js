import * as THREE from 'three'
import Experience from '../../Experience';
import Physics from '../../Utils/Physics';
import CarPhysics from './CarPhysics';
import CarConstraints from './CarConstraints';
import CarControls from './CarControls';
import ChaseCam from './ChaseCam'
import CarLights from './CarLights'
import Environment from '../Environment'

let instance = null
export default class Car
{
    constructor()
    {
        // Singleton
        if(instance)
        {
            return instance
        }
        instance = this

        this.experience = new Experience()
        this.scene = this.experience.scene
        this.camera = this.experience.camera

        this.physics = new Physics()
        this.world = this.physics.world
        this.carPhysics = new CarPhysics()
        this.constraints = new CarConstraints()
        
        this.resources = this.experience.resources
        this.resource = this.resources.items.carModel

        this.time = this.experience.time
        this.debug = this.experience.debug

        this.controls = new CarControls()
        this.chaseCamera = new ChaseCam()

        this.carTailLights = new CarLights()
        this.carTailLightMaterial = this.carTailLights.tailLightMaterial
        this.carTailLightMaterial2 = this.carTailLights.tailLightMaterial2

        this.environment = new Environment()

        this.updateLights = []
        this.objectsToUpdate = this.carPhysics.objectsToUpdate
        this.setModel()
    }

    setModel()
    {
        this.carGroup = new THREE.Group() 
        this.model = this.resource.scene
        this.model.traverse((child) => {
            if (child.isMesh)
            {
                child.castShadow = true
            }
            if(child.name === 'Plane001_5'){
                this.tailLight = child 
            }
            if(child.name === 'Plane001_7'){
                child.material = this.carTailLightMaterial    
            }
            if(child.name === 'Audi'){
                this.body = child    
            }
            if(child.name === 'Wheel_front_L'){
                this.frontLeftWheel = child
            }
            if(child.name === 'Wheel_front_R'){
                this.frontRightWheel = child
            }
            if(child.name === 'Wheel_back_L'){
                this.backLeftWheel = child
            }
            if(child.name === 'Wheel_back_R'){
                this.backRightWheel = child      
            }
            if(child.name === 'Windows'){
                this.windows = child
            }
            if(child.name === 'Spoiler'){
                this.spoiler = child
            }
        })
        
        this.carGroup.add(
            this.windows,
            this.spoiler,
            this.body, 
            this.frontLeftWheel, 
            this.frontRightWheel,
            this.backLeftWheel,
            this.backRightWheel
        )
        
        this.body.add(this.chaseCamera.chaseCam)
        this.scene.add(this.carGroup)
        this.carPhysics.setPhysics(
            this.body, 
            this.frontLeftWheel, 
            this.frontRightWheel, 
            this.backLeftWheel, 
            this.backRightWheel 
        )
        console.log(this.frontLeftWheel.quaternion)
        this.constraints.setConstraints(
            this.carPhysics.carBody, 
            this.carPhysics.flBody, 
            this.carPhysics.frBody, 
            this.carPhysics.blBody, 
            this.carPhysics.brBody
        )
        this.setCarObjects()
        this.carTailLights.setHeadLights(this.body)
        this.environment.setSunLight(this.body)
    }

    setCarObjects()
    {
        //windows
        this.objectsToUpdate.push({
            mesh: this.windows,
            body: this.carPhysics.carBody
        })
        
        //spoiler
        this.objectsToUpdate.push({
            mesh: this.spoiler,
            body: this.carPhysics.carBody
        })
        //
    }
    
    setTailLight()
    {
        if(this.controls.keyMap['w'] || this.controls.hoverMap['3']  || this.controls.hoverTouch['3']|| this.controls.keyMap['ArrowUp']){
            //console.log('true')
            this.tailLight.material = this.carTailLightMaterial
        } else {
            //console.log('false')
            this.tailLight.material = this.carTailLightMaterial2
        } 
    }

    update()
    {
        for(this.obj of this.objectsToUpdate){
            this.obj.mesh.position.copy(this.obj.body.position)
            this.obj.mesh.quaternion.copy(this.obj.body.quaternion)
        }
    }

    input()
    {
        this.controls.forward()
        this.controls.backward()
        this.controls.left()
        this.controls.right()
        this.controls.idle()
        this.controls.stablize()
    }

    motion()
    {
        this.setTailLight()
        this.controls.thrusting = false
        this.constraints.constraintBL.setMotorSpeed(this.controls.forwardVel)
        this.constraints.constraintBR.setMotorSpeed(this.controls.forwardVel)
        this.constraints.constraintFL.axisA.z = this.controls.rightVel
        this.constraints.constraintFR.axisA.z = this.controls.rightVel
    }

    handleChaseCam()
    {
        this.camera.instance.lookAt(this.body.position)
        this.chaseCamera.chaseCam.position.copy(this.body.position)
        this.chaseCamera.chaseCam.position.copy(this.body.quaternion)
        this.chaseCamera.chaseCamPivot.getWorldPosition(this.chaseCamera.v)
        if(this.chaseCamera.v.y < 1)
        {
            this.chaseCamera.v.y = 1
        }
        this.camera.instance.position.lerpVectors(this.camera.instance.position, this.chaseCamera.v, 0.1)
        this.chaseCamera.chaseCam.position.copy(this.body.position)
    }
} 