import * as THREE from 'three'
import Experience from "../Experience";

export default class Loading
{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        this.setGeometry()
        this.setMaterial()
        this.setOverlay()
    }

    setGeometry()
    {
        this.overlayGeometry = new THREE.PlaneGeometry(2, 2, 1, 1)
    }

    setMaterial()
    {
        this.overlayMaterial = new THREE.ShaderMaterial({
            transparent: true,
            uniforms:
            {
                uAlpha: { value: 1}
            },
            //wireframe: true,
            vertexShader: `
                void main()
                {
                    gl_Position = vec4(position, 1.);
                }
            `,
            fragmentShader: `
                uniform float uAlpha;

                void main()
                {
                    gl_FragColor = vec4(0., 0., 0., uAlpha);
                }
            `
        })
    }

    setOverlay()
    {
        this.overlay = new THREE.Mesh(this.overlayGeometry, this.overlayMaterial)
        this.scene.add(this.overlay)
    }
}