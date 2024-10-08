import { Application, FillGradient, Graphics } from "pixi.js";

export class FillGradientEx{
    constructor(){
        this.init();
    }
    async init(){
        const app = new Application();
        await app.init({background: '1099bb', resizeTo: window});
        document.body.appendChild(app.canvas);

        const colorStops = [0xffffff, 0xff0000, 0x00ff00, 0x0000ff, 0x000000];
        const gradientFill = new FillGradient(0, 0, 150, 150);

        colorStops.forEach((number, index) =>{
            const ratio = index / colorStops.length;
            gradientFill.addColorStop(ratio, number);
        });

        const graphic1 = new Graphics().roundRect(0, 0, 150, 150, 50).fill(gradientFill);
        const graphic2 = new Graphics().roundRect(0, 0, 150, 150, 50).stroke({ width: 20, fill: gradientFill });

        graphic1.pivot.set(75, 75);
        graphic1.x = 150;
        graphic1.y = 200;

        graphic2.x = 350;
        graphic2.y = 125;

        app.stage.addChild(graphic1);
        app.stage.addChild(graphic2);

        let tick = 0;

        app.ticker.add(() =>
        {
            tick += 0.025;
            graphic1.rotation += 0.01;
            graphic2
                .clear()
                .roundRect(0, 0, 150, 150, 50)
                .stroke({ width: Math.sin(tick) * 100, fill: gradientFill });
        });
    }
}