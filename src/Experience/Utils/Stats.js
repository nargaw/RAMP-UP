import Stats from "stats.js";

export default class StatDebug
{
    constructor()
    {
        this.stats = new Stats()
        this.stats.showPanel(0)
        document.body.appendChild(this.stats.dom)
    }

    update()
    {
        this.stats.update()
    }
}