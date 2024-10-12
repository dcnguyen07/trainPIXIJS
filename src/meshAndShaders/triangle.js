import { Application, Geometry, Mesh, Shader } from "pixi.js";
export class TriangleEx {
    constructor(){
        this.init();
    }
    async init(){

    const app = new Application();
    await app.init({
        resizeTo: window,
        preference: 'webgl',
    });

    document.body.appendChild(app.canvas);

    const geometry = new Geometry({
        attributes: {
            aPosition: [-100, -50, 100, -50, 0, 100],
        },
    });

    const gl = { vertex, fragment };
    const gpu = {
        vertex: {
            entryPoint: 'main',
            source,
        },
        fragment: {
            entryPoint: 'main',
            source,
        },
    };

    const shader = Shader.from({
        gl,
        gpu,
    });

    const triangle = new Mesh({
        geometry,
        shader,
    });
    triangle.position.set(400, 300);
    app.stage.addChild(triangle);

    app.ticker.add(() =>
    {
        triangle.rotation += 0.01;
    });
    }
}