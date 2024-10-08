import { Application, Assets, SCALE_MODES, Sprite } from "pixi.js";

export class Click {
    constructor(){
        this.init();
    }
    async init(){
        const app = new Application();

    await app.init({ background: '#1099bb', resizeTo: window });

    document.body.appendChild(app.canvas);

    const texture = await Assets.load('https://pixijs.com/assets/bunny.png');

    texture.baseTexture.scaleMode = SCALE_MODES.NEAREST;

    const sprite = Sprite.from(texture);

    sprite.anchor.set(0.5);
    sprite.x = app.screen.width / 2;
    sprite.y = app.screen.height / 2;

    sprite.eventMode = 'static';

   
    sprite.cursor = 'pointer';
    sprite.on('pointerdown', onClick);

    app.stage.addChild(sprite);

    function onClick()
    {
        sprite.scale.x *= 1.25;
        sprite.scale.y *= 1.25;
    }
    }
}