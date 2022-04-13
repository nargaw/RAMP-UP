import Experience from "../../Experience";
import * as THREE from 'three'
import Physics from '../../Utils/Physics';
import * as CANNON from 'cannon-es'

export default class CustomShader
{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.physics = new Physics()
        this.world = this.physics.world
        this.setTailLightGeometry()
        this.setTailLightMaterial()
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
        this.tailLightGeometry = new THREE.BoxGeometry(1, 1, 1)
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
        this.rightTailLight.position.set(0, 10, 0)
        console.log(this.rightTailLight)
        // console.log(this.rightTailLight.position)
    }

    setLeftTailLight()
    {
        this.leftTailLight = new THREE.Mesh(this.tailLightGeometry, this.setTailLightMaterial)
        //this.scene.add(this.rightTailLight) 
    }

    rightTailLightPhysics(bodyA)
    {
        
        this.setRightTailLight()
        console.log(bodyA)
        this.bodyAPivot = new CANNON.Vec3(0, 0, 0)
        this.rightTailLightBody = new CANNON.Body({
            mass: 0.000001
        })
        this.rightTailLightBody.addShape(
            new CANNON.Box(new CANNON.Vec3(0.5, 0.5, 0.5))
        )
        this.rightTailLightPivot = new CANNON.Vec3(1, 2, 1)
        this.rightTailLightBody.position.copy(this.rightTailLight.position)
        // this.rightDistanceConstraint = new CANNON.DistanceConstraint(
        //     bodyA,
        //     this.rightTailLightBody,
        //     0.25,
        //     0.1
        // )

        // this.rightTailLightConstraint = new CANNON.PointToPointConstraint(
        //     bodyA,
        //     this.bodyAPivot,
        //     this.rightTailLightBody,
        //     this.rightTailLightPivot,
        //     0
        // )

        this.rightLockConstraint = new CANNON.LockConstraint(
            bodyA, 
            this.rightTailLightBody, 
            {
                maxForce: 100, 
            }
        )
        this.rightLockConstraint.pivotA = this.bodyAPivot
        this.rightLockConstraint.pivotB = this.rightTailLightPivot
        this.world.addBody(this.rightTailLightBody)
        this.world.addConstraint(this.rightLockConstraint)
    }

    

    // update()
    // {
    //     this.rightTailLight.position.copy(this.rightTailLightBody.position)
    //     this.rightTailLight.quaternion.copy(this.rightTailLightBody.quaternion)
        
    // }
}