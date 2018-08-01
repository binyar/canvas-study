class Table {
    constructor(options) {
        this.options = Object.assign({
            rowWidth: 100,
            colHeight: 25,
            rows: 18,
            cols: 9,
            lineColor: "#ccc"
        }, options);
        let {canvas} = this.options;
        let width = canvas.width, height = canvas.height;
        this.ctx = this.options.canvas.getContext('2d');
        const ctx = this.ctx;
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

    init() {
        const o = this.options;
        const w = o.rowWidth;
        const h = o.colHeight;
        const rows = o.rows;
        const cols = o.cols;
        let y = 0;
        for (let row = 0; row < rows; row++) {
            let x = 0;
            for (let col = 0; col < cols; col++) {
                let cellKey = `${row}:${col}`;
                let p = {
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

    drawCell(sp) {
        const o = this.options;
        const w = o.rowWidth;
        const h = o.colHeight;
        this.drawLine([sp.x, sp.y + h], [sp.x + w, sp.y + h], [sp.x + w, sp.y]);
    }

    drawLine(sp, ep, epp) {
        const ctx = this.ctx;
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

    bindEvent() {
        const w = this.options.rowWidth;
        const h = this.options.colHeight;
        const canvas = this.options.canvas;
        const offset = {
            left: canvas.offsetLeft,
            top: canvas.offsetTop
        };
        canvas.addEventListener('mousedown', e => {
            let point = [e.pageX - offset.left, e.pageY - offset.top];
            let row = parseInt(point[0] / w);
            let col = parseInt(point[1] / h);
            console.log(this.cell[`${row}:${col}`])
        })
    }

    clear() {
        const ctx = this.ctx;
        const canvas = this.options.canvas;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
}

export default Table;