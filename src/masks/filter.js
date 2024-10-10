import { Application, Assets, BlurFilter, Graphics, Rectangle, SCALE_MODES, Sprite } from "pixi.js";

export class FilterEx {
    constructor(){
        this.init();
    }
    async init(){
        const app = new Application();
        await app.init({ resizeTo: window });
        document.body.appendChild(app.canvas);

        const radius = 100;
        const blurSize = 32;
        const grassTexture = await Assets.load('https://pixijs.com/assets/bg_grass.jpg');
        const background = new Sprite(grassTexture);

        app.stage.addChild(background);
        background.width = app.screen.width;
        background.height = app.screen.height;

        const circle = new Graphics().circle(radius + blurSize, radius + blurSize, radius).fill({ color: 0xff0000 });
        circle.filters = [new BlurFilter(blurSize)];

        const bounds = new Rectangle(0, 0, (radius + blurSize) * 2, (radius + blurSize) * 2);
        const texture = app.renderer.generateTexture({
            target: circle,
            style: { scaleMode: SCALE_MODES.NEAREST },
            resolution: 1,
            frame: bounds,
        });

        const focus = new Sprite(texture);
        app.stage.addChild(focus);
        background.mask = focus;

        app.stage.eventMode = 'static';
        app.stage.hitArea = app.screen;
        app.stage.on('pointermove' , (event) =>{
            focus.position.x = event.global.x - focus.width / 2;
            focus.position.y = event.global.y - focus.height / 2;
        });
    }
}