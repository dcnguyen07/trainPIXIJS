import { Application } from "pixi.js";
import { Container, ContainerPixi } from "./basic/container";
import { transparentBackground } from "./basic/transparentBackground";
import { Tinting } from "./basic/tinting";
import { particleContainer } from "./basic/particleContainer";
import { BlendModes, blendModes } from "./basic/blendModes";
import { Plane } from "./basic/meshPlane";
import { RenderGroup } from "./basic/renderGroup";
import { Slot } from "./advenced/slots";
import { StarWarp } from "./advenced/starWarp";
import { ScratchCard } from "./advenced/scratchCard";
import { MouseTrail } from "./advenced/mouseTrail";
import { Basic } from "./sprite/basic";
import { TextureSwap } from "./sprite/textureSwap";
import { SpriteExplosion } from "./sprite/spriteExplosion";
import { SpriteJet } from "./sprite/spriteJet";
import { SpriteAnimation } from "./sprite/spriteAnimation";
import { TilingSpriteEx } from "./sprite/tilingSprite";
import { Video } from "./sprite/video";
import { PixiText } from "./text/pixiText";
import { BitmapTextEx } from "./text/bitmapText";
import { FromFont } from "./text/fromFont";
import { Simple } from "./graphics/simple";
import { Advanced } from "./graphics/advanced";
import { Dynamic } from "./graphics/dynamic";
import { Svg } from "./graphics/svg";
import { SvgLoad } from "./graphics/svgLoad";
import { TextureEx } from "./graphics/texture";
import { FillGradient, FillGradientEx } from "./graphics/fillGradient";
import { MeshFromPath } from "./graphics/meshFromPath";
import { Click } from "./events/click";
import { Interactivity } from "./events/interactivity";

export class Game {
    static init() {
        // let container = new ContainerPixi();
        // let tB = new transparentBackground();
        // let tinting = new Tinting();
        // let particle = new particleContainer();
        // let blend = new BlendModes();
        // let meshplane = new Plane();
        // let rendergroup = new RenderGroup();
        // let slots = new Slot();
        // let scratch = new ScratchCard();
        // let start = new StarWarp();
        // let mousetrail = new MouseTrail();
        // let basic = new Basic();
        // let textureSwap = new TextureSwap();
        // let sprite = new SpriteExplosion();
        // let spriteJet = new SpriteJet();
        // let spriteAnimation = new SpriteAnimation();
        // let tiling = new TilingSpriteEx();
        // let video = new Video();
        // let pixitext = new PixiText();
        // let bitmap = new BitmapTextEx();
        // let font = new FromFont();
        // let simple = new Simple();
        // let advanced = new Advanced();
        // let dynamic = new Dynamic();
        // let svg = new Svg();
        // let svgload = new SvgLoad();
        // let texture = new TextureEx();
        // let fill = new FillGradientEx();
        // let meshfrom = new MeshFromPath();
        // let click = new Click();
        let interactivity = new Interactivity();


    }
}

window.onload = function () {
    Game.init();
}
