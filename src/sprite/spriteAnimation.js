import { AnimatedSprite, Application, Assets, Container, Texture } from "pixi.js";

export class SpriteAnimation {
    constructor() {
        this.init();
    }

    async init() {
        const app = new Application();
        await app.init({ background: '#1099bb', resizeTo: window });
        document.body.appendChild(app.canvas);
        
        const container = new Container();
        app.stage.addChild(container);

        const spritesheet = await Assets.load('https://pixijs.com/assets/spritesheet/0123456789.json');

        const textures = [];
        for (let i = 0; i < 10; i++) {
            const framekey = `0123456789 ${i}.ase`;  
            const texture = Texture.from(framekey);
            const time = spritesheet.data.frames[framekey].duration;

            textures.push({ texture, time });
        }

        const scaling = 4;
        const slow = new AnimatedSprite(textures);

        slow.anchor.set(0.5);
        slow.scale.set(scaling);
        slow.animationSpeed = 0.5;
        slow.x = (app.screen.width - slow.width) / 2;
        slow.y = app.screen.height / 2;
        slow.play();
        app.stage.addChild(slow);

        const fast = new AnimatedSprite(textures);

        fast.anchor.set(0.5);
        fast.scale.set(scaling);
        fast.x = (app.screen.width + fast.width) / 2;
        fast.y = app.screen.height / 2;
        fast.play();
        app.stage.addChild(fast);

        app.start();
    }
}
