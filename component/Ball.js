class Ball {
    constructor(options) {
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

    init() {
        const self = this;
        let temp = +new Date();
        let gap = temp - this.lastTime;
        this.lastTime = temp;
        this.clear();
        self.draw(gap);
        requestAnimationFrame(() => {
            self.init(gap);
        })
    }

    draw(gap) {
        const o = this.options, r = o.r, max = o.max;
        const ctx = this.ctx;
        ctx.save();
        ctx.beginPath();
        ctx.fillStyle = o.color;
        this.start += gap * 0.002;
        let l = Math.sin(this.start);
        ctx.arc(200, 200, r + max * l, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    }

    clear() {
        const o = this.options, canvas = o.canvas;
        const ctx = this.ctx;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
}

export default Ball;