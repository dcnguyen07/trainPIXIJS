import { Application, Assets, Container, Graphics, Sprite, Texture } from "pixi.js";

export class Video {
    constructor() {
        this.init();
    }

    async init() {
        const app = new Application();

        await app.init({ resizeTo: window });
    
        document.body.appendChild(app.canvas);
    
        const button = new Graphics()
            .roundRect(0, 0, 100, 100, 10)
            .fill(0xffffff, 0.5)
            .beginPath()
            .moveTo(36, 30)
            .lineTo(36, 70)
            .lineTo(70, 50)
            .closePath()
            .fill(0xffffff);
    
       
        button.x = (app.screen.width - button.width) / 2;
        button.y = (app.screen.height - button.height) / 2;
    
       
        button.eventMode = 'static';
        button.cursor = 'pointer';
    
       
        app.stage.addChild(button);
    
        const texture = await Assets.load('https://pixijs.com/assets/video.mp4');
        button.on('pointertap', () =>
        {
            
            button.destroy();
    
            const videoSprite = new Sprite(texture);
            videoSprite.width = app.screen.width;
            videoSprite.height = app.screen.height;
    
            app.stage.addChild(videoSprite);
        });
    }
}
