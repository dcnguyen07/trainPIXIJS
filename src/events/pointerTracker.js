import { Application, Graphics } from "pixi.js";

export class PointerTracker {
    constructor(){
        this.init();
    }
    async init(){
        const app = new Application();
        await app.init({backgroundColor: '0x1099bb', resizeTo: window});
        document.body.appendChild(app.canvas);

        const circle = app.stage.addChild(
            new Graphics().circle(0, 0, 8).fill({color: 0xffffff}).stroke({ color: 0x111111, alpha: 0.87, width: 1}),
        );
        circle.position.set(app.screen.width / 2, app.screen.height / 2);

        app.stage.eventMode = 'static';
        app.stage.addEventListener('pointermove', (e) =>{
            circle.position.copyFrom(e.global);
        });
    }
}