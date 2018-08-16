import $ from 'jquery';

class Table {
    constructor(options) {
        this.CONST = {
            COLOR: {
                green: '#0DB3A6',
                grey: '#CCCCCC'
            },
            MENU: {
                0: "A",
                1: "B",
                2: "C",
                3: "D",
                4: "E",
                5: "F",
                6: "G",
                7: "H",
                8: "I",
                9: "G",
                10: "K",
                11: "L",
                12: "M",
                13: "N",
                14: "O",
                15: "P",
                16: "Q",
                17: "R",
                18: "S",
                19: "T",
                20: "U",
                21: "V",
                22: "W",
                23: "X",
                24: "Y",
                25: "Z",
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
        this.$container = $('#demo');
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
                if (row === 0 && col !== 0) {
                    p.content = {
                        text: this.CONST.MENU[col - 1],
                        style: {
                            background: '#f7f7f7'
                        }
                    };
                    p.isMenu = true

                } else if (col === 0 && row !== 0) {
                    p.content = {
                        text: row,
                        style: {
                            background: '#f7f7f7'
                        },
                    };
                    p.isMenu = true
                }
                this.cell[cellKey] = p;
                this.drawCell(p);
                x += w;
            }
            y += h;
        }
        this.drawLine([0, h * rows], [[0, 0], [w * cols, 0]]);
    }

    selectCell() {
        $('.select', this.$container).remove();
        var cell = this.currentCell;
        $('<div class="select"/>')
            .css({
                left: cell.x,
                top: cell.y,
                width: cell.w,
                height: cell.h
            })
            .appendTo(this.$container)
    }

    drawRange() {
        if (!this.range) {
            return;
        }
        let startRow = this.range.from.row,
            endRow = this.range.to.row,
            startCol = this.range.from.col,
            endCol = this.range.to.col,
            startCell = this.cell[`${startRow}:${startCol}`],
            endCell = this.cell[`${endRow}:${endCol}`];
        $('.range', this.$container).remove();
        $('<div class="range"/>')
            .css({
                left: startCell.x,
                top: startCell.y,
                width: endCell.x - startCell.x + endCell.w,
                height: endCell.y - startCell.y + endCell.h
            })
            .appendTo(this.$container)

        //this.clear(startCell.x, startCell.y, endCell.x + endCell.w - startCell.x, endCell.y + endCell.h - startCell.y);
        // if (drawCell) {
        //     for (var row = startRow; row <= endRow; row++) {
        //         for (var col = startCol; col <= endCol; col++) {
        //             let cellKey = `${row}:${col}`;
        //             this.drawCell(this.cell[cellKey]);
        //         }
        //     }
        // }
        // if (drawLine) {
        //     this.drawLine([startCell.x, startCell.y], [[leftDownCell.x, leftDownCell.y + leftDownCell.h],
        //         [endCell.x + endCell.w, endCell.y + endCell.h],
        //         [rightUpCell.x + rightUpCell.w, rightUpCell.y],
        //         [startCell.x, startCell.y]], lineColor || this.CONST.COLOR.green);
        // }
        // if (drawArea) {
        //     this.drawArea([startCell.x, startCell.y], [[leftDownCell.x, leftDownCell.y + leftDownCell.h],
        //         [endCell.x + endCell.w, endCell.y + endCell.h],
        //         [rightUpCell.x + rightUpCell.w, rightUpCell.y],
        //         [startCell.x, startCell.y]]);
        // }
    }

    drawArea(sp, points, fill) {
        const ctx = this.ctx;
        ctx.save();
        ctx.beginPath();
        ctx.fillStyle = fill;
        ctx.moveTo(sp[0], sp[1]);
        points.map(p => {
            ctx.lineTo(p[0], p[1]);
        });
        ctx.fill();
        ctx.closePath();
        ctx.restore();
    }

    drawCell(sp, bg) {
        let points = [[sp.x + sp.w, sp.y + sp.h], [sp.x + sp.w, sp.y]];
        if (sp.content) {
            if (sp.content.style) {
                var rangePoints = points.concat([[sp.x, sp.y], [sp.x, sp.y + sp.h]]);
                this.drawArea([sp.x, sp.y + sp.h], rangePoints, bg || sp.content.style.background)
            }
            this.drawText(sp.content.text, sp.x + sp.w / 2, sp.y + sp.h - sp.h / 4);
        }
        this.drawLine([sp.x, sp.y + sp.h], points);
    }

