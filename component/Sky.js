class Sky {
    constructor(options) {
        this.options = Object.assign({
            canvas: null
        }, options);
        this.ctx = this.options.canvas.getContext('2d');
        this.init();
    }

    createStar() {
        return {
            x: parseInt(Math.random() * 1440),
            y: parseInt(Math.random() * 200 + 400),
            floor: 50 + Math.random() * 50
        }
    }

    init() {
        this.drawBg();
        //this.drawEarth();
    }

    drawBg() {
        const {ctx} = this, {canvas} = this.options;
        ctx.save();
        ctx.beginPath();

        let grd = ctx.createLinearGradient(canvas.width, canvas.height / 2, 0, canvas.height / 2);
        grd.addColorStop(0, '#5e1c38');
        grd.addColorStop(0.5, '#fff');
        grd.addColorStop(1, '#5e1c38');

        ctx.globalAlpha = 0.7;
        ctx.fillStyle = grd;
        ctx.rect(0, 0, canvas.width, canvas.height);
        ctx.fill();

        ctx.closePath();
        ctx.restore();
    }

    drawEarth() {
        const {ctx} = this, {canvas} = this.options;
        ctx.save();
        ctx.beginPath();
        ctx.arc(canvas.width / 2, canvas.height * 1.5, 500, 0, Math.PI * 2);


        let grd = ctx.createLinearGradient(canvas.width / 2, canvas.height * 1.5, canvas.width / 2, 0);
        grd.addColorStop(0, '#000');
        grd.addColorStop(1, '#fff');
        ctx.fillStyle = grd;
        ctx.fill();
        ctx.closePath();
        ctx.restore();
    }

    drawStar(x, y, len, rotate = 0) {
        const {ctx} = this;
        ctx.save();
        ctx.beginPath();

        ctx.translate(x, y + len);
        ctx.rotate(rotate * Math.PI / 180);

        let grd = ctx.createLinearGradient(0, 0, 0, -len);
        grd.addColorStop(0, '#fff');
        grd.addColorStop(0.5, '#554746');
        grd.addColorStop(1, '#fff');


        ctx.moveTo(0, -len);
        ctx.arc(0, -len, len, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 / 360 * 2);

        ctx.lineTo(0, 0);
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

export default Sky;