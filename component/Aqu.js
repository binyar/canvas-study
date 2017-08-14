class Aqu {
    constructor(options) {
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

    init() {
        const o = this.options;
        let i = 0;
        while (i < o.num) {
            this.startPoint[i] = Math.random() * 20 + i * 10;
            this.endPointY[i] = o.canvas.height * 0.6 - Math.random() * 50;
            this.amp[i] = Math.random() * 10 + 40;
            i++;
        }
        this.draw();

    }

    draw() {
        const self = this;
        let temp = +new Date();
        let gap = temp - self.lastTime;
        self.lastTime = temp;
        self.clear();
        self.doDraw(gap);
        requestAnimationFrame(() => {
            self.draw();
        })
    }

    doDraw(gap) {
        const o = this.options, canvas = o.canvas;
        const ctx = this.ctx;
        ctx.save();
        ctx.lineWidth = o.lineWidth;
        ctx.strokeStyle = o.color;
        ctx.globalAlpha = o.alpha;
        ctx.lineCap = 'round';
        let i = 0;
        this.start += gap * 0.001;
        let l = Math.sin(this.start);
        while (i < o.num) {
            ctx.beginPath();
            ctx.moveTo(this.startPoint[i], canvas.height);
            let endX = this.startPoint[i] + this.amp[i] * l;
            ctx.quadraticCurveTo(this.startPoint[i], canvas.height - 120, endX, this.endPointY[i]);
            ctx.stroke();
            ctx.closePath();
            i++;
        }
        ctx.restore();
    }

    clear() {
        const o = this.options, canvas = o.canvas;
        const ctx = this.ctx;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
}

export default Aqu