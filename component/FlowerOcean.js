class FlowerOcean {
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

    drawFlower(start, len, baseX, baseY) {
        const {canvas} = this.options;
        for (let i = 0; i <= 120; i++) {
            if (i % 10 === 0) {
                this.draw(i, len, start, baseX, baseY);
            }
        }
        for (let i = 0; i <= 120; i++) {
            if (i % 10 === 0) {
                this.draw(i, len - 30, start, baseX, baseY);
            }
        }
        let endX;
        if (Math.random() * 10 - 5 > 0) {
            endX = baseX - 50;
        } else {
            endX = baseX + 50;
        }
        let endY = canvas.height - len;

        this.drawLine(baseX, baseY, endX, endY, endX + Math.random() * 20 + 20, baseY + Math.random() * 20 + 20);
    }

    draw(rotate, len, start, baseX, baseY) {
        const {ctx} = this;
        ctx.save();
        ctx.beginPath();
        ctx.translate(baseX, baseY);
        ctx.rotate((rotate + start) * Math.PI / 180);
        ctx.lineWidth = 1;
        ctx.lineCap = 'round';
        ctx.moveTo(0, 0);
        let x = len * 0.3;
        let y = len * 1.2;

        ctx.globalAlpha = 0.7;
        var grd = ctx.createLinearGradient(0, 0, 0, -len);
        grd.addColorStop(0, "#000");
        grd.addColorStop(1, '#f10000');

        ctx.strokeStyle = grd;

        ctx.bezierCurveTo(-x, -y, x, -y, 0, 0);

        ctx.stroke();


        let grd2 = ctx.createLinearGradient(0, 0, 0, -len);
        grd2.addColorStop(0, "#000");
        grd2.addColorStop(0.6, '#f10000');
        grd2.addColorStop(1, '#f10000');

        ctx.fillStyle = grd2;
        ctx.fill();
        ctx.closePath();
        ctx.restore();
    }

    drawLine(sx, sy, x, y, gx, gy) {
        const {ctx} = this;
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

    drawArc(x, y) {
        const {ctx} = this;
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


        const {canvas} = this.options;
        let endX;
        if (Math.random() * 10 - 5 > 0) {
            endX = x - 50;
        } else {
            endX = x + 50;
        }
        let endY = canvas.height;

        this.drawLine(x + 10, y, endX, endY, endX + Math.random() * 20 + 20, y + Math.random() * 20 + 20);
    }

    clear() {
        const o = this.options, canvas = o.canvas;
        const ctx = this.ctx;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
}

export default FlowerOcean;