import { Application, Assets, Container, Point, MeshRope } from "pixi.js";

export class MouseTrail{
    constructor(){
        this.init();
    }
    async init(){
    const app = new Application();
    await app.init({ background: '#1099bb', resizeTo: window });
    document.body.appendChild(app.canvas);

    const trailTexture = await Assets.load('https://pixijs.com/assets/trail.png');
    const historyX = [];
    const historyY = [];
    const historySize = 20;
    const ropeSize = 100;
    const points = [];

    for (let i = 0; i < historySize; i++)
    {
        historyX.push(0);
        historyY.push(0);
    }
   
    for (let i = 0; i < ropeSize; i++)
    {
        points.push(new Point(0, 0));
    }

    const rope = new MeshRope({ texture: trailTexture, points });

    rope.blendmode = 'add';

    app.stage.addChild(rope);

    let mouseposition = null;

    app.stage.eventMode = 'static';
    app.stage.hitArea = app.screen;
    app.stage.on('mousemove', (event) =>
    {
        mouseposition = mouseposition || { x: 0, y: 0 };
        mouseposition.x = event.global.x;
        mouseposition.y = event.global.y;
    });

    app.ticker.add(() =>
    {
        if (!mouseposition) return;

        historyX.pop();
        historyX.unshift(mouseposition.x);
        historyY.pop();
        historyY.unshift(mouseposition.y);
       
        for (let i = 0; i < ropeSize; i++)
        {
            const p = points[i];

            const ix = cubicInterpolation(historyX, (i / ropeSize) * historySize);
            const iy = cubicInterpolation(historyY, (i / ropeSize) * historySize);

            p.x = ix;
            p.y = iy;
        }
    });

    function clipInput(k, arr)
    {
        if (k < 0) k = 0;
        if (k > arr.length - 1) k = arr.length - 1;

        return arr[k];
    }

    function getTangent(k, factor, array)
    {
        return (factor * (clipInput(k + 1, array) - clipInput(k - 1, array))) / 2;
    }

    function cubicInterpolation(array, t, tangentFactor = 1)
    {
        const k = Math.floor(t);
        const m = [getTangent(k, tangentFactor, array), getTangent(k + 1, tangentFactor, array)];
        const p = [clipInput(k, array), clipInput(k + 1, array)];

        t -= k;
        const t2 = t * t;
        const t3 = t * t2;

        return (2 * t3 - 3 * t2 + 1) * p[0] + (t3 - 2 * t2 + t) * m[0] + (-2 * t3 + 3 * t2) * p[1] + (t3 - t2) * m[1];
    }
    }
}