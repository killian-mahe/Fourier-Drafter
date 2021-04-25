let canvas = createCanvas();
let ctx = canvas.ctx;

const PRIMARY = "#ECF0F1"
const SECONDARY = "#808B96"
const USER = 0;
const DRAWING = 1;

let raw_signal = [];
let signal = [];

let phi = 0;
let x = 0;
let y = 0;
const radius = 150;
let path = []
let state = -1;
let mouse = {x: 0, y: 0};

canvas.object.addEventListener('mousedown', (event) => {
    state = USER;
    raw_signal = [];
    phi = 0;
    path = [];
})

canvas.object.addEventListener('mouseup', (event) => {
    state = DRAWING;

    signal = dft(CoordToComplex(raw_signal));

    signal = signal.sort((a, b) => b.value.module - a.value.module)
})

canvas.object.addEventListener('mousemove', (event) => {
    const rect = event.target.getBoundingClientRect();
    mouse.x = event.clientX - rect.left; //x position within the element.
    mouse.y = event.clientY - rect.top;  //y position within the element.
})

function draw() {
    canvas.clear();
    
    ctx.translate(canvas.width/2, canvas.height/2);
    
    if (state == -1) {

        ctx.fillStyle = PRIMARY;
        ctx.font = "48px 'Source Sans Pro'"
        ctx.textAlign = 'center';
        ctx.fillText("Draw something amazing !", 0, 0);

    } else if (state == USER) {
        
        ctx.strokeStyle = PRIMARY
        let point = {x: mouse.x - canvas.width/2, y: mouse.y - canvas.height/2};
        raw_signal.push(point);
        ctx.beginPath();
        ctx.moveTo(raw_signal[0].x, raw_signal[0].y)
        raw_signal.forEach(point => {
            ctx.lineTo(point.x, point.y);
        });
        ctx.stroke();
        ctx.closePath();
        
    } else if (state == DRAWING) {
        
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

            ctx.strokeStyle = PRIMARY;
            ctx.fillStyle = PRIMARY;
            line(x_prev, y_prev, x, y);
            circle(x, y, 2, true);

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
}

setInterval(draw, 1000/60) // 60 fps
