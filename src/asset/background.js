import { Application, Assets, Sprite } from "pixi.js";

export class Background {
    constructor(){
        this.init();
    }
    async init(){

        const app = new Application();
        app.init({ background: '#1099bb', resizeTo: window }).then(() => {
        document.body.appendChild(app.canvas);

        Assets.add({ alias: 'flowerTop', src: 'https://pixijs.com/assets/flowerTop.png' });
        Assets.add({ alias: 'eggHead', src: 'https://pixijs.com/assets/eggHead.png' });
    
        Assets.backgroundLoad(['flowerTop', 'eggHead']);
        Assets.load('eggHead').then((texture) =>
        {
            let isEggHead = true;
            const character = new Sprite(texture);
            character.anchor.set(0.5);
            character.x = app.screen.width / 2;
            character.y = app.screen.height / 2;
            character.eventMode = 'static';
            character.cursor = 'pointer';
            app.stage.addChild(character);
    
            character.on('pointertap', async () =>
            {
                isEggHead = !isEggHead;
                character.texture = await Assets.load(isEggHead ? 'eggHead' : 'flowerTop');
            });
        });
    });
 }   
}
