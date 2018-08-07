import $ from 'jquery';

class Table {
    constructor(options) {
        this.CONST = {
            COLOR: {
                green: '#0DB3A6',
                grey: '#CCCCCC'
            }
        };
        this.options = Object.assign({
            rowWidth: 100,
            colHeight: 25,
            rows: 16,
            cols: 10
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
        this.rowStart = 0;
        this.colStart = 0;
        this.rowEnd = rows - 1;
        this.colEnd = cols - 1;
        this.rows = {};
        this.cols = {};
        for (let row = 0; row < rows; row++) {
            let x = 0;
            this.rows[row] = y;
            for (let col = 0; col < cols; col++) {
                if (this.isNull(this.cols[col])) {
                    this.cols[col] = x;
                }
                let cellKey = `${row}:${col}`;
                let p = {
                    x: x,
                    y: y,
                    w: w,
                    h: h,
                    r: row,
                    c: col,
                    key: cellKey
                };
                this.cell[cellKey] = p;
                this.drawCell(p);
                x += w;
            }
            y += h;
        }
        this.drawLine([0, h * rows], [[0, 0], [w * cols, 0]]);
    }

    drawRange(drawLine = true, drawArea = true, drawCell = true, lineColor) {
        if (!this.range) {
            return;
        }
        let startRow = this.range.from.row,
            endRow = this.range.to.row,
            startCol = this.range.from.col,
            endCol = this.range.to.col,
            startCell = this.cell[`${startRow}:${startCol}`],
            endCell = this.cell[`${endRow}:${endCol}`],
            leftDownCell = this.cell[`${endRow}:${startCol}`],
            rightUpCell = this.cell[`${startRow}:${endCol}`];
        this.clear(startCell.x, startCell.y, endCell.x + endCell.w - startCell.x, endCell.y + endCell.h - startCell.y);
        if (drawCell) {
            for (var row = startRow; row <= endRow; row++) {
                for (var col = startCol; col <= endCol; col++) {
                    let cellKey = `${row}:${col}`;
                    this.drawCell(this.cell[cellKey]);
                }
            }
        }
        if (drawLine) {
            this.drawLine([startCell.x, startCell.y], [[leftDownCell.x, leftDownCell.y + leftDownCell.h],
                [endCell.x + endCell.w, endCell.y + endCell.h],
                [rightUpCell.x + rightUpCell.w, rightUpCell.y],
                [startCell.x, startCell.y]], lineColor || this.CONST.COLOR.green);
        }
        if (drawArea) {
            this.drawArea([startCell.x, startCell.y], [[leftDownCell.x, leftDownCell.y + leftDownCell.h],
                [endCell.x + endCell.w, endCell.y + endCell.h],
                [rightUpCell.x + rightUpCell.w, rightUpCell.y],
                [startCell.x, startCell.y]]);
        }
    }

    drawArea(sp, points) {
        const ctx = this.ctx;
        ctx.save();
        ctx.beginPath();
        ctx.fillStyle = this.CONST.COLOR.green;
        ctx.globalAlpha = 0.08;
        ctx.moveTo(sp[0], sp[1]);
        points.map(p => {
            ctx.lineTo(p[0], p[1]);
        });
        ctx.fill();
        ctx.closePath();
        ctx.restore();
    }

    drawCell(sp, color, isFull = false) {
        let points = [[sp.x + sp.w, sp.y + sp.h], [sp.x + sp.w, sp.y]];
        if (isFull) {
            points = points.concat([[sp.x, sp.y], [sp.x, sp.y + sp.h]]);
        }
        this.drawLine([sp.x, sp.y + sp.h], points, color);
    }

    drawLine(sp, points, color) {
        const ctx = this.ctx;
        ctx.save();
        ctx.beginPath();
        ctx.strokeStyle = color || this.CONST.COLOR.grey;
        ctx.lineWidth = 1;
        ctx.moveTo(sp[0], sp[1]);
        points.map(p => {
            ctx.lineTo(p[0], p[1]);
        });
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
        $(canvas).on({
            mousedown: e => {
                this.drawRange(true, false, true, this.CONST.COLOR.grey);
                let point = this.getEventPoint(e, offset);
                let cell = this.getNearestCell(point);
                this.range = {
                    from: {
                        row: cell.r,
                        col: cell.c
                    },
                    to: {
                        row: cell.r,
                        col: cell.c
                    }
                };
                this.currentCell = cell;
                $(canvas).off('mousemove.move');
                $(canvas).on('mousemove.move', e => {
                    let p = this.getEventPoint(e, offset);
                    let x = p[0], y = p[1];
                    let changed = false, changeDirection = false;
                    let currentCell = this.currentCell;
                    if (x > currentCell.x + currentCell.w) {
                        console.log('right...',this.range)
                        this.drawRange(true, false, true, this.CONST.COLOR.grey);
                        if (currentCell.c + 1 <= this.range.to.col) {
                            Object.assign(this.range.from, {
                                col: currentCell.c + 1
                            });
                            changeDirection = true;
                        } else {
                            Object.assign(this.range.to, {
                                col: currentCell.c + 1
                            });
                        }

                        changed = true;
                    } else if (x < currentCell.x) {
                        console.log('left....')
                        this.drawRange(true, false, true, this.CONST.COLOR.grey);
                        if (currentCell.c - 1 < this.range.from.col) {
                            Object.assign(this.range.from, {
                                col: currentCell.c - 1
                            });
                            changeDirection = true;
                        } else {
                            Object.assign(this.range.to, {
                                col: currentCell.c - 1
                            });
                        }
                        changed = true;
                    }

                    if (y > currentCell.y + currentCell.h) {
                        this.drawRange(true, false, true, this.CONST.COLOR.grey);
                        if (currentCell.r + 1 <= this.range.to.row) {
                            Object.assign(this.range.from, {
                                row: currentCell.r + 1
                            });
                            changeDirection = true;
                        } else {
                            Object.assign(this.range.to, {
                                row: currentCell.r + 1
                            });
                        }
                        changed = true;
                    } else if (y < currentCell.y) {
                        this.drawRange(true, false, true, this.CONST.COLOR.grey);
                        if (currentCell.r - 1 < this.range.from.row) {
                            Object.assign(this.range.from, {
                                row: currentCell.r - 1
                            });
                        } else {
                            Object.assign(this.range.to, {
                                row: currentCell.r - 1
                            });
                        }
                        changed = true;
                    }
                    if (changed) {
                        if (changeDirection) {
                            this.currentCell = this.cell[`${this.range.from.row}:${this.range.from.col}`]
                        } else {
                            this.currentCell = this.cell[`${this.range.to.row}:${this.range.to.col}`]
                        }
                        console.log(this.range)
                        this.drawRange();
                    }
                })
            },
            mouseup: () => {
                $(canvas).off('mousemove.move')
            }
        });
    }


    getEventPoint(e, offset) {
        return [e.pageX - offset.left, e.pageY - offset.top];
    }

    getNearestCell(point) {
        let x = point[0], y = point[1];
        let row = this.getNearestTarget(this.rows, y, this.rowStart, this.rowEnd);
        let col = this.getNearestTarget(this.cols, x, this.colStart, this.colEnd);
        let cellKey = `${row}:${col}`;
        if (cellKey === this.prevCell && this.prevCell.key) {
            return;
        }
        let cell = this.cell[cellKey];
        if (this.prevCell) {
            this.clear(this.prevCell.x, this.prevCell.y, this.prevCell.w, this.prevCell.h);
            this.drawCell(this.prevCell, this.CONST.COLOR.grey, true);
            this.cell[this.prevCell.key].select = false;
        }
        cell.select = true;
        this.clear(cell.x, cell.y, cell.w, cell.h);
        this.drawCell(cell, this.CONST.COLOR.green, true);
        this.prevCell = cell;
        return cell;
    }

    getNearestTarget(targets, targetNum, start, end) {
        if (start === end) {
            return start;
        }
        //仅两行
        if (end - start === 1) {
            if (targetNum > targets[end]) {
                return end;
            }
            return start;
        }
        let sum = end + start;
        let middle;
        //奇数
        if (this.isOdd(sum)) {
            middle = (sum + 1) / 2;
        } else {
            middle = sum / 2;
        }
        if (targetNum > targets[middle]) {
            return this.getNearestTarget(targets, targetNum, middle, end)
        }
        return this.getNearestTarget(targets, targetNum, start, middle);
    }

    isOdd(num) {
        return parseInt(num) % 2 !== 0;
    }

    isNull(val) {
        return val == null;
    }

    clear(s, e, w, h) {
        const ctx = this.ctx;
        ctx.clearRect(s, e, w, h);
    }
}

export default Table;