import { Application, Graphics, Text } from "pixi.js";

export class Logger {
    constructor(){
        this.init();
    }
    async init(){
        const app = new Application();
        await app.init({backgroundColor: '0x1099bb', resizeTo: window});
        document.body.appendChild(app.canvas);

        const title = app.stage.addChild(
            new Text({
                text: `Move your mouse slowly over the boxes to
            see the order of pointerenter, pointerleave,
            pointerover, pointerout events on each target!`,
                style: {
                    fontSize: 16,
                },
            }),
        );
        title.x = 2;
        const logs = [];
        const logText = app.stage.addChild(
            new Text({
                text: '',
                style: {
                    fontSize: 14,
                },
            }),
        );
        logText.y = 80;
        logText.x = 2;
        app.stage.name = 'stage';

        const blackBox = app.stage.addChild(new Graphics().rect(0, 0, 400, 400).fill({color: 0}));
        blackBox.name = 'black box';
        blackBox.x = 400;

        const whiteBox = blackBox.addChild(new Graphics().rect(100, 100, 200, 200).fill({ color: 0xffffff }));
        whiteBox.name = 'white box';

        app.stage.eventMode = 'static';
        app.stage.hitArea = app.screen;
        whiteBox.eventMode = 'static';
        blackBox.eventMode = 'static';

        function onEvent(e){
            const type = e.type;
            const targetName = e.targer.name;
            const currentTargetName = e.currentTarget.name;
            
            logs.push(`${currentTargetName} received ${type} event (target is ${targetName})`);

            if (currentTargetName === 'stage' || type === 'pointerenter' || type === 'pointerleave')
            {
                logs.push('-----------------------------------------', '');
            }
    
            if (logs.length > 30)
                {
                    while (logs.length > 30)
                    {
                        logs.shift();
                    }
                }
            logText.text = logs.join('\n');
        }
        [app.stage, whiteBox, blackBox].forEach((object) =>
            {
                object.addEventListener('pointerenter', onEvent);
                object.addEventListener('pointerleave', onEvent);
                object.addEventListener('pointerover', onEvent);
                object.addEventListener('pointerout', onEvent);
            });
    }
}