import { AnimatedSprite, Application, Assets, Container, Texture } from "pixi.js";

export class SpriteExplosion{
    constructor(){
        this.init();
    }
    async init(){
        const app = new Application();
        await app.init({ background: '#1099bb', resizeTo: window });
        document.body.appendChild(app.canvas);

        const container = new Container();
        app.stage.addChild(container);

        const texture = await Assets.load('https://pixijs.com/assets/spritesheet/mc.json');
        const explosionTextures = [];
        let i;
        
        for (i = 0; i < 26; i++){
                const texture = Texture.from(`Explosion_Sequence_A ${i + 1}.png`);
        
                explosionTextures.push(texture);
            }

        for (i = 0 ; i < 50 ; i++){
            const explosion = new AnimatedSprite(explosionTextures);

            explosion.x = Math.random() * app.screen.width;
            explosion.y = Math.random() * app.screen.height;
            explosion.anchor.set(0.5);
            explosion.rotation = Math.random() * Math.PI;
            explosion.scale.set(0.75 + Math.random() * 0.5);
            explosion.gotoAndPlay((Math.random() * 26) | 0);
            app.stage.addChild(explosion);
        }
        app.start();
    }
}