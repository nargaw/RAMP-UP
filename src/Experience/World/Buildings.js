import * as THREE from 'three'
import Experience from '../Experience.js'
import * as CANNON from 'cannon-es'
import Physics from '../Utils/Physics.js'

export default class Buildings
{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.physics = new Physics()
        this.world = this.physics.world
        this.setBuildingsGeometry()
        this.setBuildingsMaterial()
        this.setBuildingsMesh()
    }

    setBuildingsGeometry()
    {
        this.rand = 10 + Math.random() * 25
        this.buildingGeometry = new THREE.BoxGeometry(10, this.rand, 10)
    }
    
    setBuildingsMaterial()
    {
        this.buildingMaterial = new THREE.MeshStandardMaterial({
            color: 0x191919
        }) 
    }

    setBuildingsMesh()
    {
        for(let i = 0; i < 50; i++){
            const angle = Math.random() * Math.PI * 2
            const radius = 50 + Math.random() * 400
            this.x = Math.cos(angle) * radius
            this.z = Math.sin(angle) * radius

            this.buildingMesh = new THREE.Mesh(this.buildingGeometry, this.buildingMaterial)
            this.buildingMesh.position.set(this.x, this.rand/2, this.z)
            
            this.buildingMesh.add(
                new THREE.LineSegments(
                    this.buildingGeometry, 
                    new THREE.MeshStandardMaterial({
                        color: 0x00ffff,
                        wireframe: true
                    })
                )
            )
            this.buildingMesh.castShadow = true
            this.scene.add(this.buildingMesh)
            this.setPhysics()
        }
    }

    setPhysics()
    {
        this.buildingBody = new CANNON.Body({
            mass: 0,
            material: this.world.defaultMaterial
        })
        this.buildingShape = new CANNON.Box
        (
            new CANNON.Vec3(5, this.rand/2, 5)
        )
        this.buildingBody.addShape(this.buildingShape)
        this.buildingBody.position.set
        (
            this.x, this.rand/2, this.z
        )
        this.world.addBody(this.buildingBody)
    }
}