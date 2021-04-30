// set canvas size
const canvas = document.querySelector(".canvas");
const ctx = canvas.getContext('2d');
const canvasWidth = 400;
const canvasHeight = 400;

canvas.style.width = `${canvasWidth}px`
canvas.style.height = `${canvasHeight}px`
canvas.width = canvasWidth;
canvas.height = canvasHeight;

// set canvas background color 
ctx.fillStyle = "white";
ctx.fillRect(0, 0, canvasWidth, canvasHeight);

// Default setting
let drawing = false;
let filling = false;
let color = "#2c2c2c"
let brushSize = 2.5;

ctx.strokeStyle = color;
ctx.fillStyle = color;
ctx.lineWidth = brushSize;

// Color pallet
// check div in html first before editing the color pallet
// make sure you keep the order
const colorsNodeList = document.querySelectorAll('.controls_color');
const colors = [...colorsNodeList];

const color_pallet = {
    color_black : '#2c2c2c',
    color_white : '#ffffff',
    color_red : '#fc2847',
    color_orange : '#ffa343',
    color_yellow : '#fdfc74',
    color_green : '#71bc78',
    color_blue : '#0f4c81',
    color_purple : '#7442c8',
    color_pink : '#fb7efd',
}

colors.forEach((color, index) => {
    bgColor = Object.values(color_pallet);
    color.style.backgroundColor = bgColor[index];
})

// Change color
function changeColor(e) {
    console.log(e.target.style.backgroundColor);
    color = e.target.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
}

colors.forEach(color => color.addEventListener('click', changeColor));

// Change stroke thickness
const brushSize_controler = document.querySelector('.brushSize');
const sizeIndicator = document.querySelector(".sizeIndicator");

function changeLineWidth(e) {
    brushSize = e.target.value;
    ctx.lineWidth = brushSize;
    sizeIndicator.innerText = brushSize;
}

brushSize_controler.addEventListener('input', changeLineWidth);


// Drawing
function dotDrawing(e) {
    drawing = true;
    const x = e.offsetX;
    const y = e.offsetY;
    // ctx.fillRect(x, y, brushSize, brushSize);
    ctx.beginPath();
    ctx.arc(x, y, brushSize / 5, 0, 2 * Math.PI);
    ctx.stroke();
    drawing= false;

}

function startDrawing() {
    drawing = true;
}

function stopDrawing() {
    drawing = false;
}

// Get position of touch event
function getTouchPos(event) {
    const canvasRec = canvas.getBoundingClientRect();
    return {
        x: event.touches[0].clientX - canvasRec.left,
        y: event.touches[0].clientY - canvasRec.top
    };
}

function onPenMove(e) {
    let x = e.offsetX;
    let y = e.offsetY;
    if(e.touches !== undefined) {
        getTouchPos(e);
        x = getTouchPos(e).x;
        y = getTouchPos(e).y;
    }
    if(!drawing) {
        ctx.beginPath();
        ctx.moveTo(x,y);
    } else {
        console.log(x,y)
        ctx.lineTo(x,y);
        ctx.stroke();
    }
}

if(canvas) {
    // mouse event
    canvas.addEventListener("mousemove", onPenMove);
    canvas.addEventListener("click", dotDrawing);
    canvas.addEventListener("mousedown", startDrawing);
    canvas.addEventListener("mouseup", stopDrawing);
    canvas.addEventListener("mouseleave", stopDrawing);

    // touch event
    canvas.addEventListener("touchmove", onPenMove);
    canvas.addEventListener("touchstart", startDrawing);
    canvas.addEventListener("touchend", stopDrawing);

    // prevent scrolling when screen is touched
    document.body.addEventListener("touchstart", function (e) {
        if (e.target == canvas) {
            e.preventDefault();
        }
        }, false);
    document.body.addEventListener("touchend", function (e) {
        if (e.target == canvas) {
            e.preventDefault();
            }
        }, false);
    document.body.addEventListener("touchmove", function (e) {
            if (e.target == canvas) {
            e.preventDefault();
            }
        }, false);
}

// Fill/brush - change paint mode
const paintMode = document.querySelector('.paintMode');

function fillCanvas(e) {
    console.log(e);
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);
}

function changeMode(e) {
    if (!filling) {
        filling = true;
        paintMode.innerText = 'Brush';
        canvas.addEventListener('mousedown', fillCanvas);
        canvas.addEventListener('touchstart', fillCanvas);
    } else {
        filling = false;
        paintMode.innerText = 'Fill';
        canvas.removeEventListener('mousedown', fillCanvas);
        canvas.removeEventListener('touchstart', fillCanvas);
    }
}

paintMode.addEventListener("click", changeMode);

// Save image
const saveBtn = document.querySelector(".saveBtn");

function saveImg() {
    console.log(canvas.toDataURL());
    const link = document.createElement('a');
    link.href = canvas.toDataURL();
    link.download = "🎨.png";
    link.click();
}

saveBtn.addEventListener("click", saveImg);

