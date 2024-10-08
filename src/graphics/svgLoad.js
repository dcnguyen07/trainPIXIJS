import { Application, Assets, Graphics } from "pixi.js";

export class SvgLoad {
    constructor(){
        this.init();
    }
    async init(){
        const app = new Application();
        await app.init({ antialias: true, resizeTo: window });
        document.body.appendChild(app.canvas);

        const tigerSvg = await Assets.load({
            src: 'https://pixijs.com/assets/tiger.svg',
            data: {
                parseAsGraphicsContext: true,
            },
        });
        const graphics = new Graphics(tigerSvg);
        const bounds = graphics.getLocalBounds();
        graphics.pivot.set(bounds.x + bounds.width) / 2, (bounds.y + bounds.height) / 2;
        graphics.position.set(app.screen.width / 2, app.screen.height / 2);

        app.stage.addChild(graphics);
        app.ticker.add((time)=>{
            graphics.rotation += 0.01;
            graphics.scale.set(2 + Math.sin(graphics.rotation));
        });
    }
}