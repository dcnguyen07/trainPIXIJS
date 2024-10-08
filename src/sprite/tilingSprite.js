import { Application, Assets, Container, TilingSprite } from "pixi.js";

export class TilingSpriteEx {
    constructor(){
        this.init();
    }
    async init(){
        const app = new Application();
        await app.init({ background: '#1099bb', resizeTo: window });
        document.body.appendChild(app.canvas);
        const container = new Container();
        app.stage.addChild(container);

        const texture = await Assets.load('https://pixijs.com/assets/p2.jpeg');
        const tilingSprite = new TilingSprite(texture, app.screen.width, app.screen.height);
        app.stage.addChild(tilingSprite);
        
        let count = 0;
        app.ticker.add(() => {
            count += 0.005;
            tilingSprite.tileScale.x = 2 + Math.sin(count);
            tilingSprite.tileScale.y = 2 + Math.cos(count);

            tilingSprite.tilePosition.x += 1;
            tilingSprite.tilePosition.y += 1;
        });
    }
}
