
import { Combine } from "./combine";
import { keyboard } from "./keyboard";

const Application = PIXI.Application;
const Container = PIXI.Container;
const loader = PIXI.loader;
const resources = PIXI.loader.resources;
const TextureCache = PIXI.utils.TextureCache;
const Sprite = PIXI.Sprite;
const Rectangle = PIXI.Rectangle;

// Create a Pixi Application
const app = new Application({
    antialias: true,
    height: 600,
    resolution: 1,
    transparent: false,
    width: 600,
});

document.body.appendChild(app.view);

loader
    .add("atlas.png")
    .load(setup);

let state;
let combine;

function setup() {
    combine = new Combine(app.stage);
    state = play;
    app.ticker.add((delta) => gameLoop(delta));

    const left = keyboard(37);
    const up = keyboard(38);
    const right = keyboard(39);
    const down = keyboard(40);

    left.press = () => {
        combine.velocity.x = -5;
        combine.velocity.y = 0;
    };

    left.release = () => {
        if (!right.isDown && combine.velocity.y === 0) {
            combine.velocity.x = 0;
        }
    };

    up.press = () => {
        combine.velocity.y = -5;
        combine.velocity.x = 0;
    };
    up.release = () => {
        if (!down.isDown && combine.velocity.x === 0) {
            combine.velocity.y = 0;
        }
    };

    right.press = () => {
        combine.velocity.x = 5;
        combine.velocity.y = 0;
    };
    right.release = () => {
        if (!left.isDown && combine.velocity.y === 0) {
            combine.velocity.x = 0;
        }
    };

    down.press = () => {
        combine.velocity.y = 5;
        combine.velocity.x = 0;
    };
    down.release = () => {
        if (!up.isDown && combine.velocity.x === 0) {
            combine.velocity.y = 0;
        }
    };
}

function gameLoop(delta) {
    state(delta);
}

function play(delta) {
    combine.position.x += combine.velocity.x;
    combine.position.y += combine.velocity.y;
    combine.sprite.position.x = combine.position.x;
    combine.sprite.position.y = combine.position.y;
}
