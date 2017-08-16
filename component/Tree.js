class Tree {
    constructor(options) {
        this.options = Object.assign({
            canvas: null,
            color: '#6CA6CD',
            rootLength: 50
        }, options);
        this.ctx = this.options.canvas.getContext('2d');
        this.init();
    }

    init() {
        this.draw(20);
    }

    draw(angel) {
        const {ctx} = this;
        const o = this.options;
        ctx.save();
        ctx.lineWidth = 1;
        ctx.strokeStyle = o.color;
        ctx.translate(o.canvas.width / 2, o.canvas.height);
        ctx.rotate(0.1);
        ctx.moveTo(o.canvas.width / 2, o.canvas.height);
        ctx.lineTo(o.canvas.width / 2, o.canvas.height - o.rootLength);
        ctx.translate(-o.canvas.width / 2, -(o.canvas.height - o.rootLength));
        ctx.stroke();
        ctx.closePath();
        ctx.restore();
    }
}

export default Tree;