import Experience from "../../Experience";
import * as THREE from 'three'
import Physics from '../../Utils/Physics';
import * as CANNON from 'cannon-es'
import CarPhysics from "./CarPhysics";

export default class CustomShader
{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.physics = new Physics()
        this.world = this.physics.world
        this.carPhysics = new CarPhysics()
        this.objectsToUpdate = this.carPhysics.objectsToUpdate
        this.setTailLightGeometry()
        this.setTailLightMaterial()
        this.setRightTailLight()
    }

    // testObj()
    // {
    //     this.testMesh = new THREE.Mesh(
    //         this.tailLightGeometry,
    //         this.tailLightMaterial
    //     )
    //     this.scene.add(this.testMesh)
    //     this.testMesh.position.set(-10, 4, 0)
    // }

    setTailLightGeometry()
    {
        this.tailLightGeometry = new THREE.BoxGeometry(0.6, 0.2, 0.01)
    }

    setTailLightMaterial()
    {
        this.tailLightMaterial = new THREE.MeshStandardMaterial(
            {
                color: 0x00ff00,
                //side: THREE.DoubleSide
            }
        )
    }

    setRightTailLight()
    {
        this.rightTailLight = new THREE.Mesh(this.tailLightGeometry, this.tailLightMaterial)
        this.scene.add(this.rightTailLight)
        console.log(this.rightTailLight)
        // console.log(this.rightTailLight.position)
    }

    updatePosition(){
        this.objectsToUpdate.push({
            mesh: this.rightTailLight,
            body: this.carPhysics.carBody
        })
    }

    setLeftTailLight()
    {
        this.leftTailLight = new THREE.Mesh(this.tailLightGeometry, this.setTailLightMaterial)
        //this.scene.add(this.rightTailLight) 
    }

    // rightTailLightPhysics(bodyA)
    // {
        
    //     this.setRightTailLight()
    //     console.log(bodyA)
    //     this.bodyAPivot = new CANNON.Vec3(0, 0, 0)
    //     this.rightTailLightBody = new CANNON.Body({
    //         mass: 0.01
    //     })
    //     this.rightTailLightBody.addShape(
    //         new CANNON.Box(new CANNON.Vec3(0.5, 0.5, 0.5))
    //     )
    //     this.rightTailLightPivot = new CANNON.Vec3(5, 2, 1)
    //     this.rightTailLightBody.position.copy(this.rightTailLight.position)
    //     // this.rightDistanceConstraint = new CANNON.DistanceConstraint(
    //     //     bodyA,
    //     //     this.rightTailLightBody,
    //     //     0,
    //     // )
        
    //     //this.rightDistanceConstraint.bodyB.position.set(new CANNON.Vec3(-2, 5, 5))

    //     this.rightTailLightConstraint = new CANNON.PointToPointConstraint(
    //         this.rightTailLightBody,
    //         this.rightTailLightPivot,
    //         bodyA,
    //         this.bodyAPivot,
            
    //         10
    //     )

    //     // this.rightLockConstraint = new CANNON.LockConstraint(
    //     //     bodyA, 
    //     //     this.rightTailLightBody, 
    //     //     {
    //     //         maxForce: 0.001, 
    //     //     }
    //     // )
    //     // this.rightLockConstraint.pivotA = this.bodyAPivot
    //     //this.rightLockConstraint.pivotB = this.rightTailLightPivot
    //     this.world.addBody(this.rightTailLightBody)
    //     this.world.addConstraint(this.rightTailLightConstraint)
    // }

    

    // update()
    // {
    //     this.rightTailLight.position.copy(this.rightTailLightBody.position)
    //     this.rightTailLight.quaternion.copy(this.rightTailLightBody.quaternion)
        
    // }
}