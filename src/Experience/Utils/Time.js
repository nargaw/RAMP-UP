import EventEmitter from './EventEmitter.js'

export default class Time extends EventEmitter
{
    constructor()
    {
        super()

        // Setup
        this.start = Date.now()
        this.current = this.start
        this.elapsed = 0
        this.delta = 60
        this.tick = this.tick.bind(this)
        window.requestAnimationFrame(() =>
        {
            this.tick()
        })
    }

    tick()
    {
        const currentTime = Date.now()
        this.delta = currentTime - this.current
        this.elapsed = this.current - this.start
        this.current = currentTime
        
        if(this.delta > 60/1000)
        {
            this.delta = 60/1000
        }
        this.trigger('tick')

        window.requestAnimationFrame(() =>
        {
            this.tick()
        })
    }
}