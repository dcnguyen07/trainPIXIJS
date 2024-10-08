import { AnimatedSprite, Application, Assets, Container, Texture } from "pixi.js";

export class SpriteJet{
    constructor(){
        this.init();
    }
    async init(){
        const app = new Application();
        await app.init({ background: '#1099bb', resizeTo: window });
        document.body.appendChild(app.canvas);

        const container = new Container();
        app.stage.addChild(container);

        await Assets.load('https://pixijs.com/assets/spritesheet/fighter.json');

        const frames = [];
        for ( let i = 0 ; i < 30 ; i++){
            const val = i < 10 ? `0${i}` : i;
            frames.push(Texture.from(`rollSequence00${val}.png`));
        }

        const anim = new AnimatedSprite(frames);

        anim.x = app.screen.width / 2;
        anim.y = app.screen.height / 2;
        anim.anchor.set(0.5);
        anim.animationSpeed = 0.5;
        anim.play();

        app.stage.addChild(anim);

        app.ticker.add(() =>{
            anim.rotation += 0.01;
        });
    }
}