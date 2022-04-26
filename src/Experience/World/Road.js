import Experience from "../Experience";
import * as THREE from 'three'
import * as CANNON from 'cannon-es'
import Physics from '../Utils/Physics'

export default class Road
{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        this.resource = this.resources.items.roadModel
        this.physics = new Physics()
        this.world = this.physics.world
        
        this.setModel()
        this.setPhysics()
    }

    setModel()
    {
        //main street
        this.resource.scene.scale.set(10, 2, 10)
        this.model = this.resource.scene
        this.model.traverse((child) => {
            if(child.isMesh)
            {
                //console.log(child.material)
                child.receiveShadow = true
            }
        })
        //console.log(this.model)
        this.scene.add(this.model)
        this.model.rotation.z = -Math.PI
        this.model.position.z = 125
    }

    setPhysics()
    {
        this.roadRectShapeS = new CANNON.Box(
            new CANNON.Vec3(1, 20, 200)
        )
        this.roadRectShapeL = new CANNON.Box(
            new CANNON.Vec3(1, 20, 325)
        )
        this.roadRectShapeM = new CANNON.Box(
            new CANNON.Vec3(200, 20, 1)
        )
        this.roadRectBodyL1 = new CANNON.Body(
            {
                mass: 0,
                material: this.world.defaultContactMaterial
            }
        )
        this.roadRectBodyL1.addShape(this.roadRectShapeS)
        this.roadRectBodyL1.position.set(-90, 21, -50)

        this.roadRectBodyL2 = new CANNON.Body(
            {
                mass: 0,
                material: this.world.defaultContactMaterial
            }
        )
        this.roadRectBodyL2.addShape(this.roadRectShapeL)
        this.roadRectBodyL2.position.set(-140, 21, -50)

        
        this.roadRectBodyR1 = new CANNON.Body(
            {
                mass: 0,
                material: this.world.defaultContactMaterial
            }
        )
        this.roadRectBodyR1.addShape(this.roadRectShapeS)
        this.roadRectBodyR1.position.set(90, 21, -50)

        this.roadRectBodyR2 = new CANNON.Body(
            {
                mass: 0,
                material: this.world.defaultContactMaterial
            }
        )
        this.roadRectBodyR2.addShape(this.roadRectShapeL)
        this.roadRectBodyR2.position.set(140, 21, -50)

        this.roadRectBodyTop = new CANNON.Body(
            {
                mass: 0,
                material: this.world.defaultContactMaterial
            }
        )
        this.roadRectBodyTop.addShape(this.roadRectShapeM)
        this.roadRectBodyTop.position.set(0, 21, -375)

        this.roadRectBodyBottom = new CANNON.Body(
            {
                mass: 0,
                material: this.world.defaultContactMaterial
            }
        )
        this.roadRectBodyBottom.addShape(this.roadRectShapeM)
        this.roadRectBodyBottom.position.set(0, 21, 275)

        this.roadSphereShape = new CANNON.Sphere(95)
        this.roadSphereBody1 = new CANNON.Body(
            {
                mass: 0,
                material: this.world.defaultContactMaterial
            }
        )
        this.roadSphereBody1.addShape(this.roadSphereShape)
        this.roadSphereBody1.position.set(0,0,125)

        this.roadSphereBody2 = new CANNON.Body(
            {
                mass: 0,
                material: this.world.defaultContactMaterial
            }
        )
        this.roadSphereBody2.addShape(this.roadSphereShape)
        this.roadSphereBody2.position.set(0,0,-200)

        this.world.addBody(this.roadRectBodyL1)
        this.world.addBody(this.roadRectBodyL2)
        this.world.addBody(this.roadRectBodyR1)
        this.world.addBody(this.roadRectBodyR2)
        this.world.addBody(this.roadSphereBody1)
        this.world.addBody(this.roadSphereBody2)
        this.world.addBody(this.roadRectBodyTop)
        this.world.addBody(this.roadRectBodyBottom)
    }
}