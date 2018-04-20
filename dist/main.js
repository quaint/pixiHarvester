/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/game.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/combine.ts":
/*!************************!*\
  !*** ./src/combine.ts ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var point_1 = __webpack_require__(/*! ./point */ "./src/point.ts");
var Application = PIXI.Application;
var Container = PIXI.Container;
var loader = PIXI.loader;
var resources = PIXI.loader.resources;
var TextureCache = PIXI.utils.TextureCache;
var Sprite = PIXI.Sprite;
var Rectangle = PIXI.Rectangle;
var Combine = /** @class */ (function () {
    function Combine(stage) {
        this.sprite = new PIXI.Sprite();
        this.velocity = new point_1.Point(0, 0);
        this.position = new point_1.Point(0, 0);
        stage.addChild(this.sprite);
        var texture = new PIXI.Texture(TextureCache["atlas.png"]);
        var rectangle = new Rectangle(0, 100, 71, 80);
        texture.frame = rectangle;
        this.sprite.texture = texture;
        this.sprite.position.set(200, 200);
        this.sprite.pivot.set(45, 40);
    }
    return Combine;
}());
exports.Combine = Combine;


/***/ }),

/***/ "./src/game.ts":
/*!*********************!*\
  !*** ./src/game.ts ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var combine_1 = __webpack_require__(/*! ./combine */ "./src/combine.ts");
var keyboard_1 = __webpack_require__(/*! ./keyboard */ "./src/keyboard.ts");
var Application = PIXI.Application;
var Container = PIXI.Container;
var loader = PIXI.loader;
var resources = PIXI.loader.resources;
var TextureCache = PIXI.utils.TextureCache;
var Sprite = PIXI.Sprite;
var Rectangle = PIXI.Rectangle;
// Create a Pixi Application
var app = new Application({
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
var state;
var combine;
function setup() {
    combine = new combine_1.Combine(app.stage);
    state = play;
    app.ticker.add(function (delta) { return gameLoop(delta); });
    var left = keyboard_1.keyboard(37);
    var up = keyboard_1.keyboard(38);
    var right = keyboard_1.keyboard(39);
    var down = keyboard_1.keyboard(40);
    left.press = function () {
        combine.velocity.x = -5;
        combine.velocity.y = 0;
    };
    left.release = function () {
        if (!right.isDown && combine.velocity.y === 0) {
            combine.velocity.x = 0;
        }
    };
    up.press = function () {
        combine.velocity.y = -5;
        combine.velocity.x = 0;
    };
    up.release = function () {
        if (!down.isDown && combine.velocity.x === 0) {
            combine.velocity.y = 0;
        }
    };
    right.press = function () {
        combine.velocity.x = 5;
        combine.velocity.y = 0;
    };
    right.release = function () {
        if (!left.isDown && combine.velocity.y === 0) {
            combine.velocity.x = 0;
        }
    };
    down.press = function () {
        combine.velocity.y = 5;
        combine.velocity.x = 0;
    };
    down.release = function () {
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


/***/ }),

/***/ "./src/keyboard.ts":
/*!*************************!*\
  !*** ./src/keyboard.ts ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Key = /** @class */ (function () {
    function Key() {
        this.isDown = false;
        this.isUp = false;
    }
    return Key;
}());
function keyboard(keyCode) {
    var key = new Key();
    key.code = keyCode;
    key.isDown = false;
    key.isUp = true;
    key.press = undefined;
    key.release = undefined;
    key.downHandler = function (event) {
        if (event.keyCode === key.code) {
            if (key.isUp && key.press) {
                key.press();
            }
            key.isDown = true;
            key.isUp = false;
        }
        event.preventDefault();
    };
    key.upHandler = function (event) {
        if (event.keyCode === key.code) {
            if (key.isDown && key.release) {
                key.release();
            }
            key.isDown = false;
            key.isUp = true;
        }
        event.preventDefault();
    };
    window.addEventListener("keydown", key.downHandler.bind(key), false);
    window.addEventListener("keyup", key.upHandler.bind(key), false);
    return key;
}
exports.keyboard = keyboard;


/***/ }),

