import * as CANNON from 'cannon-es'
import Physics from "../../Utils/Physics"

export default class CarConstraints
{
    constructor()
    {
        this.physics = new Physics()
        this.world = this.physics.world
    }

    setConstraints(carBody, flBody, frBody, blBody, brBody)
    {
        //constraints
        this.FLaxis = new CANNON.Vec3(1, 0, 0)
        this.FRaxis = new CANNON.Vec3(1, 0, 0)
        this.BLaxis = new CANNON.Vec3(1, 0, 0)
        this.BRaxis = new CANNON.Vec3(1, 0, 0)

        this.constraintFL = new CANNON.HingeConstraint(
            carBody, 
            flBody, 
            {
                pivotA: new CANNON.Vec3(-1.0, 0.45, -1.75),
                axisA: this.FLaxis,
                maxForce:25
            }
        )
        this.world.addConstraint(this.constraintFL)

        this.constraintFR = new CANNON.HingeConstraint(
            carBody, 
            frBody, 
            {
                pivotA: new CANNON.Vec3(1.0, 0.45, -1.75),
                axisA: this.FRaxis,
                maxForce: 25
            }
        )
        this.world.addConstraint(this.constraintFR)

        this.constraintBL = new CANNON.HingeConstraint(
            carBody, 
            blBody, 
            {
                pivotA: new CANNON.Vec3(-1.0, 0.45, 1.95),
                axisA: this.BLaxis,
                maxForce: 25
            }
        )
        this.world.addConstraint(this.constraintBL)

        this.constraintBR = new CANNON.HingeConstraint(
            carBody, 
            brBody, 
            {
                pivotA: new CANNON.Vec3(1.0, 0.45, 1.95),
                axisA: this.BRaxis,
                maxForce: 25
            }
        )
        this.world.addConstraint(this.constraintBR)
        this.constraintBL.enableMotor()
        this.constraintBR.enableMotor()
    }
}