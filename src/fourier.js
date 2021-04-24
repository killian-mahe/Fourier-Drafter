/**
 * The representation of a complex number
 */
class ComplexNumber {

    /**
     * Create a complex number
     * @param {number} real Real part of the complex numebr
     * @param {number} img Imaginary part of the complex number
     */
    constructor(real, img) {
        this.real = real;
        this.img = img;
    }

    /**
     * Get the opposite of the Complex number
     * @returns {ComplexNumber} opposite
     */
    get conj() {
        return new ComplexNumber(this.real, -this.img);
    }

    /**
     * Multiply two Complex number
     * @param {ComplexNumber} x 
     * @returns {ComplexNumber} result
     */
    mul(x) {
        let real = (this.real * x.real) - (this.img * x.img);
        let img = (this.real * x.img) + (this.img * x.real);
        return new ComplexNumber(real, img);
    }

    /**
     * Divide two Complex number
     * @param {ComplexNumber} x 
     * @returns {ComplexNumber} result
     */
    div(x) {
        let y = this.mul(x.conj);
        const divider = x.real*x.real + x.img*x.img;
        return new ComplexNumber(y.real/divider, y.img/divider);
    }

    /**
     * Add two Complex number
     * @param {ComplexNumber} x 
     * @returns {ComplexNumber} result
     */
    add(x) {
        return new ComplexNumber(this.real + x.real, this.img + x.img)
    }

    /**
     * Sub two Complex number
     * @param {ComplexNumber} x 
     * @returns {ComplexNumber} result
     */
    sub(x) {
        return new ComplexNumber(this.real - x.real, this.img - x.img)
    }

    /**
     * Get the module
     * @returns module
     */
    get module() {
        return Math.sqrt(this.real*this.real + this.img*this.img);
    }

    /**
     * Get the phase (in radians)
     * @returns phase
     */
    get phase() {
        return Math.atan2(this.img, this.real);
    }

    toString() {
        return `${this.real}${this.img >= 0 ? '+' : ''}${this.img}i`;
    }

    /**
     * Print the Complex number
     */
    print() {
        console.log(this.toString());
    }
}

/**
 * Transform an array of coordinate to an array of complex numbers
 * @param {Array<Array<any>>} x 
 * @returns 
 */
function CoordToComplex(x, sampling = 1) {
    let y = []
    const sample = Math.round(1/sampling)
    for (let i = 0; i < x.length; i+=sample) {
        y.push(new ComplexNumber(x[i].x, x[i].y));
    }
    return y;
}

/**
 * Compute the Discret Fourier Transformation
 * @param {Array<ComplexNumber>} x 
 * @returns 
 */
function dft(x) {
    const X = [];
    const N = x.length;

    for (let k = 0; k < x.length; k++) {

        let y = new ComplexNumber(0, 0);
        let z = new ComplexNumber(0, 0);

        for (let n = 0; n < N; n++) {

            const phi = (2 * Math.PI * k * n) / N;
            z.real = Math.cos(phi);
            z.img = - Math.sin(phi);

            y = y.add( x[n].mul(z) );
        }
        
        y.real /= N;
        y.img /= N;

        let value = y;
        let freq = k;
        X[k] = { value, freq };

    }
    return X;
}