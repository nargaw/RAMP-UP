import * as THREE from 'three'
import Experience from '../Experience.js'
export default class Environment
{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        this.debug = this.experience.debug
        // Debug
        if(this.debug.active)
        {
            this.debugFolder = this.debug.ui.addFolder('environment')
        }
        //this.setAmbientLight()
        //this.setSunLight()
        //this.setSunLightHelper()
        //this.setEnvironmentMap()
    }

    setAmbientLight()
    {
        this.ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
        this.scene.add(this.ambientLight)
    }

    setSunLight(target)
    {
        this.sunLight = new THREE.DirectionalLight('#ffffff', 0)
        this.sunLight.castShadow = true
        this.sunLight.shadow.camera.far = 1200
        this.sunLight.shadow.mapSize.set(256, 256)
        this.sunLight.shadow.normalBias = 0.05
        this.sunLight.position.set(10.5, 50, - 1.25)
        this.scene.add(this.sunLight)
        this.scene.add(this.sunLight.target)
        this.sunLight.target = target
        // Debug
        if(this.debug.active)
        {
            this.debugFolder
                .add(this.sunLight, 'intensity')
                .name('sunLightIntensity')
                .min(0)
                .max(10)
                .step(0.001)
            
            this.debugFolder
                .add(this.sunLight.position, 'x')
                .name('sunLightX')
                .min(- 5)
                .max(5)
                .step(0.001)
            
            this.debugFolder
                .add(this.sunLight.position, 'y')
                .name('sunLightY')
                .min(- 5)
                .max(5)
                .step(0.001)
            
            this.debugFolder
                .add(this.sunLight.position, 'z')
                .name('sunLightZ')
                .min(- 5)
                .max(5)
                .step(0.001)
        }
    }

    setSunLightHelper()
    {
        this.sunLightHelper = new THREE.DirectionalLightHelper(this.sunLight, 5)
        this.scene.add(this.sunLightHelper)
    }

    setWorldLight()
    {
        this.worldLight = new THREE.DirectionalLight('#ffffff', 2)
        //this.worldLight.castShadow = true
        this.worldLight.shadow.camera.far = 1200
        this.worldLight.shadow.mapSize.set(256, 256)
        this.worldLight.shadow.normalBias = 0.05
        this.worldLight.position.set(10.5, 50, - 1.25)
        this.scene.add(this.worldLight)
        // Debug
        if(this.debug.active)
        {
            this.debugFolder
                .add(this.worldLight, 'intensity')
                .name('worldLightIntensity')
                .min(0)
                .max(10)
                .step(0.001)
            
            this.debugFolder
                .add(this.worldLight.position, 'x')
                .name('worldLightX')
                .min(- 5)
                .max(5)
                .step(0.001)
            
            this.debugFolder
                .add(this.worldLight.position, 'y')
                .name('worldLightY')
                .min(- 5)
                .max(5)
                .step(0.001)
            
            this.debugFolder
                .add(this.worldLight.position, 'z')
                .name('worldLightZ')
                .min(- 5)
                .max(5)
                .step(0.001)
        }
    }

    setEnvironmentMap()
    {
        this.environmentMap = {}
        this.environmentMap.intensity = 0.4
        this.environmentMap.texture = this.resources.items.environmentMapTexture
        this.environmentMap.texture.encoding = THREE.sRGBEncoding
        
        this.scene.environment = this.environmentMap.texture

        this.environmentMap.updateMaterials = () =>
        {
            this.scene.traverse((child) =>
            {
                if(child instanceof THREE.Mesh && child.material instanceof THREE.MeshStandardMaterial)
                {
                    child.material.envMap = this.environmentMap.texture
                    child.material.envMapIntensity = this.environmentMap.intensity
                    child.material.needsUpdate = true
                }
            })
        }
        this.environmentMap.updateMaterials()

        // Debug
        if(this.debug.active)
        {
            this.debugFolder
                .add(this.environmentMap, 'intensity')
                .name('envMapIntensity')
                .min(0)
                .max(4)
                .step(0.001)
                .onChange(this.environmentMap.updateMaterials)
        }
    }
}