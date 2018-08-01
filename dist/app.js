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
/******/ 	return __webpack_require__(__webpack_require__.s = 10);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = raf;
function raf() {
    "use strict";

    var vendors = ['webkit', 'moz'];
    for (var i = 0; i < vendors.length && !window.requestAnimationFrame; ++i) {
        var vp = vendors[i];
        window.requestAnimationFrame = window[vp + 'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vp + 'CancelAnimationFrame'] || window[vp + 'CancelRequestAnimationFrame'];
    }
    if (/iP(ad|hone|od).*OS 6/.test(window.navigator.userAgent) // iOS6 is buggy
    || !window.requestAnimationFrame || !window.cancelAnimationFrame) {
        var lastTime = 0;
        window.requestAnimationFrame = function (callback) {
            var now = Date.now();
            var nextTime = Math.max(lastTime + 16, now);
            return setTimeout(function () {
                callback(lastTime = nextTime);
            }, nextTime - now);
        };
        window.cancelAnimationFrame = clearTimeout;
    }
}

/***/ }),
/* 1 */
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
/* 2 */
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
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__base_utils__ = __webpack_require__(11);
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
/* 4 */
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
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Flower = function () {
    function Flower(options) {
        _classCallCheck(this, Flower);

        this.options = Object.assign({
            canvas: null,
            color: '#f90003',
            r: 10
        }, options);
        var canvas = this.options.canvas;

        var width = canvas.width,
            height = canvas.height;
        this.ctx = this.options.canvas.getContext('2d');
        var ctx = this.ctx;
        if (window.devicePixelRatio) {
            canvas.style.width = width + "px";
            canvas.style.height = height + "px";
            canvas.height = height * window.devicePixelRatio;
            canvas.width = width * window.devicePixelRatio;
            ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
        }

        this.init();
    }

    _createClass(Flower, [{
        key: 'init',
        value: function init() {
            for (var i = -10; i <= 180; i++) {
                if (i % 10 === 0) {
                    this.draw(i, 180, '#3c00a9', '#2b117f', 0.6);
                }
            }
            for (var _i = -10; _i <= 180; _i++) {
                if (_i % 10 === 0) {
                    this.draw(_i, 150);
                }
            }
            for (var _i2 = -10; _i2 <= 180; _i2++) {
                if (_i2 % 10 === 0) {
                    this.draw(_i2, 120);
                }
            }

            this.drawLine(20, 180, 60, 160);

            this.drawLine(140, 220, 180, 230);

            this.drawLine(130, 160, 150, 180);

            this.drawLine(80, 210, 100, 230);
        }
    }, {
        key: 'draw',
        value: function draw(rotate) {
            var len = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 180;
            var lineColor = arguments[2];
            var fillColor = arguments[3];
            var alpha = arguments[4];
            var ctx = this.ctx;

            var o = this.options;
            ctx.save();
            ctx.beginPath();
            ctx.translate(200, 200);
            ctx.rotate(rotate * Math.PI / 170);

            var lineGrd = ctx.createLinearGradient(0, 0, 0, -len);
            lineGrd.addColorStop(0, "#000");
            lineGrd.addColorStop(1, lineColor || '#f10000');

            ctx.strokeStyle = lineGrd;
            ctx.lineWidth = 1;
            ctx.lineCap = 'round';
            ctx.moveTo(0, 0);
            var x = len * 0.25;
            var y = len * 1.2;

            ctx.bezierCurveTo(-x, -y, x, -y, 0, 0);
            ctx.stroke();
            ctx.globalAlpha = alpha || 0.4;

            var grd = ctx.createLinearGradient(0, 0, 0, -len);
            grd.addColorStop(0, "#000");
            grd.addColorStop(0.6, fillColor || '#f10000');
            grd.addColorStop(1, fillColor || '#f10000');

            ctx.fillStyle = grd;
            ctx.fill();
            ctx.closePath();
            ctx.restore();
        }
    }, {
        key: 'drawLine',
        value: function drawLine(x, y, gx, gy) {
            var ctx = this.ctx;

            var o = this.options;
            ctx.save();
            ctx.beginPath();
            ctx.lineWidth = 1;
            ctx.globalAlpha = 0.7;
            var grd = ctx.createLinearGradient(200, 200, x, y);
            grd.addColorStop(0, "#000");
            grd.addColorStop(0.8, '#f10000');
            grd.addColorStop(1, '#000');

            ctx.strokeStyle = grd;
            ctx.moveTo(199, 199);
            ctx.quadraticCurveTo(gx, gy, x, y);

            ctx.stroke();
            ctx.closePath();

            ctx.restore();

            this.drawArc(x, y);
        }
    }, {
        key: 'drawArc',
        value: function drawArc(x, y) {
            var ctx = this.ctx;

            ctx.save();
            ctx.beginPath();

            ctx.shadowColor = "red";
            ctx.arc(x, y, 10, 0, Math.PI * 2);

            var grd = ctx.createRadialGradient(x, y, 1, x, y, 10);
            grd.addColorStop(0, "#f10000");
            grd.addColorStop(1, "#000");

            ctx.fillStyle = grd;

            ctx.fill();
            ctx.closePath();

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

    return Flower;
}();

/* harmony default export */ __webpack_exports__["a"] = (Flower);

/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var FlowerOcean = function () {
    function FlowerOcean(options) {
        _classCallCheck(this, FlowerOcean);

        this.options = Object.assign({
            canvas: null,
            color: '#f90003',
            r: 10
        }, options);
        var canvas = this.options.canvas;

        var width = canvas.width,
            height = canvas.height;
        this.ctx = this.options.canvas.getContext('2d');
        var ctx = this.ctx;
        if (window.devicePixelRatio) {
            canvas.style.width = width + "px";
            canvas.style.height = height + "px";
            canvas.height = height * window.devicePixelRatio;
            canvas.width = width * window.devicePixelRatio;
            ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
        }

        this.init();
    }

    _createClass(FlowerOcean, [{
        key: 'init',
        value: function init() {

            this.drawFlower(-10, 200, 40, 220);
            this.drawFlower(-30, 160, 200, 200);

            this.drawFlower(-70, 90, 400, 100);

            this.drawFlower(-110, 120, 500, 180);

            this.drawFlower(0, 130, 700, 160);

            this.drawArc(350, 220);

            this.drawArc(460, 240);

            this.drawArc(570, 100);

            this.drawArc(650, 90);
            // this.drawLine(20, 180, 60, 160);
            //
            // this.drawLine(140, 220, 180, 230);
            //
            // this.drawLine(130, 160, 150, 180);
            //
            // this.drawLine(80, 210, 100, 230);
        }
    }, {
        key: 'drawFlower',
        value: function drawFlower(start, len, baseX, baseY) {
            var canvas = this.options.canvas;

            for (var i = 0; i <= 120; i++) {
                if (i % 10 === 0) {
                    this.draw(i, len, start, baseX, baseY);
                }
            }
            for (var _i = 0; _i <= 120; _i++) {
                if (_i % 10 === 0) {
                    this.draw(_i, len - 30, start, baseX, baseY);
                }
            }
            var endX = void 0;
            if (Math.random() * 10 - 5 > 0) {
                endX = baseX - 50;
            } else {
                endX = baseX + 50;
            }
            var endY = canvas.height - len;

            this.drawLine(baseX, baseY, endX, endY, endX + Math.random() * 20 + 20, baseY + Math.random() * 20 + 20);
        }
    }, {
        key: 'draw',
        value: function draw(rotate, len, start, baseX, baseY) {
            var ctx = this.ctx;

            ctx.save();
            ctx.beginPath();
            ctx.translate(baseX, baseY);
            ctx.rotate((rotate + start) * Math.PI / 180);
            ctx.lineWidth = 1;
            ctx.lineCap = 'round';
            ctx.moveTo(0, 0);
            var x = len * 0.3;
            var y = len * 1.2;

            ctx.globalAlpha = 0.7;
            var grd = ctx.createLinearGradient(0, 0, 0, -len);
            grd.addColorStop(0, "#000");
            grd.addColorStop(1, '#f10000');

            ctx.strokeStyle = grd;

            ctx.bezierCurveTo(-x, -y, x, -y, 0, 0);

            ctx.stroke();

            var grd2 = ctx.createLinearGradient(0, 0, 0, -len);
            grd2.addColorStop(0, "#000");
            grd2.addColorStop(0.6, '#f10000');
            grd2.addColorStop(1, '#f10000');

            ctx.fillStyle = grd2;
            ctx.fill();
            ctx.closePath();
            ctx.restore();
        }
    }, {
        key: 'drawLine',
        value: function drawLine(sx, sy, x, y, gx, gy) {
            var ctx = this.ctx;

            ctx.save();
            ctx.beginPath();
            ctx.lineWidth = 1;
            ctx.globalAlpha = 0.7;
            var grd = ctx.createLinearGradient(sx, sy, x, y);
            grd.addColorStop(0, "#000");
            grd.addColorStop(0.2, '#f10000');
            grd.addColorStop(1, '#000');

            ctx.strokeStyle = grd;
            ctx.moveTo(sx - 1, sy - 1);
            ctx.quadraticCurveTo(gx, gy, x, y);

            ctx.stroke();
            ctx.closePath();

            ctx.restore();
        }
    }, {
        key: 'drawArc',
        value: function drawArc(x, y) {
            var ctx = this.ctx;

            ctx.save();
            ctx.beginPath();

            ctx.arc(x, y, 10, 0, Math.PI * 2);

            var grd = ctx.createRadialGradient(x, y, 1, x, y, 10);
            grd.addColorStop(0, "#f10000");
            grd.addColorStop(1, "#000");

            ctx.fillStyle = grd;

            ctx.fill();
            ctx.closePath();

            ctx.restore();

            var canvas = this.options.canvas;

            var endX = void 0;
            if (Math.random() * 10 - 5 > 0) {
                endX = x - 50;
            } else {
                endX = x + 50;
            }
            var endY = canvas.height;

            this.drawLine(x + 10, y, endX, endY, endX + Math.random() * 20 + 20, y + Math.random() * 20 + 20);
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

    return FlowerOcean;
}();

/* harmony default export */ __webpack_exports__["a"] = (FlowerOcean);

/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Les = function () {
    function Les(options) {
        _classCallCheck(this, Les);

        this.options = Object.assign({
            canvas: null,
            color: '#f90003',
            r: 10
        }, options);
        var canvas = this.options.canvas;

        var width = canvas.width,
            height = canvas.height;
        this.ctx = this.options.canvas.getContext('2d');
        var ctx = this.ctx;
        if (window.devicePixelRatio) {
            canvas.style.width = width + "px";
            canvas.style.height = height + "px";
            canvas.height = height * window.devicePixelRatio;
            canvas.width = width * window.devicePixelRatio;
            ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
        }

        this.init();
    }

    _createClass(Les, [{
        key: 'init',
        value: function init() {
            var x = 200,
                y = 200;
            for (var i = 0; i < 360; i++) {
                if (i % 45 === 0) {
                    //this.drawRui(x, y, i);
                    this.drawBan(x, y - 40, 50, i);
                    this.drawBan(x, y - 40, 50, i, false);
                    this.drawLine(x, y - 40, 50, i);
                }
            }
        }
    }, {
        key: 'drawBan',
        value: function drawBan(x, y, len, rotate) {
            var left = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : true;
            var ctx = this.ctx;

            ctx.save();
            ctx.beginPath();

            ctx.translate(x, y);
            ctx.rotate(rotate * Math.PI * 2 / 360);
            ctx.moveTo(0, 0);
            if (left) {
                ctx.lineTo(-len / 3, -len / 2);
            } else {
                ctx.lineTo(len / 3, -len / 2);
            }

            ctx.lineTo(0, -len);

            var grd = ctx.createLinearGradient(0, -len, 0, 0);

            grd.addColorStop(0, '#fff');
            grd.addColorStop(0.2, '#141820');
            grd.addColorStop(1, '#000');

            ctx.fillStyle = grd;
            ctx.fill();

            ctx.closePath();
            ctx.restore();
        }
    }, {
        key: 'drawLine',
        value: function drawLine(x, y, len, rotate) {
            var ctx = this.ctx;


            ctx.save();
            ctx.beginPath();

            ctx.translate(x, y);
            ctx.rotate(rotate * Math.PI * 2 / 360);

            ctx.moveTo(0, -len);
            ctx.lineTo(0, 0);
            ctx.lineWidth = 1;

            var grd = ctx.createLinearGradient(0, -len, 0, 0);

            grd.addColorStop(0, '#fff');
            grd.addColorStop(1, '#141820');

            ctx.strokeStyle = grd;

            ctx.stroke();

            ctx.closePath();
            ctx.restore();
        }
    }, {
        key: 'drawRui',
        value: function drawRui(x, y, rotate) {
            var ctx = this.ctx;

            ctx.save();
            ctx.beginPath();
            ctx.translate(x, y);
            ctx.rotate(rotate * Math.PI * 2 / 360);
            ctx.moveTo(-1.5, 0);
            ctx.lineTo(1.5, 0);
            ctx.lineTo(0, -10);
            var grd = ctx.createLinearGradient(0, 0, 0, -10);
            grd.addColorStop(0, '#fff');
            grd.addColorStop(1, '#000');

            ctx.fillStyle = grd;
            ctx.fill();

            ctx.closePath();
            ctx.restore();
        }
    }, {
        key: 'drawArc',
        value: function drawArc(x, y) {}
    }, {
        key: 'clear',
        value: function clear() {
            var o = this.options,
                canvas = o.canvas;
            var ctx = this.ctx;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
    }]);

    return Les;
}();

/* harmony default export */ __webpack_exports__["a"] = (Les);

/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Sky = function () {
    function Sky(options) {
        _classCallCheck(this, Sky);

        this.options = Object.assign({
            canvas: null
        }, options);
        this.ctx = this.options.canvas.getContext('2d');
        this.init();
    }

    _createClass(Sky, [{
        key: 'createStar',
        value: function createStar() {
            return {
                x: parseInt(Math.random() * 1440),
                y: parseInt(Math.random() * 200 + 400),
                floor: 50 + Math.random() * 50
            };
        }
    }, {
        key: 'init',
        value: function init() {
            this.drawBg();
            //this.drawEarth();
        }
    }, {
        key: 'drawBg',
        value: function drawBg() {
            var ctx = this.ctx,
                canvas = this.options.canvas;
            ctx.save();
            ctx.beginPath();

            var grd = ctx.createLinearGradient(canvas.width, canvas.height / 2, 0, canvas.height / 2);
            grd.addColorStop(0, '#5e1c38');
            grd.addColorStop(0.5, '#fff');
            grd.addColorStop(1, '#5e1c38');

            ctx.globalAlpha = 0.7;
            ctx.fillStyle = grd;
            ctx.rect(0, 0, canvas.width, canvas.height);
            ctx.fill();

            ctx.closePath();
            ctx.restore();
        }
    }, {
        key: 'drawEarth',
        value: function drawEarth() {
            var ctx = this.ctx,
                canvas = this.options.canvas;
            ctx.save();
            ctx.beginPath();
            ctx.arc(canvas.width / 2, canvas.height * 1.5, 500, 0, Math.PI * 2);

            var grd = ctx.createLinearGradient(canvas.width / 2, canvas.height * 1.5, canvas.width / 2, 0);
            grd.addColorStop(0, '#000');
            grd.addColorStop(1, '#fff');
            ctx.fillStyle = grd;
            ctx.fill();
            ctx.closePath();
            ctx.restore();
        }
    }, {
        key: 'drawStar',
        value: function drawStar(x, y, len) {
            var rotate = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
            var ctx = this.ctx;

            ctx.save();
            ctx.beginPath();

            ctx.translate(x, y + len);
            ctx.rotate(rotate * Math.PI / 180);

            var grd = ctx.createLinearGradient(0, 0, 0, -len);
            grd.addColorStop(0, '#fff');
            grd.addColorStop(0.5, '#554746');
            grd.addColorStop(1, '#fff');

            ctx.moveTo(0, -len);
            ctx.arc(0, -len, len, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 / 360 * 2);

            ctx.lineTo(0, 0);
            ctx.fillStyle = grd;
            ctx.fill();

            ctx.closePath();
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

    return Sky;
}();

/* harmony default export */ __webpack_exports__["a"] = (Sky);

/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Table = function () {
    function Table(options) {
        _classCallCheck(this, Table);

        this.options = Object.assign({
            rowWidth: 100,
            colHeight: 25,
            rows: 18,
            cols: 9,
            lineColor: "#ccc"
        }, options);
        var canvas = this.options.canvas;

        var width = canvas.width,
            height = canvas.height;
        this.ctx = this.options.canvas.getContext('2d');
        var ctx = this.ctx;
        if (window.devicePixelRatio) {
            canvas.style.width = width + "px";
            canvas.style.height = height + "px";
            canvas.height = height * window.devicePixelRatio;
            canvas.width = width * window.devicePixelRatio;
            ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
        }
        this.ctx = this.options.canvas.getContext('2d');
        this.cell = {};
        this.init();
        this.bindEvent();
    }

    _createClass(Table, [{
        key: "init",
        value: function init() {
            var o = this.options;
            var w = o.rowWidth;
            var h = o.colHeight;
            var rows = o.rows;
            var cols = o.cols;
            var y = 0;
            for (var row = 0; row < rows; row++) {
                var x = 0;
                for (var col = 0; col < cols; col++) {
                    var cellKey = row + ":" + col;
                    var p = {
                        x: x,
                        y: y
                    };
                    this.cell[cellKey] = p;
                    this.drawCell(p);
                    x += w;
                }
                y += h;
            }
            this.drawLine([0, h * rows], [0, 0], [w * cols, 0]);
        }
    }, {
        key: "drawCell",
        value: function drawCell(sp) {
            var o = this.options;
            var w = o.rowWidth;
            var h = o.colHeight;
            this.drawLine([sp.x, sp.y + h], [sp.x + w, sp.y + h], [sp.x + w, sp.y]);
        }
    }, {
        key: "drawLine",
        value: function drawLine(sp, ep, epp) {
            var ctx = this.ctx;
            ctx.save();
            ctx.beginPath();
            ctx.strokeStyle = this.options.lineColor;
            ctx.lineWidth = 0.5;
            ctx.moveTo(sp[0], sp[1]);
            ctx.lineTo(ep[0], ep[1]);
            ctx.lineTo(epp[0], epp[1]);
            ctx.stroke();
            ctx.closePath();
            ctx.restore();
        }
    }, {
        key: "bindEvent",
        value: function bindEvent() {
            var _this = this;

            var w = this.options.rowWidth;
            var h = this.options.colHeight;
            var canvas = this.options.canvas;
            var offset = {
                left: canvas.offsetLeft,
                top: canvas.offsetTop
            };
            canvas.addEventListener('mousedown', function (e) {
                var point = [e.pageX - offset.left, e.pageY - offset.top];
                var row = parseInt(point[0] / w);
                var col = parseInt(point[1] / h);
                console.log(_this.cell[row + ":" + col]);
            });
        }
    }, {
        key: "clear",
        value: function clear() {
            var ctx = this.ctx;
            var canvas = this.options.canvas;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
    }]);

    return Table;
}();

/* harmony default export */ __webpack_exports__["a"] = (Table);

/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__base_base__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__component_CircleProgress__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__component_Aqu__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__component_Ball__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__component_Ball3D__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__component_Flower__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__component_FlowerOcean__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__component_Les__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__component_Sky__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__component_Table__ = __webpack_require__(9);













__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__base_base__["a" /* raf */])();

switch (window.dpPage) {
    case 'index':
        var circleCanvas = document.getElementById('progress-demo');
        var aquCanvas = document.getElementById('aqu-demo');
        var ballCanvas = document.getElementById('ball-demo');
        var ball3dCanvas = document.getElementById('ball3d-demo');
        var flowerCanvas = document.getElementById('flower-demo');
        var flowerOceanCanvas = document.getElementById('flower-ocean-demo');
        var lesCanvas = document.getElementById('les-demo');

        new __WEBPACK_IMPORTED_MODULE_1__component_CircleProgress__["a" /* default */]({
            canvas: circleCanvas
        });

        new __WEBPACK_IMPORTED_MODULE_2__component_Aqu__["a" /* default */]({
            canvas: aquCanvas
        });

        new __WEBPACK_IMPORTED_MODULE_3__component_Ball__["a" /* default */]({
            canvas: ballCanvas
        });

        new __WEBPACK_IMPORTED_MODULE_4__component_Ball3D__["a" /* default */]({
            canvas: ball3dCanvas
        });

        new __WEBPACK_IMPORTED_MODULE_5__component_Flower__["a" /* default */]({
            canvas: flowerCanvas
        });

        new __WEBPACK_IMPORTED_MODULE_6__component_FlowerOcean__["a" /* default */]({
            canvas: flowerOceanCanvas
        });

        new __WEBPACK_IMPORTED_MODULE_7__component_Les__["a" /* default */]({
            canvas: lesCanvas
        });
        break;
    case 'sky':
        var skyCanvas = document.getElementById('sky-demo');
        skyCanvas.width = document.documentElement.clientWidth;
        skyCanvas.height = document.documentElement.clientHeight;
        new __WEBPACK_IMPORTED_MODULE_8__component_Sky__["a" /* default */]({
            canvas: skyCanvas
        });
        break;
    case 'table':
        var tableCanvas = document.getElementById('table-demo');
        new __WEBPACK_IMPORTED_MODULE_9__component_Table__["a" /* default */]({
            canvas: tableCanvas
        });
        break;
    default:
        break;
}

/***/ }),
/* 11 */
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

/***/ })
/******/ ]);