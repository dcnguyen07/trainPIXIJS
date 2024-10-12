import { Application, Assets, Sprite } from "pixi.js";

export class Promise {
    constructor(){
        this.init();
    }
    async init(){
        const app = new Application();
        await app.init({ background: '#1099bb', resizeTo: window });
        document.body.appendChild(app.canvas);

        const texturePromise = Assets.load('https://pixijs.com/assets/bunny.png');

        texturePromise.then((resolvedTexture) =>{
            const bunny = Sprite.from(resolvedTexture);

            bunny.anchor.set(0.5);
            bunny.x = app.screen.width / 2;
            bunny.y = app.screen.height / 2;

            app.stage.addChild(bunny);
        }); 
    }
}