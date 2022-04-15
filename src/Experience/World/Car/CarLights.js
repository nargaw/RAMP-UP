import * as THREE from 'three'
import fragmentShader from './CarLightsShader/fragmentON.glsl'
import fragmentShader2 from './CarLightsShader/fragmentOFF.glsl'
import vertexShader from './CarLightsShader/vertex.glsl'

export default class CustomShader
{
    constructor()
    {
        this.setTailLightMaterial()
    }

    setTailLightMaterial()
    {
        this.tailLightMaterial = new THREE.ShaderMaterial(
            {
                vertexShader: vertexShader,
                fragmentShader: fragmentShader,
                uniforms: {
                    u_time: { value: 0 }
                }
            }
        )
    }
}