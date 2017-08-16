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
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
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
/******/ 	__webpack_require__.p = "/dist/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Aqu = function () {
    function Aqu(options) {
        _classCallCheck(this, Aqu);

        this.options = Object.assign({
            canvas: null,
            color: '#6CA6CD',
            lineWidth: 14,
            alpha: 0.8,
            num: 80
        }, options);
        this.ctx = this.options.canvas.getContext('2d');
        this.startPoint = [];
        this.endPointY = [];
        this.amp = [];
        this.start = 0;
        this.lastTime = +new Date();
        this.init();
    }

    _createClass(Aqu, [{
        key: 'init',
        value: function init() {
            var o = this.options;
            var i = 0;
            while (i < o.num) {
                this.startPoint[i] = Math.random() * 20 + i * 10;
                this.endPointY[i] = o.canvas.height * 0.6 - Math.random() * 50;
                this.amp[i] = Math.random() * 10 + 40;
                i++;
            }
            this.draw();
        }
    }, {
        key: 'draw',
        value: function draw() {
            var self = this;
            var temp = +new Date();
            var gap = temp - self.lastTime;
            self.lastTime = temp;
            self.clear();
            self.doDraw(gap);
            requestAnimationFrame(function () {
                self.draw();
            });
        }
    }, {
        key: 'doDraw',
        value: function doDraw(gap) {
            var o = this.options,
                canvas = o.canvas;
            var ctx = this.ctx;
            ctx.save();
            ctx.lineWidth = o.lineWidth;
            ctx.strokeStyle = o.color;
            ctx.globalAlpha = o.alpha;
            ctx.lineCap = 'round';
            var i = 0;
            this.start += gap * 0.001;
            var l = Math.sin(this.start);
            while (i < o.num) {
                ctx.beginPath();
                ctx.moveTo(this.startPoint[i], canvas.height);
                var endX = this.startPoint[i] + this.amp[i] * l;
                ctx.quadraticCurveTo(this.startPoint[i], canvas.height - 120, endX, this.endPointY[i]);
                ctx.stroke();
                ctx.closePath();
                i++;
            }
            ctx.restore();
        }
    }, {
        key: 'clear',
        value: function clear() {
            var o = this.options,
                canvas = o.canvas;
            var ctx = this.ctx;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
    }]);

    return Aqu;
}();