    drawLine(sp, points) {
        const ctx = this.ctx;
        ctx.save();
        ctx.beginPath();
        ctx.strokeStyle = this.CONST.COLOR.grey;
        ctx.lineWidth = 1;
        ctx.moveTo(sp[0], sp[1]);
        points.map(p => {
            ctx.lineTo(p[0], p[1]);
        });
        ctx.stroke();
        ctx.closePath();
        ctx.restore();
    }

    drawText(text, x, y) {
        const ctx = this.ctx;
        ctx.save();
        ctx.font = "14px bold";
        ctx.textAlign = "center";
        ctx.fillText(text, x, y);
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
        this.$container.on({
            mousedown: e => {
                let point = this.getEventPoint(e, offset);
                let cell = this.getNearestCell(point);
                if (cell.isMenu) {
                    if (this.prevCellMenu) {
                        this.clear(this.prevCellMenu.x, this.prevCellMenu.y, this.prevCellMenu.w, this.prevCellMenu.h);
                        this.drawCell(this.prevCellMenu);
                    }
                    this.prevCellMenu = cell;
                    this.clear(cell.x, cell.y, cell.w, cell.h);
                    this.drawCell(cell, "#e0e0e0");
                    return;
                }
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
                this.selectCell();
                this.$container.off('mousemove.move');
                $('.range', this.$container).remove();
                var currentRow = this.currentCell.r;
                var currentCol = this.currentCell.c;
                var canvasWidth = $(canvas).outerWidth();
                var canvasHeight = $(canvas).outerHeight();
                this.$container.on('mousemove.move', e => {
                    let p = this.getEventPoint(e, offset);
                    let x = p[0], y = p[1];
                    let changed = false;
                    let currentCell = this.cell[`${currentRow}:${currentCol}`];
                    if (x >= canvasWidth || y >= canvasHeight) {
                        this.$container.off('mousemove.move')
                        return false
                    }
                    if (x > currentCell.x + currentCell.w) {
                        currentCol++;
                        if (currentCol <= this.range.to.col) {
                            Object.assign(this.range.from, {
                                col: currentCol
                            });
                        } else {
                            Object.assign(this.range.to, {
                                col: currentCol
                            });
                        }
                        changed = true;
                    } else if (x < currentCell.x) {
                        currentCol--;
                        if (currentCol < this.range.from.col) {
                            Object.assign(this.range.from, {
                                col: currentCol
                            });
                        } else {
                            Object.assign(this.range.to, {
                                col: currentCol
                            });
                        }
                        changed = true;
                    }

                    if (y > currentCell.y + currentCell.h) {
                        currentRow++;
                        if (currentRow <= this.range.to.row) {
                            Object.assign(this.range.from, {
                                row: currentRow
                            });
                        } else {
                            Object.assign(this.range.to, {
                                row: currentRow
                            });
                        }
                        changed = true;
                    } else if (y < currentCell.y) {
                        currentRow--;
                        if (currentRow < this.range.from.row) {
                            Object.assign(this.range.from, {
                                row: currentRow
                            });
                        } else {
                            Object.assign(this.range.to, {
                                row: currentRow
                            });
                        }
                        changed = true;
                    }
                    if (changed) {
                        // if (changeDirection) {
                        //     this.currentCell = this.cell[`${this.range.from.row}:${this.range.from.col}`]
                        // } else {
                        //     this.currentCell = this.cell[`${this.range.to.row}:${this.range.to.col}`]
                        // }
                        this.drawRange();
                    }
                })
            },
            mouseup: () => {
                this.$container.off('mousemove.move')
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
        // if (this.prevCell) {
        //     this.clear(this.prevCell.x, this.prevCell.y, this.prevCell.w, this.prevCell.h);
        //     this.drawCell(this.prevCell, this.CONST.COLOR.grey, true);
        //     this.cell[this.prevCell.key].select = false;
        // }
        cell.select = true;
        //this.clear(cell.x, cell.y, cell.w, cell.h);
        //this.drawCell(cell, this.CONST.COLOR.green, true);
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