import { Point } from "./point";

const Application = PIXI.Application;
const Container = PIXI.Container;
const loader = PIXI.loader;
const resources = PIXI.loader.resources;
const TextureCache = PIXI.utils.TextureCache;
const Sprite = PIXI.Sprite;
const Rectangle = PIXI.Rectangle;

export class Combine {

    public sprite = new PIXI.Sprite();
    public velocity = new Point(0, 0);
    public position = new Point(0, 0);

    constructor(stage: PIXI.Container) {
        stage.addChild(this.sprite);
        const texture = new PIXI.Texture(TextureCache["atlas.png"]);
        const rectangle = new Rectangle(0, 100, 71, 80);
        texture.frame = rectangle;
        this.sprite.texture = texture;
        this.sprite.position.set(200, 200);
        this.sprite.pivot.set(45, 40);
    }
}
