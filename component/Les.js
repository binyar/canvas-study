class Les {
    constructor(options) {
        this.options = Object.assign({
            canvas: null,
            color: '#f90003',
            r: 10
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

        this.init();
    }

    init() {
        const x = 200, y = 200;
        for (let i = 0; i < 360; i++) {
            if (i % 45 === 0) {
                //this.drawRui(x, y, i);
                this.drawBan(x, y - 40, 50, i);
                this.drawBan(x, y - 40, 50, i, false);
                this.drawLine(x, y - 40, 50, i);
            }
        }
    }

    drawBan(x, y, len, rotate, left = true) {
        const {ctx} = this;
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

    drawLine(x, y, len, rotate) {
        const {ctx} = this;

        ctx.save();
        ctx.beginPath();

        ctx.translate(x, y);
        ctx.rotate(rotate * Math.PI * 2 / 360);

        ctx.moveTo(0, -len);
        ctx.lineTo(0, 0);
        ctx.lineWidth = 1;

        let grd = ctx.createLinearGradient(0, -len, 0, 0);

        grd.addColorStop(0, '#fff');
        grd.addColorStop(1, '#141820');

        ctx.strokeStyle = grd;

        ctx.stroke();

        ctx.closePath();
        ctx.restore();
    }

    drawRui(x, y, rotate) {
        const {ctx} = this;
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

    drawArc(x, y) {

    }

    clear() {
        const o = this.options, canvas = o.canvas;
        const ctx = this.ctx;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
}

export default Les;