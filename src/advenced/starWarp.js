import { Application, Container, Sprite, Assets } from "pixi.js";

export class StarWarp {
    constructor() {
        this.init();
    }

    async init() {
        const app = new Application();
        await app.init({ background: '#1099bb', resizeTo: window });
        document.body.appendChild(app.canvas);

        const starTexture = await Assets.load('https://pixijs.com/assets/star.png');

    const starAmount = 1000;
    let cameraZ = 0;
    const fov = 20;
    const baseSpeed = 0.025;
    let speed = 0;
    let warpSpeed = 0;
    const starStretch = 5;
    const starBaseSize = 0.05;

    const stars = [];

    for (let i = 0; i < starAmount; i++)
    {
        const star = {
            sprite: new Sprite(starTexture),
            z: 0,
            x: 0,
            y: 0,
        };

        star.sprite.anchor.x = 0.5;
        star.sprite.anchor.y = 0.7;
        randomizeStar(star, true);
        app.stage.addChild(star.sprite);
        stars.push(star);
    }

    function randomizeStar(star, initial)
    {
        star.z = initial ? Math.random() * 2000 : cameraZ + Math.random() * 1000 + 2000;
        const deg = Math.random() * Math.PI * 2;
        const distance = Math.random() * 50 + 1;

        star.x = Math.cos(deg) * distance;
        star.y = Math.sin(deg) * distance;
    }

    setInterval(() =>
    {
        warpSpeed = warpSpeed > 0 ? 0 : 1;
    }, 5000);

    app.ticker.add((time) =>
    {
        speed += (warpSpeed - speed) / 20;
        cameraZ += time.deltaTime * 10 * (speed + baseSpeed);
        for (let i = 0; i < starAmount; i++)
        {
            const star = stars[i];

            if (star.z < cameraZ) randomizeStar(star);

            const z = star.z - cameraZ;

            star.sprite.x = star.x * (fov / z) * app.renderer.screen.width + app.renderer.screen.width / 2;
            star.sprite.y = star.y * (fov / z) * app.renderer.screen.width + app.renderer.screen.height / 2;

            const dxCenter = star.sprite.x - app.renderer.screen.width / 2;
            const dyCenter = star.sprite.y - app.renderer.screen.height / 2;
            const distanceCenter = Math.sqrt(dxCenter * dxCenter + dyCenter * dyCenter);
            const distanceScale = Math.max(0, (2000 - z) / 2000);

            star.sprite.scale.x = distanceScale * starBaseSize;
            star.sprite.scale.y
                = distanceScale * starBaseSize
                + (distanceScale * speed * starStretch * distanceCenter) / app.renderer.screen.width;
            star.sprite.rotation = Math.atan2(dyCenter, dxCenter) + Math.PI / 2;
        }
    });
    }
}
