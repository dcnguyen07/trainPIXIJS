import { Application, Assets, Container, RenderTexture, SCALE_MODES, Sprite } from "pixi.js";

export class TextureBasic {
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
    
        for (let i = 0; i < 25; i++)
        {
            const bunny = new Sprite(texture);
    
            bunny.x = (i % 5) * 30;
            bunny.y = Math.floor(i / 5) * 30;
            bunny.rotation = Math.random() * (Math.PI * 2);
            container.addChild(bunny);
        }
    
        const rt = RenderTexture.create({
            width: 300,
            height: 300,
            scaleMode: SCALE_MODES.LINEAR,
            resolution: 1,
        });
    
        const sprite = new Sprite(rt);
    
        sprite.x = 450;
        sprite.y = 60;
        app.stage.addChild(sprite);
    
        container.x = 100;
        container.y = 60;
    
        app.ticker.add(() =>
        {
            app.renderer.render(container, { renderTexture: rt });
        });
    }
}