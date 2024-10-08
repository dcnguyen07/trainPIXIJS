import { Application, Assets, Container, Sprite } from "pixi.js";

export class RenderGroup {
    constructor() {
        this.init();
    }
    
    async init() {
        const app = new Application();
        await app.init({ background: '#1099bb', resizeTo: window });
        document.body.appendChild(app.canvas);
        const container = new Container();
        app.stage.addChild(container);

        const treeTexture = await Assets.load(`https://pixijs.com/assets/tree.png`);
        const worldContainer = new Container({
            isRenderGroup: true,
        });
       
        const worldSize = 5000;
        for (let i = 0; i < 100000; i++) {
            const yPos = Math.random() * worldSize;
            const tree = new Sprite(treeTexture);  
            
            tree.x = Math.random() * worldSize;
            tree.y = yPos;
            tree.scale.set(0.25);
            tree.anchor.set(0.5);
            
            worldContainer.addChild(tree);
        }

        worldContainer.children.sort((a, b) => a.position.y - b.position.y);
        app.stage.addChild(worldContainer);

        let x = 0;
        let y = 0;
        
        app.view.addEventListener('mousemove', (e) => { 
            x = e.clientX;
            y = e.clientY;
        });
        
        app.ticker.add(() => {
            const screenWidth = app.renderer.width;
            const screenHeight = app.renderer.height;

            const targetX = (x / screenWidth) * (worldSize - screenWidth);
            const targetY = (y / screenHeight) * (worldSize - screenHeight);

            worldContainer.x += (-targetX - worldContainer.x) * 0.1;
            worldContainer.y += (-targetY - worldContainer.y) * 0.1;
        });
    }
}
