import { Application, Assets, Container, Graphics, Sprite, RenderTexture, Point } from "pixi.js";

export class ScratchCard {
    constructor() {
        this.init();
    }

    async init() {
        const app = new Application();
        await app.init({ background: '#1099bb', resizeTo: window });
        document.body.appendChild(app.canvas);

        const container = new Container();
        app.stage.addChild(container);

        const brush = new Graphics().beginFill(0xffffff).drawCircle(0, 0, 50).endFill();
        const line = new Graphics();

        
        await Assets.load(['https://pixijs.com/assets/bg_grass.jpg', 'https://pixijs.com/assets/bg_rotate.jpg']);

        const { width, height } = app.screen;
        const stageSize = { width, height };

        const background = Object.assign(Sprite.from('https://pixijs.com/assets/bg_grass.jpg'), stageSize);
        const imageToReveal = Object.assign(Sprite.from('https://pixijs.com/assets/bg_rotate.jpg'), stageSize);
        const renderTexture = RenderTexture.create(stageSize);
        const renderTextureSprite = new Sprite(renderTexture);

        imageToReveal.mask = renderTextureSprite;

        app.stage.addChild(background, imageToReveal, renderTextureSprite);

        app.stage.eventMode = 'static';
        app.stage.hitArea = app.screen;
        app.stage
            .on('pointerdown', pointerDown)
            .on('pointerup', pointerUp)
            .on('pointerupoutside', pointerUp)
            .on('pointermove', pointerMove);

        let dragging = false;
        let lastDrawnPoint = null;

        function pointerMove({ global: { x, y } }) {
            if (dragging) {
                brush.position.set(x, y);
                app.renderer.render({
                    container: brush,
                    target: renderTexture,
                    clear: false,
                    skipUpdateTransform: false,
                });

                if (lastDrawnPoint) {
                    line.clear()
                        .lineStyle(100, 0xffffff)
                        .moveTo(lastDrawnPoint.x, lastDrawnPoint.y)
                        .lineTo(x, y);
                    app.renderer.render({
                        container: line,
                        target: renderTexture,
                        clear: false,
                        skipUpdateTransform: false,
                    });
                }

                lastDrawnPoint = lastDrawnPoint || new Point();
                lastDrawnPoint.set(x, y);
            }
        }

        function pointerDown(event) {
            dragging = true;
            pointerMove(event);
        }

        function pointerUp(event) {
            dragging = false;
            lastDrawnPoint = null;
        }
    }
}