/***/ "./src/point.ts":
/*!**********************!*\
  !*** ./src/point.ts ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Point = /** @class */ (function () {
    function Point(x, y) {
        this.x = 0;
        this.y = 0;
        this.x = x;
        this.y = y;
    }
    return Point;
}());
exports.Point = Point;


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbWJpbmUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2dhbWUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2tleWJvYXJkLnRzIiwid2VicGFjazovLy8uL3NyYy9wb2ludC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQSx5REFBaUQsY0FBYztBQUMvRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7O0FBR0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7O0FDbkVBLG1FQUFnQztBQUVoQyxJQUFNLFdBQVcsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDO0FBQ3JDLElBQU0sU0FBUyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUM7QUFDakMsSUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQztBQUMzQixJQUFNLFNBQVMsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQztBQUN4QyxJQUFNLFlBQVksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQztBQUM3QyxJQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDO0FBQzNCLElBQU0sU0FBUyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUM7QUFFakM7SUFNSSxpQkFBWSxLQUFxQjtR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RyxDQUFDLENBQUM7UUFDTixNQUFDLEdBQUcsQ0FBQyxDQUFDO1FBR1QsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDWCxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNmLENBQUM7SUFDTCxZQUFDO0FBQUQsQ0FBQztBQVRZLHNCQUFLIiwiZmlsZSI6Im1haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvZ2FtZS50c1wiKTtcbiIsImltcG9ydCB7IFBvaW50IH0gZnJvbSBcIi4vcG9pbnRcIjtcblxuY29uc3QgQXBwbGljYXRpb24gPSBQSVhJLkFwcGxpY2F0aW9uO1xuY29uc3QgQ29udGFpbmVyID0gUElYSS5Db250YWluZXI7XG5jb25zdCBsb2FkZXIgPSBQSVhJLmxvYWRlcjtcbmNvbnN0IHJlc291cmNlcyA9IFBJWEkubG9hZGVyLnJlc291cmNlcztcbmNvbnN0IFRleHR1cmVDYWNoZSA9IFBJWEkudXRpbHMuVGV4dHVyZUNhY2hlO1xuY29uc3QgU3ByaXRlID0gUElYSS5TcHJpdGU7XG5jb25zdCBSZWN0YW5nbGUgPSBQSVhJLlJlY3RhbmdsZTtcblxuZXhwb3J0IGNsYXNzIENvbWJpbmUge1xuXG4gICAgcHVibGljIHNwcml0ZSA9IG5ldyBQSVhJLlNwcml0ZSgpO1xuICAgIHB1YmxpYyB2ZWxvY2l0eSA9IG5ldyBQb2ludCgwLCAwKTtcbiAgICBwdWJsaWMgcG9zaXRpb24gPSBuZXcgUG9pbnQoMCwgMCk7XG5cbiAgICBjb25zdHJ1Y3RvcihzdGFnZTogUElYSS5Db250YWluZXIpIHtcbiAgICAgICAgc3RhZ2UuYWRkQ2hpbGQodGhpcy5zcHJpdGUpO1xuICAgICAgICBjb25zdCB0ZXh0dXJlID0gbmV3IFBJWEkuVGV4dHVyZShUZXh0dXJlQ2FjaGVbXCJhdGxhcy5wbmdcIl0pO1xuICAgICAgICBjb25zdCByZWN0YW5nbGUgPSBuZXcgUmVjdGFuZ2xlKDAsIDEwMCwgNzEsIDgwKTtcbiAgICAgICAgdGV4dHVyZS5mcmFtZSA9IHJlY3RhbmdsZTtcbiAgICAgICAgdGhpcy5zcHJpdGUudGV4dHVyZSA9IHRleHR1cmU7XG4gICAgICAgIHRoaXMuc3ByaXRlLnBvc2l0aW9uLnNldCgyMDAsIDIwMCk7XG4gICAgICAgIHRoaXMuc3ByaXRlLnBpdm90LnNldCg0NSwgNDApO1xuICAgIH1cbn1cbiIsIlxuaW1wb3J0IHsgQ29tYmluZSB9IGZyb20gXCIuL2NvbWJpbmVcIjtcbmltcG9ydCB7IGtleWJvYXJkIH0gZnJvbSBcIi4va2V5Ym9hcmRcIjtcblxuY29uc3QgQXBwbGljYXRpb24gPSBQSVhJLkFwcGxpY2F0aW9uO1xuY29uc3QgQ29udGFpbmVyID0gUElYSS5Db250YWluZXI7XG5jb25zdCBsb2FkZXIgPSBQSVhJLmxvYWRlcjtcbmNvbnN0IHJlc291cmNlcyA9IFBJWEkubG9hZGVyLnJlc291cmNlcztcbmNvbnN0IFRleHR1cmVDYWNoZSA9IFBJWEkudXRpbHMuVGV4dHVyZUNhY2hlO1xuY29uc3QgU3ByaXRlID0gUElYSS5TcHJpdGU7XG5jb25zdCBSZWN0YW5nbGUgPSBQSVhJLlJlY3RhbmdsZTtcblxuLy8gQ3JlYXRlIGEgUGl4aSBBcHBsaWNhdGlvblxuY29uc3QgYXBwID0gbmV3IEFwcGxpY2F0aW9uKHtcbiAgICBhbnRpYWxpYXM6IHRydWUsXG4gICAgaGVpZ2h0OiA2MDAsXG4gICAgcmVzb2x1dGlvbjogMSxcbiAgICB0cmFuc3BhcmVudDogZmFsc2UsXG4gICAgd2lkdGg6IDYwMCxcbn0pO1xuXG5kb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGFwcC52aWV3KTtcblxubG9hZGVyXG4gICAgLmFkZChcImF0bGFzLnBuZ1wiKVxuICAgIC5sb2FkKHNldHVwKTtcblxubGV0IHN0YXRlO1xubGV0IGNvbWJpbmU7XG5cbmZ1bmN0aW9uIHNldHVwKCkge1xuICAgIGNvbWJpbmUgPSBuZXcgQ29tYmluZShhcHAuc3RhZ2UpO1xuICAgIHN0YXRlID0gcGxheTtcbiAgICBhcHAudGlja2VyLmFkZCgoZGVsdGEpID0+IGdhbWVMb29wKGRlbHRhKSk7XG5cbiAgICBjb25zdCBsZWZ0ID0ga2V5Ym9hcmQoMzcpO1xuICAgIGNvbnN0IHVwID0ga2V5Ym9hcmQoMzgpO1xuICAgIGNvbnN0IHJpZ2h0ID0ga2V5Ym9hcmQoMzkpO1xuICAgIGNvbnN0IGRvd24gPSBrZXlib2FyZCg0MCk7XG5cbiAgICBsZWZ0LnByZXNzID0gKCkgPT4ge1xuICAgICAgICBjb21iaW5lLnZlbG9jaXR5LnggPSAtNTtcbiAgICAgICAgY29tYmluZS52ZWxvY2l0eS55ID0gMDtcbiAgICB9O1xuXG4gICAgbGVmdC5yZWxlYXNlID0gKCkgPT4ge1xuICAgICAgICBpZiAoIXJpZ2h0LmlzRG93biAmJiBjb21iaW5lLnZlbG9jaXR5LnkgPT09IDApIHtcbiAgICAgICAgICAgIGNvbWJpbmUudmVsb2NpdHkueCA9IDA7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgdXAucHJlc3MgPSAoKSA9PiB7XG4gICAgICAgIGNvbWJpbmUudmVsb2NpdHkueSA9IC01O1xuICAgICAgICBjb21iaW5lLnZlbG9jaXR5LnggPSAwO1xuICAgIH07XG4gICAgdXAucmVsZWFzZSA9ICgpID0+IHtcbiAgICAgICAgaWYgKCFkb3duLmlzRG93biAmJiBjb21iaW5lLnZlbG9jaXR5LnggPT09IDApIHtcbiAgICAgICAgICAgIGNvbWJpbmUudmVsb2NpdHkueSA9IDA7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgcmlnaHQucHJlc3MgPSAoKSA9PiB7XG4gICAgICAgIGNvbWJpbmUudmVsb2NpdHkueCA9IDU7XG4gICAgICAgIGNvbWJpbmUudmVsb2NpdHkueSA9IDA7XG4gICAgfTtcbiAgICByaWdodC5yZWxlYXNlID0gKCkgPT4ge1xuICAgICAgICBpZiAoIWxlZnQuaXNEb3duICYmIGNvbWJpbmUudmVsb2NpdHkueSA9PT0gMCkge1xuICAgICAgICAgICAgY29tYmluZS52ZWxvY2l0eS54ID0gMDtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICBkb3duLnByZXNzID0gKCkgPT4ge1xuICAgICAgICBjb21iaW5lLnZlbG9jaXR5LnkgPSA1O1xuICAgICAgICBjb21iaW5lLnZlbG9jaXR5LnggPSAwO1xuICAgIH07XG4gICAgZG93bi5yZWxlYXNlID0gKCkgPT4ge1xuICAgICAgICBpZiAoIXVwLmlzRG93biAmJiBjb21iaW5lLnZlbG9jaXR5LnggPT09IDApIHtcbiAgICAgICAgICAgIGNvbWJpbmUudmVsb2NpdHkueSA9IDA7XG4gICAgICAgIH1cbiAgICB9O1xufVxuXG5mdW5jdGlvbiBnYW1lTG9vcChkZWx0YSkge1xuICAgIHN0YXRlKGRlbHRhKTtcbn1cblxuZnVuY3Rpb24gcGxheShkZWx0YSkge1xuICAgIGNvbWJpbmUucG9zaXRpb24ueCArPSBjb21iaW5lLnZlbG9jaXR5Lng7XG4gICAgY29tYmluZS5wb3NpdGlvbi55ICs9IGNvbWJpbmUudmVsb2NpdHkueTtcbiAgICBjb21iaW5lLnNwcml0ZS5wb3NpdGlvbi54ID0gY29tYmluZS5wb3NpdGlvbi54O1xuICAgIGNvbWJpbmUuc3ByaXRlLnBvc2l0aW9uLnkgPSBjb21iaW5lLnBvc2l0aW9uLnk7XG59XG4iLCJjbGFzcyBLZXkge1xuICAgIHB1YmxpYyBjb2RlO1xuICAgIHB1YmxpYyBpc0Rvd24gPSBmYWxzZTtcbiAgICBwdWJsaWMgaXNVcCA9IGZhbHNlO1xuICAgIHB1YmxpYyBwcmVzcztcbiAgICBwdWJsaWMgcmVsZWFzZTtcbiAgICBwdWJsaWMgZG93bkhhbmRsZXI7XG4gICAgcHVibGljIHVwSGFuZGxlcjtcbn1cbmV4cG9ydCBmdW5jdGlvbiBrZXlib2FyZChrZXlDb2RlKSB7XG4gICAgY29uc3Qga2V5ID0gbmV3IEtleSgpO1xuICAgIGtleS5jb2RlID0ga2V5Q29kZTtcbiAgICBrZXkuaXNEb3duID0gZmFsc2U7XG4gICAga2V5LmlzVXAgPSB0cnVlO1xuICAgIGtleS5wcmVzcyA9IHVuZGVmaW5lZDtcbiAgICBrZXkucmVsZWFzZSA9IHVuZGVmaW5lZDtcbiAgICBrZXkuZG93bkhhbmRsZXIgPSAoZXZlbnQpID0+IHtcbiAgICAgICAgaWYgKGV2ZW50LmtleUNvZGUgPT09IGtleS5jb2RlKSB7XG4gICAgICAgICAgICBpZiAoa2V5LmlzVXAgJiYga2V5LnByZXNzKSB7XG4gICAgICAgICAgICAgICAga2V5LnByZXNzKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBrZXkuaXNEb3duID0gdHJ1ZTtcbiAgICAgICAgICAgIGtleS5pc1VwID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICB9O1xuXG4gICAga2V5LnVwSGFuZGxlciA9IChldmVudCkgPT4ge1xuICAgICAgICBpZiAoZXZlbnQua2V5Q29kZSA9PT0ga2V5LmNvZGUpIHtcbiAgICAgICAgICAgIGlmIChrZXkuaXNEb3duICYmIGtleS5yZWxlYXNlKSB7XG4gICAgICAgICAgICAgICAga2V5LnJlbGVhc2UoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGtleS5pc0Rvd24gPSBmYWxzZTtcbiAgICAgICAgICAgIGtleS5pc1VwID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH07XG5cbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcImtleWRvd25cIiwga2V5LmRvd25IYW5kbGVyLmJpbmQoa2V5KSwgZmFsc2UpO1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwia2V5dXBcIiwga2V5LnVwSGFuZGxlci5iaW5kKGtleSksIGZhbHNlKTtcblxuICAgIHJldHVybiBrZXk7XG59XG4iLCJleHBvcnQgY2xhc3MgUG9pbnQge1xuXG4gICAgcHVibGljIHggPSAwO1xuICAgIHB1YmxpYyB5ID0gMDtcblxuICAgIGNvbnN0cnVjdG9yKHg6IG51bWJlciwgeTogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMueCA9IHg7XG4gICAgICAgIHRoaXMueSA9IHk7XG4gICAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIifQ==