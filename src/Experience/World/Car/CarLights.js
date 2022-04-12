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
    }

    setTailLightGeometry()
    {
        this.tailLightGeometry = new THREE.BoxGeometry(10, 10, 2.5)
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
        // console.log(this.rightTailLight)
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
        this.bodyAPivot = new CANNON.Vec3(-5, 0, 5)
        this.rightTailLightBody = new CANNON.Body({
            mass: 0.000001
        })
        this.rightTailLightPivot = new CANNON.Vec3(0, 0, 0)
        this.rightTailLightBody.position.copy(this.rightTailLight.position)
        this.rightDistanceConstraint = new CANNON.DistanceConstraint(
            bodyA,
            this.rightTailLightBody,
            0.25,
            0.1
        )

        // this.rightTailLightConstraint = new CANNON.PointToPointConstraint(
        //     bodyA,
        //     this.bodyAPivot,
        //     this.rightTailLightBody,
        //     this.rightTailLightPivot,
        //     1e6
        // )

        // this.rightLockConstraint = new CANNON.LockConstraint(
        //     this.bodyA, 
        //     this.rightTailLightBody, 
        //     {
        //         maxForce: 20, 
        //     }
        // )
        // this.rightLockConstraint.pivotA = this.bodyAPivot
        // this.rightLockConstraint.pivotB = this.rightTailLightPivot
        this.world.addBody(this.rightTailLightBody)
        this.world.addConstraint(this.rightDistanceConstraint)

        
    
        

    }

    

    update()
    {
        if(this.rightTailLight){
            this.rightTailLight.position.copy(this.rightTailLightBody.position)
            this.rightTailLight.quaternion.copy(this.rightTailLightBody.quaternion)
        }
    }
}