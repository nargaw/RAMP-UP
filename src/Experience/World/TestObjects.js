import Physics from "../Utils/Physics.js"
import * as THREE from 'three'
import * as CANNON from 'cannon-es'
import Experience from "../Experience.js"
//import PhyiscsDebugger from "../Utils/PhysicsDebugger.js"

export default class TestObjects
{
    constructor()
    {
        this.physics = new Physics()
        this.experience = new Experience()
        this.scene = this.experience.scene
        //this.physicsDebugger = new PhyiscsDebugger()
        this.objectsToUpdate = []
        this.setGeometry()
        this.setMaterial()
        this.setObjectMesh()
    }

    setGeometry()
    {
        this.objectGeometry = new THREE.SphereGeometry(1)
    }
    
    setMaterial()
    {
        this.objectMaterial = new THREE.MeshStandardMaterial(
            {
                color: 0x0000f0
            }
        )
    }

    setObjectMesh()
    {
        for(let i = 0; i < 25; i++)
        {
            this.object = new THREE.Mesh(
                this.objectGeometry, 
                this.objectMaterial
            )
            this.object.position.y = 5 * Math.random() + 2 + i * 3
            this.object.position.z = 2 * Math.random()
            this.object.position.x = 2 * Math.random()
            this.scene.add(this.object)

            this.setPhysics()
            
            this.objectsToUpdate.push({
                mesh: this.object,
                body: this.objectBody
            })
        }
    }

    setPhysics()
    {
        this.objectShape = new CANNON.Sphere(1)
            this.objectBody = new CANNON.Body
            ({
                mass: 0.1,
                material: this.physics.defaultMaterial
            })
            this.objectBody.addShape(this.objectShape)
            this.objectBody.position.copy(this.object.position)
            this.physics.world.addBody(this.objectBody)
    }

    update()
    {
        for(this.obj of this.objectsToUpdate){
            this.obj.mesh.position.copy(this.obj.body.position)
            this.obj.mesh.quaternion.copy(this.obj.body.quaternion)
        }
    }
}