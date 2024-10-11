import { Application, Assets, Container, DisplacementFilter, Sprite, WRAP_MODES } from "pixi.js";

export class MapFlag{
    constructor(){
        this.init();
    }
    async init(){
        const app = new Application();
        await app.init({ resizeTo: window });
        document.body.appendChild(app.canvas);
        
        await Assets.load([
            'https://pixijs.com/assets/pixi-filters/flag.png',
            'https://pixijs.com/assets/pixi-filters/displacement_map_repeat.jpg',
        ]);

        app.stage.eventMode = 'static';
        const container = new Container();
        app.stage.addChild(container);

        const flag = Sprite.from('https://pixijs.com/assets/pixi-filters/flag.png');
        container.addChild(flag);
        flag.x = 100;
        flag.y = 100;

        const displacementSprite = Sprite.from('https://pixijs.com/assets/pixi-filters/displacement_map_repeat.jpg');
        displacementSprite.texture.baseTexture.wrapMode = WRAP_MODES.REPEAT;
        const displacementFilter = new DisplacementFilter({ sprite: displacementSprite, scale: { x: 60, y: 120 } });
        displacementFilter.padding = 10;
        displacementSprite.position = flag.position;
        app.stage.addChild(displacementSprite);

        flag.filters = [displacementFilter];

        app.ticker.add(()=> {
            displacementSprite.x++;
            if(displacementSprite.x > displacementSprite.width){
                displacementSprite.x = 0;
            }
        })
    }
}