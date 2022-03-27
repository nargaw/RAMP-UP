import Physics from "../../Utils/Physics";

export default class CarPhysics
{
    constructor()
    {
        this.physics = new Physics()
        this.world = this.physics.world
        this.setPhysics()
    }

    setPhysics()
    {
        //body
        this.carBodyShape = new CANNON.Box(
            new CANNON.Vec3(1.5, 0.5, 2.95)
        )
        this.carBody = new CANNON.Body(
            {
                mass: 100,
                material: this.world.defaultMaterial
            }
        )
        this.carBody.addShape(
            this.carBodyShape,
            new CANNON.Vec3(0, 0.95, 0)
        )
        this.carBody.addShape(
            new CANNON.Sphere(0.65), 
            new CANNON.Vec3(0, 1.5, 0.0) 
        )
        this.carBody.position.copy(this.body.position)
        this.world.addBody(this.carBody)
        this.carBody.angularDamping = 0.9
        this.carBody.allowSleep = false
        this.objectsToUpdate.push({
            mesh: this.body,
            body: this.carBody
        })
        
        //windows
        this.objectsToUpdate.push({
            mesh: this.windows,
            body: this.carBody
        })
        
        //spoiler
        this.objectsToUpdate.push({
            mesh: this.spoiler,
            body: this.carBody
        })


        //Front Left Wheel
        this.flShape = new CANNON.Sphere(0.5)
        this.flBody = new CANNON.Body(
            {
                mass: 1,
                material: this.world.defaultMaterial
            }
        )
        this.flBody.addShape(this.flShape)
        this.flBody.angularDamping = 0.4
        this.flBody.applyLocalForce = 20
        this.flBody.allowSleep = false
        this.flBody.position.copy(this.frontLeftWheel.position)
        this.world.addBody(this.flBody)
        this.objectsToUpdate.push(
            {
                mesh: this.frontLeftWheel,
                body: this.flBody
            }
        )
        
        //Front Right Wheel
        this.frShape = new CANNON.Sphere(0.5)
        this.frBody = new CANNON.Body(
            {
                mass: 1,
                material: this.world.defaultMaterial
            }
        )
        this.frBody.addShape(this.frShape)
        this.frBody.angularDamping = 0.4
        this.frBody.applyLocalForce = 20
        this.frBody.allowSleep = false
        this.frBody.position.copy(this.frontRightWheel.position)
        this.world.addBody(this.frBody)  
        this.objectsToUpdate.push(
            {
                mesh: this.frontRightWheel,
                body: this.frBody
            }
        )

        //Back Left Wheel
        this.blShape = new CANNON.Sphere(0.5)
        this.blBody = new CANNON.Body(
            {
                mass: 1,
                material: this.world.defaultMaterial
            }
        )
        this.blBody.addShape(this.blShape)
        this.blBody.position.copy(this.backLeftWheel.position)
        this.blBody.angularDamping = 0.4
        this.blBody.allowSleep = false
        this.world.addBody(this.blBody)
        this.objectsToUpdate.push(
            {
                mesh: this.backLeftWheel,
                body: this.blBody
            }
        )

        //Back Right Wheel
        this.brShape = new CANNON.Sphere(0.5)
        this.brBody = new CANNON.Body(
            {
                mass: 1,
                material: this.world.defaultMaterial
            }
        )
        this.brBody.addShape(this.brShape)
        this.brBody.angularDamping = 0.4
        this.brBody.allowSleep = false
        this.brBody.position.copy(this.backRightWheel.position)
        this.world.addBody(this.brBody)
        this.objectsToUpdate.push(
            {
                mesh: this.backRightWheel,
                body: this.brBody
            }
        )
    }
}