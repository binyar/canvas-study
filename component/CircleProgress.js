class CircleProgress {
    constructor(options) {
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

    init() {
        let o = this.options;
        if (this.start > 100) {
            this.start = 0;
            this.start += o.amp;
            this.clear();
            this.draw();
            this.draw({
                color: o.deep,
                step: this.start
            });
        }
        requestAnimationFrame(this.init)
    }

    draw(opt) {
        const o = this.options;
        opt = Object.assign({
            color: o.color,
            lineWidth: 14,
            step: 100
        }, opt);
        const ctx = this.ctx;
        ctx.save();
        ctx.beginPath();
        ctx.strokeStyle = opt.color;
        ctx.lineWidth = opt.lineWidth;
        ctx.arc(o.x, o.y, o.r, -Math.PI / 2, opt.step * o.step);
        ctx.stroke();
        ctx.closePath();
        ctx.restore();
    }

    clear() {
        const ctx = this.ctx;
        const canvas = this.options.canvas;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
}
export default CircleProgress