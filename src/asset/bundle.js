import { Application, Assets, Sprite } from "pixi.js";

export class Bundle {
    constructor(){
        this.init();
    }
    async init(){
        const app = new Application();
        await app.init({ background: '#1099bb', resizeTo: window });
        document.body.appendChild(app.canvas);

        const manifestExample = {
            bundles: [
                {
                    name: 'load-screen',
                    assets: [
                        {
                            alias: 'flowerTop',
                            src: 'https://pixijs.com/assets/flowerTop.png',
                        },
                    ],
                },
                {
                    name: 'game-screen',
                    assets: [
                        {
                            alias: 'eggHead',
                            src: 'https://pixijs.com/assets/eggHead.png',
                        },
                    ],
                },
            ],
        };

        await Assets.init({ manifest: manifestExample });
        Assets.backgroundLoadBundle(['load-screen', 'game-screen']);
        makeLoadScreen();
    

    async function makeLoadScreen(){
        const loadScreenAssets = await Assets.loadBundle('load-screen');
        const goNext = new Sprite(loadScreenAssets.flowerTop);

        goNext.anchor.set(0.5);
        goNext.x = app.screen.width / 2;
        goNext.y = app.screen.height / 2;
        app.stage.addChild(goNext);

        goNext.eventMode = 'static';
        goNext.cursor = 'pointer';
        goNext.on('pointertap', async () =>
        {
            goNext.destroy();
            makeGameScreen();
        });
    }

    async function makeGameScreen(){
        const loadScreenAssets = await Assets.loadBundle('game-screen');
        const goBack = new Sprite(loadScreenAssets.eggHead);
        goBack.anchor.set(0.5);
        goBack.x = app.screen.width / 2;
        goBack.y = app.screen.height / 2;
        app.stage.addChild(goBack);
    
        goBack.eventMode = 'static';
        goBack.cursor = 'pointer';
    
        goBack.on('pointertap', async () =>
        {
            goBack.destroy();
            makeLoadScreen();
        });
    }
  }
}