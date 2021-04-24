let canvas = createCanvas();
let ctx = canvas.ctx;

const PRIMARY = "#ECF0F1"
const SECONDARY = "#808B96"


let signal = dft(CoordToComplex(raw_signal, 1/4));

signal = signal.sort((a, b) => b.value.module - a.value.module)

let phi = 0;
let x = 0;
let y = 0;
const radius = 150;
let path = []

function draw() {
    canvas.clear();
    
    ctx.translate(canvas.width/2, canvas.height/2);

    let x_prev = 0;
    let y_prev = 0;

    for (let i = 0; i < signal.length; i++) {

        const freq = signal[i].freq
        const radius = signal[i].value.module
        const phase = signal[i].value.phase

        ctx.strokeStyle = SECONDARY
        ctx.fillStyle = SECONDARY
        circle(x_prev, y_prev, radius);
            
        x = x_prev + radius*Math.cos(freq * phi + phase);
        y = y_prev + radius*Math.sin(freq * phi + phase);

        line(x_prev, y_prev, x, y);
        circle(x, y, 4, true);

        x_prev = x;
        y_prev = y;
    }

    path.unshift([x, y])

    ctx.strokeStyle = PRIMARY
    ctx.beginPath()
    ctx.moveTo(path[0][0], path[0][1])    
    for (let k = 0; k < path.length; k++) {
        ctx.lineTo(path[k][0], path[k][1]);
    }
    ctx.stroke()
    ctx.closePath()

    const dt = 2*Math.PI / signal.length;
    phi += dt;

    if (phi > 2*Math.PI) {
        phi = 0;
        path = []
    }
}

setInterval(draw, 1000/60) // 60 fps
