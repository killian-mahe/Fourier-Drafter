/**
 * 
 * @param {string} id 
 * @param {number} width 
 * @param {number} height 
 */
class Canvas {

    constructor (id, width, height) {
        /**
         * @type {HTMLCanvasElement}
         */
        this.object = document.getElementById(id);
        this.ctx = this.object.getContext('2d');
        this.object.width = width;
        this.object.height = height;
    }

    clear() {
        this.ctx.setTransform(1, 0, 0, 1, 0, 0);
        this.ctx.clearRect(0, 0, this.width, this.height);
    }

    /**
     * Set the width of the canvas
     */
    set width(width) {
        this.object.width = width;
    }

    get width() {
        return this.object.width;
    }

    /**
     * Set the height of the canvas
     */
    set height(height) {
        this.object.height = height;
    }

    get height() {
        return this.object.height;
    }
}

/**
 * Create and setup a canvas
 * @returns {Canvas} canvas
 */
function createCanvas() {

    let canvas = new Canvas('canvas', 800, 500);

    return canvas;
}

/**
 * Draw a cricle
 * @param {number} x 
 * @param {number} y 
 * @param {number} radius 
 * @param {boolean} fill
 */
function circle(x, y, radius, fill=false) {
    ctx.beginPath();

    ctx.arc(x, y, radius, 2*Math.PI, 0);

    if (fill) ctx.fill();
    else {
        ctx.stroke();
        ctx.closePath();
    }
}

/**
 * Draw a line
 * @param {number} x1 
 * @param {number} y1 
 * @param {number} x2 
 * @param {number} y2 
 */
function line(x1, y1, x2, y2) {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke()
    ctx.closePath()
}