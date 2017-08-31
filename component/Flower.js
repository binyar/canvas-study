class Flower {
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
        for (let i = 0; i <= 180; i++) {
            if (i % 10 === 0) {
                this.draw(i, 180, '#3c00a9', '#2b117f', 0.6);
            }
        }
        for (let i = 0; i <= 180; i++) {
            if (i % 10 === 0) {
                this.draw(i, 150);
            }
        }
        for (let i = 0; i <= 180; i++) {
            if (i % 10 === 0) {
                this.draw(i, 120);
            }
        }

        this.drawLine(20, 180, 60, 160);

        this.drawLine(140, 220, 180, 230);

        this.drawLine(130, 160, 150, 180);

        this.drawLine(80, 210, 100, 230);
    }

    draw(rotate, len = 180, lineColor, fillColor, alpha) {
        const {ctx} = this;
        const o = this.options;
        ctx.save();
        ctx.beginPath();
        ctx.translate(200, 200);
        ctx.rotate(rotate * Math.PI / 180);

        var lineGrd = ctx.createLinearGradient(0, 0, 0, -len);
        lineGrd.addColorStop(0, "#000");
        lineGrd.addColorStop(1, lineColor || '#f10000');

        ctx.strokeStyle = lineGrd;
        ctx.lineWidth = 1;
        ctx.lineCap = 'round';
        ctx.moveTo(0, 0);
        let x = len * 0.25;
        let y = len * 1.2;

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

    drawLine(x, y, gx, gy) {
        const {ctx} = this;
        const o = this.options;
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

    drawArc(x, y) {
        const {ctx} = this;
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

    clear() {
        const o = this.options, canvas = o.canvas;
        const ctx = this.ctx;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
}

export default Flower;