class Tree {
    constructor(options) {
        this.options = Object.assign({
            canvas: null,
            color: '#6CA6CD',
            r: 10,
            gravity: 0.2,
            bounce: -0.5
        }, options);
        this.ctx = this.options.canvas.getContext('2d');
        this.x = this.options.canvas.width / 2;
        this.y = 0;
        this.xpos = 0;
        this.ypos = 0;
        this.vx = Math.random() * 5 - 5;
        this.vy = Math.random() * 10 - 5;
        this.init();
    }

    init() {
        const self = this, {canvas, gravity, r} = this.options;
        this.vy += gravity;
        this.ypos += this.vy;
        this.xpos += this.vx;
        if (this.ypos > canvas.height - r) {
            this.ypos = canvas.height - r;
            this.vy *= this.options.bounce;
        }
        this.clear();
        this.draw();
        if (this.xpos + this.x < 0 || this.xpos + this.x > canvas.width) {
            this.xpos = 0;
            this.ypos = 0;
            this.vx = Math.random() * 5 - 5;
            this.vy = Math.random() * 10 - 5;
        }
        requestAnimationFrame(() => {
            self.init();
        })
    }

    draw() {
        const {ctx} = this;
        const o = this.options;
        ctx.save();
        ctx.beginPath();
        ctx.fillStyle = o.color;
        ctx.arc(this.x + this.xpos, this.y + this.ypos, o.r, 0, Math.PI * 2);
        ctx.fill();
        ctx.closePath();
        ctx.restore();
    }

    clear() {
        const o = this.options, canvas = o.canvas;
        const ctx = this.ctx;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
}

export default Tree;