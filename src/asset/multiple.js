import { Application, Assets, Sprite } from "pixi.js";

export class Multiple{
    constructor(){
        this.init();
    }
    async init(){
    const app = new Application();
    app.init({ background: '#1099bb', resizeTo: window }).then(() =>{
    document.body.appendChild(app.canvas);

    Assets.add({ alias: 'flowerTop', src: 'https://pixijs.com/assets/flowerTop.png' });
    Assets.add({ alias: 'eggHead', src: 'https://pixijs.com/assets/eggHead.png' });

    const texturesPromise = Assets.load(['flowerTop', 'eggHead']); 
    texturesPromise.then((textures) =>
    {
     
        const flower = Sprite.from(textures.flowerTop);
        flower.anchor.set(0.5);
        flower.x = app.screen.width * 0.25;
        flower.y = app.screen.height / 2;
        app.stage.addChild(flower);

        const egg = Sprite.from(textures.eggHead);
        egg.anchor.set(0.5);
        egg.x = app.screen.width * 0.75;
        egg.y = app.screen.height / 2;
        app.stage.addChild(egg);
        });
    });
    }
}