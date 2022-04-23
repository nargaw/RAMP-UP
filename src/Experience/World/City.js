import Experience from "../Experience";
import * as THREE from 'three'

export default class City
{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        this.resource = this.resources.items.buildingModel

        this.setModel()
    }

    setModel()
    {
        this.model = this.resource.scene
    }
}