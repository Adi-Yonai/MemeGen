'use strict'

var elContainer;
var gElCanvas;
var gCtx;
var gElInput;
var gElSize;
var gElColor;
var gInput;
var gElUtilSpace;
var gImg;
var gChosenLine = 0;
var gLines = [{}];
var gDY;
var gIsClicked= false;
const gTouchEvs = ['touchstart', 'touchmove', 'touchend'];


function onInit() {
    gLines[0] = {
        pos: 50,
        text: "",
        color: "#000000",
        size: 30
    };
    elContainer = document.querySelector(".canvas-container");
    gElCanvas = document.querySelector('canvas');
    gCtx = gElCanvas.getContext('2d');
    gCtx.font = "30px san serif"
    gElInput = document.querySelector('.text-input');
    gElUtilSpace = document.querySelector(".utility-space");
    gElSize = document.querySelector("#font-size")
    gElColor = document.querySelector("#color-pick")
    checkParam();
    addListeners();
}

function addListeners() {
    gElInput.addEventListener("change", addText )
    addMouseListeners()
    addTouchListeners()
    //gElInput.addEventListener('change', updateValue);
    window.addEventListener('resize', () => {
        resizeCanvas();
        renderCanvas();
    })
}

function addMouseListeners() {
    gElCanvas.addEventListener('mousemove', onMove)
    gElCanvas.addEventListener('mousedown', onDown)
    gElCanvas.addEventListener('mouseup', onUp)
}

function addTouchListeners() {
    gElCanvas.addEventListener('touchmove', onMove)
    gElCanvas.addEventListener('touchstart', onDown)
    gElCanvas.addEventListener('touchend', onUp)
}

function renderCanvas() {
    gCtx.fillRect(0, 0, gElCanvas.width, gElCanvas.height);
    gCtx.drawImage(gImg,0,0, gElCanvas.width, gElCanvas.width);
    drawLines();
    renderText();
}

function resizeCanvas() {
    gElCanvas.width = 0.9*elContainer.offsetWidth;
    gElCanvas.height = 0.9*elContainer.offsetWidth;
}

function checkParam() {
    gImg = new Image();
    if (location.hash){
        var strHTML = location.hash.slice(4);
        gImg.src = `img/meme-imgs (square)/${strHTML}.jpg`
    } else gImg.src = "img/LOGO.png"
    gImg.addEventListener('load', function() {
        resizeCanvas();
        renderCanvas();
      }, false);
}

function addText(ev) {
    gLines[gChosenLine].text = ev.target.value;
    console.log(gLines);
    renderCanvas();
}

function changeFontSize(ev) {
    gLines[gChosenLine].size = ev.target.value;
    renderCanvas();

}

function changeColor(ev) {
    gLines[gChosenLine].color = ev.target.value;
    renderCanvas();
}

function getEvPos(ev) {
    var pos = {
        x: ev.offsetX,
        y: ev.offsetY
    }
    if (gTouchEvs.includes(ev.type)) {
        ev.preventDefault()
        ev = ev.changedTouches[0]
        pos = {
            x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
            y: ev.pageY - ev.target.offsetTop - ev.target.clientTop
        }
    }
    return pos
}

function onDown(ev) {
    const pos = getEvPos(ev)
    var tempLine = checkLine(pos);
    if (tempLine!==-1) {
        gChosenLine = tempLine;
        focusText()
        gIsClicked = true;
        gDY = gLines[gChosenLine].pos-pos.y;
        document.body.style.cursor = 'grabbing'
    }
}

function onMove(ev) {
    if (gIsClicked) {
        const pos = getEvPos(ev)
        gLines[gChosenLine].pos = pos.y +gDY;
        resizeCanvas();
        renderCanvas();
    }
}

function onUp() {
    gIsClicked = false;
    document.body.style.cursor = 'grab';
}


function checkLine(clickedPos) {
    return gLines.findIndex(element => clickedPos.y >= element.pos-(1.5*element.size) && clickedPos.y <= element.pos+2);
}

function addLine() {
    gChosenLine = gLines.length;
    gLines[gChosenLine]= {
        pos: 500,
        text: "",
        color: "#000000",
        size: 30
    };
    gElInput.value = "";
    resizeCanvas();
    renderCanvas();
}

function drawLines() {
    gCtx.beginPath()
    gLines.forEach((element) => {
        gCtx.moveTo(1,element.pos+2);
        gCtx.lineTo(gElCanvas.width-1,element.pos+2);
        gCtx.lineTo(gElCanvas.width-1,element.pos-(1.5*element.size));
        gCtx.lineTo(1,element.pos-(1.5*element.size));
        gCtx.lineTo(1,element.pos+2);
    })
    gCtx.stroke();
}

function delLine () {
    gLines.splice(gChosenLine,1);
    gChosenLine = 0;
    resizeCanvas();
    renderCanvas();
}

function renderText() {
    gLines.forEach((element) => {
        gCtx.font = `${element.size}px san serif`;
        gCtx.fillStyle = element.color;
        gCtx.fillText(element.text, 10, element.pos);
    })
}

function focusText() {
    console.log(gLines[gChosenLine]);
    gElInput.value = gLines[gChosenLine].text;
    gElSize.value = gLines[gChosenLine].size;
    gElColor.value = gLines[gChosenLine].color;
}