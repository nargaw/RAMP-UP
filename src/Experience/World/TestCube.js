import * as THREE from 'three'
import Experience from '../Experience'

export default class TestCube
{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.cube = new THREE.Mesh
        (
            new THREE.BoxGeometry(1, 1, 1),
            new THREE.MeshStandardMaterial({color: 0x00ffff})
        )
        this.scene.add(this.cube)
    }
}