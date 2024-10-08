import { Application, Assets, BitmapText } from "pixi.js";

export class BitmapTextEx {
    constructor(){
        this.init();
    }
    async init(){
        const app = new Application();
        await app.init({ background: '#1099bb', resizeTo: window});
        document.body.appendChild(app.canvas);

        await Assets.load('https://pixijs.com/assets/bitmap-font/desyrel.xml');

        const bitmapFontText = new BitmapText({
            text: 'bitmap fonts are supported!\nWoo yay!',
            style:{
                fontFamily: 'Desyrel',
                fontSize: 55,
                align: 'left',
            },
        });
        bitmapFontText.x = 50;
        bitmapFontText.y = 200;
        app.stage.addChild(bitmapFontText);
    }
}