import { Application, Assets, Container, Sprite } from "pixi.js";

export class TextureSwap {
    constructor(){
        this.init();
    }
    
    async init(){
        const app = new Application();
        await app.init({ background: '#1099bb', resizeTo: window });
        document.body.appendChild(app.canvas);

        const container = new Container();
        app.stage.addChild(container);

        const alien1texture = await Assets.load('https://pixijs.com/assets/flowerTop.png');
        const alien2texture = await Assets.load('https://pixijs.com/assets/eggHead.png');
        let isAlien1 = true;

        const character = new Sprite(alien1texture);
        character.anchor.set(0.5);
        character.x = app.screen.width / 2;
        character.y = app.screen.height / 2;

        app.stage.addChild(character);

        character.eventMode = 'static';
        character.cursor = 'pointer';
        
        character.on('pointertap', () => {
            isAlien1 = !isAlien1;
            character.texture = isAlien1 ? alien1texture : alien2texture;
        });
        
        app.ticker.add(() => {
            character.rotation += 0.02;
        });
    }
}
