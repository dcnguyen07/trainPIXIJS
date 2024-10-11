import { Application, Assets, Container, MeshRope, Point } from "pixi.js";

export class TextureMeshBasic {
    constructor(){
        this.init();
    }
    async init(){
        const app = new Application();
        await app.init({ resizeTo: window});
        document.body.appendChild(app.canvas);

        const texture = await Assets.load('https://pixijs.com/assets/snake.png');
        let count = 0;
        const ropeLength = 918 / 20;
        const points = [];
        for (let i = 0; i < 20; i++)
        {
            points.push(new Point(i * ropeLength, 0));
        }

        const strip = new MeshRope({ texture, points });
        strip.x = -459;
        const snakeContainer = new Container();
        snakeContainer.x = 400;
        snakeContainer.y = 300;
        snakeContainer.scale.set(800 / 1100);
        app.stage.addChild(snakeContainer);

        snakeContainer.addChild(strip);
        app.ticker.add(() =>
        {
            count += 0.1;
            for (let i = 0; i < points.length; i++)
            {
                points[i].y = Math.sin(i * 0.5 + count) * 30;
                points[i].x = i * ropeLength + Math.cos(i * 0.3 + count) * 20;
            }
        });
    }
}