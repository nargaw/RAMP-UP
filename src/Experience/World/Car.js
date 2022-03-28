import * as THREE from 'three'
import Experience from "../Experience";
import * as CANNON from 'cannon-es'
import Physics from '../Utils/Physics';
import CarControls from './CarControls';
import ChaseCam from './ChaseCam';

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
        this.resources = this.experience.resources
        this.time = this.experience.time
        this.debug = this.experience.debug
        this.controls = new CarControls()
        this.chaseCamera = new ChaseCam()
        this.objectsToUpdate = []
        this.resource = this.resources.items.carModel
        this.setModel()
    }

    setModel()
    {
        this.carGroup = new THREE.Group() 
        this.model = this.resource.scene
        this.model.traverse((child) => {
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
            this.backRightWheel,  
        )
        this.body.add(this.chaseCamera.chaseCam)
        this.scene.add(this.carGroup)

        this.setPhysics()
        this.setConstraints()
    }

        setPhysics()
    {
        //body
        this.carBodyShape = new CANNON.Box(
            new CANNON.Vec3(1.5, 0.5, 2.95)
        )
        this.carBody = new CANNON.Body(
            {
                mass: 100,
                material: this.world.defaultMaterial
            }
        )
        this.carBody.addShape(
            this.carBodyShape,
            new CANNON.Vec3(0, 0.95, 0)
        )
        this.carBody.addShape(
            new CANNON.Sphere(0.65), 
            new CANNON.Vec3(0, 1.5, 0.0) 
        )
        this.carBody.position.copy(this.body.position)
        this.world.addBody(this.carBody)
        this.carBody.angularDamping = 0.9
        this.carBody.allowSleep = false
        this.objectsToUpdate.push({
            mesh: this.body,
            body: this.carBody
        })
        
        //windows
        this.objectsToUpdate.push({
            mesh: this.windows,
            body: this.carBody
        })
        
        //spoiler
        this.objectsToUpdate.push({
            mesh: this.spoiler,
            body: this.carBody
        })


        //Front Left Wheel
        this.flShape = new CANNON.Sphere(0.5)
        this.flBody = new CANNON.Body(
            {
                mass: 1,
                material: this.world.defaultMaterial
            }
        )
        this.flBody.addShape(this.flShape)
        this.flBody.angularDamping = 0.4
        this.flBody.applyLocalForce = 20
        this.flBody.allowSleep = false
        this.flBody.position.copy(this.frontLeftWheel.position)
        this.world.addBody(this.flBody)
        this.objectsToUpdate.push(
            {
                mesh: this.frontLeftWheel,
                body: this.flBody
            }
        )
        
        //Front Right Wheel
        this.frShape = new CANNON.Sphere(0.5)
        this.frBody = new CANNON.Body(
            {
                mass: 1,
                material: this.world.defaultMaterial
            }
        )
        this.frBody.addShape(this.frShape)
        this.frBody.angularDamping = 0.4
        this.frBody.applyLocalForce = 20
        this.frBody.allowSleep = false
        this.frBody.position.copy(this.frontRightWheel.position)
        this.world.addBody(this.frBody)  
        this.objectsToUpdate.push(
            {
                mesh: this.frontRightWheel,
                body: this.frBody
            }
        )

        //Back Left Wheel
        this.blShape = new CANNON.Sphere(0.5)
        this.blBody = new CANNON.Body(
            {
                mass: 1,
                material: this.world.defaultMaterial
            }
        )
        this.blBody.addShape(this.blShape)
        this.blBody.position.copy(this.backLeftWheel.position)
        this.blBody.angularDamping = 0.4
        this.blBody.allowSleep = false
        this.world.addBody(this.blBody)
        this.objectsToUpdate.push(
            {
                mesh: this.backLeftWheel,
                body: this.blBody
            }
        )

        //Back Right Wheel
        this.brShape = new CANNON.Sphere(0.5)
        this.brBody = new CANNON.Body(
            {
                mass: 1,
                material: this.world.defaultMaterial
            }
        )
        this.brBody.addShape(this.brShape)
        this.brBody.angularDamping = 0.4
        this.brBody.allowSleep = false
        this.brBody.position.copy(this.backRightWheel.position)
        this.world.addBody(this.brBody)
        this.objectsToUpdate.push(
            {
                mesh: this.backRightWheel,
                body: this.brBody
            }
        )
    }

    setConstraints()
    {
        //constraints
        this.FLaxis = new CANNON.Vec3(1, 0, 0)
        this.FRaxis = new CANNON.Vec3(1, 0, 0)
        this.BLaxis = new CANNON.Vec3(1, 0, 0)
        this.BRaxis = new CANNON.Vec3(1, 0, 0)

        this.constraintFL = new CANNON.HingeConstraint(
            this.carBody, 
            this.flBody, 
            {
                pivotA: new CANNON.Vec3(-1.1, 0.45, -1.75),
                axisA: this.FLaxis,
                maxForce:15
            }
        )
        this.world.addConstraint(this.constraintFL)

        this.constraintFR = new CANNON.HingeConstraint(
            this.carBody, 
            this.frBody, 
            {
                pivotA: new CANNON.Vec3(1.1, 0.45, -1.75),
                axisA: this.FRaxis,
                maxForce: 15
            }
        )
        this.world.addConstraint(this.constraintFR)

        this.constraintBL = new CANNON.HingeConstraint(
            this.carBody, 
            this.blBody, 
            {
                pivotA: new CANNON.Vec3(-1.1, 0.45, 1.95),
                axisA: this.BLaxis,
                maxForce: 15
            }
        )
        this.world.addConstraint(this.constraintBL)

        this.constraintBR = new CANNON.HingeConstraint(
            this.carBody, 
            this.brBody, 
            {
                pivotA: new CANNON.Vec3(1.1, 0.45, 1.95),
                axisA: this.BRaxis,
                maxForce: 15
            }
        )
        this.world.addConstraint(this.constraintBR)

        this.constraintBL.enableMotor()
        this.constraintBR.enableMotor()
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
        this.controls.idel()
        this.controls.stablize()
    }

    motion()
    {
        this.controls.thrusting = false
        this.constraintBL.setMotorSpeed(this.controls.forwardVel)
        this.constraintBR.setMotorSpeed(this.controls.forwardVel)
        this.constraintFL.axisA.z = this.controls.rightVel
        this.constraintFR.axisA.z = this.controls.rightVel
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