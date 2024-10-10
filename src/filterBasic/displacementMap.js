import { Application, Assets, Container, DisplacementFilter, Point, Rectangle, Sprite } from "pixi.js";

export class DisplacementMapCrawlies {
    constructor(){
        this.init();
    }
    async init(){
        const app = new Application();
        await app.init({ resizeTo: window});
        document.body.appendChild(app.canvas);

        await Assets.load([
            'https://pixijs.com/assets/maggot.png',
            'https://pixijs.com/assets/pixi-filters/displace.png',
            'https://pixijs.com/assets/pixi-filters/ring.png',
            'https://pixijs.com/assets/bg_grass.jpg',
        ]);

        app.stage.eventMode = 'static';
        const container = new Container();
        app.stage.addChild(container);

        const padding = 100;
        const bounds = new Rectangle(-padding, -padding, app.screen.width + padding * 2, app.screen.height + padding * 2);
        const maggots = [];

        for( let i = 0 ; i < 20; i++){
            const maggot = Sprite.from('https://pixijs.com/assets/maggot.png');
            maggot.anchor.set(0.5);
            container.addChild(maggot);
            maggot.direction = Math.random() * Math.PI * 2;
            maggot.speed = 1;
            maggot.turnSpeed = Math.random() - 0.8;

            maggot.x = Math.random() * bounds.width;
            maggot.y = Math.random() * bounds.height;

            maggot.scale.set(1 + Math.random() * 0.3);
            maggot.original = new Point();
            maggot.original.copyFrom(maggot.scale);
            maggots.push(maggot);
        }

        const displacementSprite = Sprite.from('https://pixijs.com/assets/pixi-filters/displace.png');
        const displacementFilter = new DisplacementFilter({ sprite: displacementSprite, scale: 150});
        app.stage.addChild(displacementSprite);

        container.filters = [displacementFilter];
        displacementSprite.anchor.set(0.5);

        const ring = Sprite.from('https://pixijs.com/assets/pixi-filters/ring.png');
        ring.anchor.set(0.5);
        ring.visible = false;
        app.stage.addChild(ring);
        
        const bg = Sprite.from('https://pixijs.com/assets/bg_grass.jpg');
        bg.width = app.screen.width;
        bg.height = app.screen.height;
        bg.alpha = 0.4;
        container.addChild(bg);

        app.stage.on('mousemove' , onPointMove).on('touchmove', onPointMove);
        function onPointMove(eventData){
            ring.visible = true;
            displacementSprite.position.set(eventData.data.global.x - 25, eventData.data.global.y);
            ring.position.copyFrom(displacementSprite.position);
        }

        let count = 0;
        app.ticker.add(()=>{
            count += 0.05;
            for (let i = 0; i< maggots.length; i++){
                const maggot = maggots[i];

                maggot.direction += maggot.turnSpeed * 0.01;
                maggot.x += Math.sin(maggot.direction) * maggot.speed;
                maggot.y += Math.cos(maggot.direction) * maggot.speed;

                maggot.rotation = -maggot.direction - Math.PI / 2;
                maggot.scale.x = maggot.original.x + Math.sin(count) * 0.2;

                if (maggot.x < bounds.x)
                    {
                        maggot.x += bounds.width;
                    }
                    else if (maggot.x > bounds.x + bounds.width)
                    {
                        maggot.x -= bounds.width;
                    }
        
                    if (maggot.y < bounds.y)
                    {
                        maggot.y += bounds.height;
                    }
                    else if (maggot.y > bounds.y + bounds.height)
                    {
                        maggot.y -= bounds.height;
                    }
            }
        });
    }
}