import * as THREE from 'three'
import * as CANNON from 'cannon-es'
import Experience from "../Experience";
import Physics from '../Utils/Physics';

export default class Ground
{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.physics = new Physics()
        this.world = this.physics.world
        this.setGeometry()
        this.setMaterial()
        this.setMesh()
        this.setPhysics()
    }

    setGeometry()
    {
        this.groundGeometry = new THREE.PlaneBufferGeometry(1000, 1000, 50, 50)
    }

    setMaterial()
    {
        this.groundMaterial = new THREE.MeshStandardMaterial(
            {
                color: 0x191919,
                side: THREE.DoubleSide
            }
        )
    }

    setMesh()
    {
        this.groundMesh = new THREE.Mesh
            (
                this.groundGeometry, 
                this.groundMaterial
            )
        this.groundMesh.rotation.x = -Math.PI * 0.5
        this.groundMesh.receiveShadow = true

        // this.groundMesh.add(
        //     new THREE.LineSegments(
        //         this.groundGeometry, 
        //         new THREE.MeshStandardMaterial({
        //             color: 0x00ffff,
        //             wireframe: true
        //         })
        //     )
        // )
        this.scene.add(this.groundMesh) 
        this.groundMesh.receiveShadow = true 
    }

    setPhysics()
    {
        this.groundBody = new CANNON.Body({
            mass: 0,
            material: this.physics.defaultMaterial
        })
        this.groundBody.addShape(new CANNON.Plane())
        this.groundBody.quaternion.setFromAxisAngle(
            new CANNON.Vec3(-1, 0, 0),
            Math.PI * 0.5
        )
        this.world.addBody(this.groundBody)
    }
}