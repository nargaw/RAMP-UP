import Experience from '../Experience.js'
import Environment from './Environment.js'
import Car from './Car/Car.js'
import Ground from './Ground.js'
import Buildings from './Buildings.js'
import TestObjects from './TestObjects.js'
import City from './City.js'

export default class World
{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        // Wait for resources
        this.resources.on('ready', () =>
        {
            // Setup
            this.car = new Car()
            //this.testObjects = new TestObjects()
            //this.buildings = new Buildings()
            this.city = new City()
            this.ground = new Ground()
            this.environment = new Environment()
            this.setAmbientLight()
        })
    }

    setAmbientLight()
    {
        this.environment.setAmbientLight()
    }

    update()
    {
        if(this.testObjects)
            {
                this.testObjects.update()
            }
        if(this.car)
            {
                this.car.update()
                this.car.motion()
                this.car.input()
                this.car.handleChaseCam()
            }
    }
}