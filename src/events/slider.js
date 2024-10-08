import { Application, Assets, Graphics, SCALE_MODES, Sprite, Text } from "pixi.js";

export class Slider {
    constructor(){
        this.init();
    }
    async init(){
        const app = new Application();
        await app.init({ backgroundColor: '0x1099bb', resizeTo: window});
        document.body.appendChild(app.canvas);

        const stageHeight = app.screen.height;
        const stageWidth = app.screen.width;
        app.stage.hitArea = app.screen;

        const sliderWidth = 320;
        const slider = new Graphics().rect(0, 0, sliderWidth, 4).fill({ color: 0x272d37 });
    
        slider.x = (stageWidth - sliderWidth) / 2;
        slider.y = stageHeight * 0.75;
        
        const handle = new Graphics().circle(0, 0, 8).fill({ color: 0xffffff });

        handle.y = slider.height / 2;
        handle.x = sliderWidth / 2;
        handle.eventMode = 'static';
        handle.cursor = 'pointer';

        handle.on('pointerdown', onDragStart).on('pointerup', onDragEnd).on('pointerupoutside', onDragEnd);

        app.stage.addChild(slider);
        slider.addChild(handle);

        const texture = await Assets.load('https://pixijs.com/assets/bunny.png');
        const bunny = app.stage.addChild(Sprite.from(texture));

        bunny.texture.baseTexture.scaleMode = SCALE_MODES.NEAREST;
        bunny.scale.set(3);
        bunny.anchor.set(0.5);
        bunny.x = stageWidth / 2;
        bunny.y = stageHeight / 2;

        const title = new Text({
            text: 'Drag the handle to change the scale of bunny.',
            style: {
                fill: '#272d37',
                fontFamily: 'Roboto',
                fontSize: 20,
                align: 'center',
            },
        });
    
        title.roundPixels = true;
        title.x = stageWidth / 2;
        title.y = 40;
        title.anchor.set(0.5, 0);
        app.stage.addChild(title);
        
        function onDragStart()
        {
            app.stage.eventMode = 'static';
            app.stage.addEventListener('pointermove', onDrag);
        }

        function onDragEnd(e){
        app.stage.eventMode = 'auto';
        app.stage.removeEventListener('pointermove', onDrag);
        }
        function onDrag(e)
    {
        const halfHandleWidth = handle.width / 2;
        handle.x = Math.max(halfHandleWidth, Math.min(slider.toLocal(e.global).x, sliderWidth - halfHandleWidth));
        const t = 2 * (handle.x / sliderWidth - 0.5);
        bunny.scale.set(3 * (1.1 + t));
    }
    }
}