import {parseColor} from '../base/utils';

class Ball3D {
    constructor(options) {
        this.options = Object.assign({
            canvas: null,
            r: 5,
            num: 200,
            gravity: 0.2,
            bounce: -0.5
        }, options);
        const {canvas} = this.options;
        this.ctx = canvas.getContext('2d');
        this.floor = canvas.height / 2;
        this.zFloor = canvas.height * 0.7;
        this.vx = canvas.width / 2;
        this.vy = canvas.height / 2;
        this.init();
        this.draw();
    }

    init() {
        const o = this.options;
        this.balls = [];
        let i = 0;

        while (i < o.num) {
            let ball = {
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
                color: parseColor(Math.random() * (0xffffff))
            };
            this.balls.push(ball);
            i++;
        }
    }

    draw() {
        const {balls} = this;
        const self = this, o = this.options;
        this.clear();
        balls.map((ball, index) => {
            ball.vy += o.gravity;
            ball.xpos += ball.vx;
            ball.ypos += ball.vy;
            ball.zpos += ball.vz;
            if (ball.ypos > self.floor) {
                ball.ypos = self.floor;
                ball.vy *= o.bounce;
            }
            if (ball.zpos > -self.zFloor) {
                let scale = self.zFloor / (self.zFloor + ball.zpos);
                ball.scaleX = scale;
                ball.scaleY = scale;
                ball.x = self.vx + ball.xpos * scale;
                ball.y = self.vy + ball.ypos * scale;
                self.drawBall(ball);
            } else {
                balls.splice(index, 1);
            }
        });
        requestAnimationFrame(() => {
            if (balls.length < o.num * 0.6) {
                self.init();
            }
            self.draw();
        })
    }

    drawBall(ball) {
        const o = this.options;
        const {ctx} = this;
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

    clear() {
        const {canvas} = this.options;
        const {ctx} = this;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

}

export default Ball3D;