/* harmony default export */ __webpack_exports__["a"] = (Aqu);

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Ball = function () {
    function Ball(options) {
        _classCallCheck(this, Ball);

        this.options = Object.assign({
            canvas: null,
            color: '#B22222',
            r: 100,
            max: 50
        }, options);
        this.ctx = this.options.canvas.getContext('2d');
        this.lastTime = +new Date();
        this.start = 0;
        this.init();
    }

    _createClass(Ball, [{
        key: 'init',
        value: function init() {
            var self = this;
            var temp = +new Date();
            var gap = temp - this.lastTime;
            this.lastTime = temp;
            this.clear();
            self.draw(gap);
            requestAnimationFrame(function () {
                self.init(gap);
            });
        }
    }, {
        key: 'draw',
        value: function draw(gap) {
            var o = this.options,
                r = o.r,
                max = o.max;
            var ctx = this.ctx;
            ctx.save();
            ctx.beginPath();
            ctx.fillStyle = o.color;
            this.start += gap * 0.002;
            var l = Math.sin(this.start);
            ctx.arc(200, 200, r + max * l, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
        }
    }, {
        key: 'clear',
        value: function clear() {
            var o = this.options,
                canvas = o.canvas;
            var ctx = this.ctx;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
    }]);

    return Ball;
}();

/* harmony default export */ __webpack_exports__["a"] = (Ball);

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__base_utils__ = __webpack_require__(4);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }



var Ball3D = function () {
    function Ball3D(options) {
        _classCallCheck(this, Ball3D);

        this.options = Object.assign({
            canvas: null,
            r: 5,
            num: 200,
            gravity: 0.2,
            bounce: -0.5
        }, options);
        var canvas = this.options.canvas;

        this.ctx = canvas.getContext('2d');
        this.floor = canvas.height / 2;
        this.zFloor = canvas.height * 0.7;
        this.vx = canvas.width / 2;
        this.vy = canvas.height / 2;
        this.init();
        this.draw();
    }

    _createClass(Ball3D, [{
        key: 'init',
        value: function init() {
            var o = this.options;
            this.balls = [];
            var i = 0;

            while (i < o.num) {
                var ball = {
                    x: 0,
                    y: 0,
                    z: 0,
                    xpos: 0,
                    ypos: -100,
                    zpos: 0,
                    vx: Math.random() * 10 - 5,
                    vy: Math.random() * 10 - 5,
                    vz: Math.random() * 10 - 5,
                    scaleX: 1,
                    scaleY: 1,
                    color: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__base_utils__["a" /* parseColor */])(Math.random() * 0xffffff)
                };
                this.balls.push(ball);
                i++;
            }
        }
    }, {
        key: 'draw',
        value: function draw() {
            var balls = this.balls;

            var self = this,
                o = this.options;
            this.clear();
            balls.map(function (ball, index) {
                ball.vy += o.gravity;
                ball.xpos += ball.vx;
                ball.ypos += ball.vy;
                ball.zpos += ball.vz;
                if (ball.ypos > self.floor) {
                    ball.ypos = self.floor;
                    ball.vy *= o.bounce;
                }
                if (ball.zpos > -self.zFloor) {
                    var scale = self.zFloor / (self.zFloor + ball.zpos);
                    ball.scaleX = scale;
                    ball.scaleY = scale;
                    ball.x = self.vx + ball.xpos * scale;
                    ball.y = self.vy + ball.ypos * scale;
                    self.drawBall(ball);
                } else {
                    balls.splice(index, 1);
                }
            });
            requestAnimationFrame(function () {
                if (balls.length < o.num * 0.6) {
                    self.init();
                }
                self.draw();
            });
        }
    }, {
        key: 'drawBall',
        value: function drawBall(ball) {
            var o = this.options;
            var ctx = this.ctx;

            ctx.save();
            ctx.translate(ball.x, ball.y);
            ctx.scale(ball.scaleX, ball.scaleY);
            ctx.fillStyle = ball.color;
            ctx.beginPath();
            ctx.arc(0, 0, o.r, 0, Math.PI * 2);
            ctx.fill();
            ctx.closePath();
            ctx.restore();
        }
    }, {
        key: 'clear',
        value: function clear() {
            var canvas = this.options.canvas;
            var ctx = this.ctx;

            ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
    }]);

    return Ball3D;
}();

/* harmony default export */ __webpack_exports__["a"] = (Ball3D);

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var CircleProgress = function () {
    function CircleProgress(options) {
        _classCallCheck(this, CircleProgress);

        this.options = Object.assign({
            canvas: null,
            r: 100,
            color: '#FFF0F5',
            deep: '#FF6EB4',
            step: Math.PI * 2 / 100,
            lineWidth: 12,
            x: 200,
            y: 200,
            amp: 0.2
        }, options);
        this.ctx = this.options.canvas.getContext('2d');
        this.start = 0;
        this.init();
    }

    _createClass(CircleProgress, [{
        key: 'init',
        value: function init() {
            var o = this.options,
                self = this;
            if (this.start > 100) {
                this.start = 0;
            }
            this.start += o.amp;
            this.clear();
            this.draw();
            this.draw({
                color: o.deep,
                step: this.start
            });
            requestAnimationFrame(function () {
                self.init();
            });
        }
    }, {
        key: 'draw',
        value: function draw(opt) {
            var o = this.options;
            opt = Object.assign({
                color: o.color,
                lineWidth: 14,
                step: 100
            }, opt);
            var ctx = this.ctx;
            ctx.save();
            ctx.beginPath();
            ctx.strokeStyle = opt.color;
            ctx.lineWidth = opt.lineWidth;
            ctx.arc(o.x, o.y, o.r, -Math.PI / 2, -Math.PI / 2 + opt.step * o.step);
            ctx.stroke();
            ctx.closePath();
            ctx.restore();
        }
    }, {
        key: 'clear',
        value: function clear() {
            var ctx = this.ctx;
            var canvas = this.options.canvas;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
    }]);

    return CircleProgress;
}();

/* harmony default export */ __webpack_exports__["a"] = (CircleProgress);

/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = parseColor;
function parseColor(color, toNumber) {
    if (toNumber === true) {
        if (typeof color === 'number') {
            return color | 0; //chop off decimal
        }
        if (typeof color === 'string' && color[0] === '#') {
            color = color.slice(1);
        }
        return parseInt(color, 16);
    } else {
        if (typeof color === 'number') {
            color = '#' + ('00000' + (color | 0).toString(16)).substr(-6); //pad
        }
        return color;
    }
};

/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__component_CircleProgress__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__component_Aqu__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__component_Ball__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__component_Ball3D__ = __webpack_require__(2);





var circleCanvas = document.getElementById('progress-demo');
var aquCanvas = document.getElementById('aqu-demo');
var ballCanvas = document.getElementById('ball-demo');
var ball3dCanvas = document.getElementById('ball3d-demo');

new __WEBPACK_IMPORTED_MODULE_0__component_CircleProgress__["a" /* default */]({
    canvas: circleCanvas
});

new __WEBPACK_IMPORTED_MODULE_1__component_Aqu__["a" /* default */]({
    canvas: aquCanvas
});

new __WEBPACK_IMPORTED_MODULE_2__component_Ball__["a" /* default */]({
    canvas: ballCanvas
});

new __WEBPACK_IMPORTED_MODULE_3__component_Ball3D__["a" /* default */]({
    canvas: ball3dCanvas
});

/***/ })
/******/ ]);