import { Application, Assets, Container, RenderTexture, Sprite } from "pixi.js";

export class RenderTextureAdvanced{
    constructor(){
        this.init();
    }
    async init(){
    const app = new Application();
    await app.init({ resizeTo: window });
    document.body.appendChild(app.canvas);

    const stageSize = {
        width: app.screen.width,
        height: app.screen.height,
    };

    let renderTexture = RenderTexture.create(stageSize);
    let renderTexture2 = RenderTexture.create(stageSize);
    const currentTexture = renderTexture;

    
    const outputSprite = new Sprite(currentTexture);
    outputSprite.x = 400;
    outputSprite.y = 300;
    outputSprite.anchor.set(0.5);
    app.stage.addChild(outputSprite);

    const stuffContainer = new Container();
    stuffContainer.x = 400;
    stuffContainer.y = 300;
    app.stage.addChild(stuffContainer);


    const fruits = [
        'https://pixijs.com/assets/rt_object_01.png',
        'https://pixijs.com/assets/rt_object_02.png',
        'https://pixijs.com/assets/rt_object_03.png',
        'https://pixijs.com/assets/rt_object_04.png',
        'https://pixijs.com/assets/rt_object_05.png',
        'https://pixijs.com/assets/rt_object_06.png',
        'https://pixijs.com/assets/rt_object_07.png',
        'https://pixijs.com/assets/rt_object_08.png',
    ];

    await Assets.load(fruits);

    const items = [];

    for (let i = 0; i < 20; i++)
    {
        const item = Sprite.from(fruits[i % fruits.length]);

        item.x = Math.random() * 400 - 200;
        item.y = Math.random() * 400 - 200;
        item.anchor.set(0.5);
        stuffContainer.addChild(item);
        items.push(item);
    }

    let count = 0;

    app.ticker.add(() =>
    {
        for (let i = 0; i < items.length; i++)
        {
            const item = items[i];
            item.rotation += 0.1;
        }

        count += 0.01;

        const temp = renderTexture;
        renderTexture = renderTexture2;
        renderTexture2 = temp;
        outputSprite.texture = renderTexture;

       
        stuffContainer.rotation -= 0.01;
        outputSprite.scale.set(1 + Math.sin(count) * 0.2);
        app.renderer.render({
            container: app.stage,
            target: renderTexture2,
            clear: false,
        });
    });
    }
}