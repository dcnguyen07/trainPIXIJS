import { Application, Assets, Container, Sprite } from "pixi.js";

export class BasicCanvas {
    constructor(){
        this.init();
    }
    async init(){
        
        const app = new Application();
        await app.init({ background: '#1099bb', resizeTo: window });
        document.body.appendChild(app.canvas);

        const container = new Container();
        app.stage.addChild(container);

        const texture = await Assets.load('https://pixijs.com/assets/bunny.png');
        for (let i = 0; i < 25; i++ ){
            const bunny = new Sprite(texture);
            bunny.anchor.set(0.5);
            bunny.x = (i % 5) * 40;
            container.addChild(bunny);
        }

        container.x = app.screen.width / 2;
        container.y = app.screen.height / 2;

        container.pivot.x = container.width / 2;
        container.pivot.y = container.height / 2;

        app.ticker.add((time) => {
            container.rotation -= 0.01 * time.deltaTime;
        });
    }
}