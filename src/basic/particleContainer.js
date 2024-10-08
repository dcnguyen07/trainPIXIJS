import { Application, Assets, Container, Rectangle, Sprite } from "pixi.js";

export class particleContainer{
    constructor(){
        this.init();
    }

    async init(){
        const app = new Application();
        await app.init({ background: '#1099bb', resizeTo: window });
        document.body.appendChild(app.canvas);
        const container = new Container();
        app.stage.addChild(container);

        const texture = await Assets.load('https://pixijs.com/assets/maggot_tiny.png');
        const sprites = new Container();
        app.stage.addChild(sprites);

        const maggots = [];
        const totalSprites = 10000;

        for (let i = 0; i < totalSprites; i++){
            const dude = new Sprite(texture);
            dude.anchor.set(0.5);
            dude.scale.set(0.8 + Math.random() * 0.3);

            dude.x = Math.random() * app.screen.width;
            dude.y = Math.random() * app.screen.height;

            dude.tint = Math.random() * 0x808080;

            dude.direction = Math.random() * Math.PI * 2;
            dude.turningSpeed = Math.random() - 0.8;

            dude.speed = (2+ Math.random() * 2) * 0.2;
            dude.offset = Math.random() * 100;

            maggots.push(dude);
            sprites.addChild(dude);
        }

        const dudeBoundsPadding = 100;
        const dudeBounds = new Rectangle(
            -dudeBoundsPadding,
            -dudeBoundsPadding,
            app.screen.width + dudeBoundsPadding * 2,
            app.screen.height + dudeBoundsPadding * 2,
        );

        let tick = 0;
        app.ticker.add(() =>{
            for (let i = 0 ; i< maggots.length; i ++){
                const dude = maggots[i];
                dude.scale.y = 0.95 + Math.sin(tick + dude.offset) * 0.05;
                dude.direction += dude.turningSpeed * 0.01;
                dude.x += Math.sin(dude.direction) * (dude.speed * dude.scale.y);
            dude.y += Math.cos(dude.direction) * (dude.speed * dude.scale.y);
            dude.rotation = -dude.direction + Math.PI;

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

        tick += 0.1;
     });
    }
 }
