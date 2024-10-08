import { Application, Assets, Container, Rectangle, Sprite } from "pixi.js";

export class Tinting {
    constructor(){
        this.init();
    }

    async init(){
        const app = new Application();
        await app.init({ background: '#1099bb', resizeTo: window });
        document.body.appendChild(app.canvas);
        const container = new Container();
        const texture = await Assets.load('https://pixijs.com/assets/eggHead.png');

        const aliens = [];
        const totalDudes = 20;
        for (let i = 0 ; i < totalDudes; i++){
        const dude = new Sprite(texture);
        dude.anchor.set(0.5);
        dude.scale.set(0.8 + Math.random() * 0.3);

        dude.x = Math.random() * app.screen.width;
        dude.y = Math.random() * app.screen.height;

        dude.tint = Math.random() * 0xffffff;
        dude.direction = Math.random() * Math.PI*2;

        dude.turningSpeed = Math.random() - 0.8;
        dude.speed = 2 + Math.random() * 2;

        aliens.push(dude);
        app.stage.addChild(dude);
    }
    const dudeBoundsPadding = 100;
    const dudeBounds = new Rectangle(
        -dudeBoundsPadding,
        -dudeBoundsPadding,
        app.screen.width + dudeBoundsPadding * 2,
        app.screen.height + dudeBoundsPadding * 2,
    );

    app.ticker.add(() =>
    {
        for (let i = 0; i < aliens.length; i++)
        {
            const dude = aliens[i];

            dude.direction += dude.turningSpeed * 0.01;
            dude.x += Math.sin(dude.direction) * dude.speed;
            dude.y += Math.cos(dude.direction) * dude.speed;
            dude.rotation = -dude.direction - Math.PI / 2;

            if (dude.x < dudeBounds.x)
            {
                dude.x += dudeBounds.width;
            }
            else if (dude.x > dudeBounds.x + dudeBounds.width)
            {
                dude.x -= dudeBounds.width;
            }

            if (dude.y < dudeBounds.y)
            {
                dude.y += dudeBounds.height;
            }
            else if (dude.y > dudeBounds.y + dudeBounds.height)
            {
                dude.y -= dudeBounds.height;
            }
        }
    });
 }
}

