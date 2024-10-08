import { Application, Assets, Container, Sprite } from "pixi.js";

export class transparentBackground{
    constructor(){
        this.init();
    }

async init()  {
    const app = new Application();
        await app.init({ background: '#1099bb', resizeTo: window });
        document.body.appendChild(app.canvas);
    
    const container = new Container();
    app.stage.addChild(container);

    const texture = await Assets.load('https://pixijs.com/assets/bunny.png');

    const bunny = new Sprite(texture);
    bunny.anchor.set(0.5);

    bunny.x = app.screen.width/2;
    bunny.y = app.screen.height/2;

    app.stage.addChild(bunny);

    app.ticker.add(() =>{
        bunny.rotation += 0.1;
    });
  }
}

