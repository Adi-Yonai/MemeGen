'use strict'

var gElSearch;
var elGallery;
var gElOpen;
var gElClose;
var gElFileBtn;



function onInit() {
    gElClose = document.querySelector(".close");
    gElOpen = document.getElementById("editorBtn");
    gElFileBtn = document.querySelector('.file-input');
    elGallery = document.querySelector(".gallery");
    var strHTML = [];
    for (var i=1 ; i<19 ; i++) {
        strHTML += `<a href="generator.html#img${i}">\n
        <img src="img/meme-imgs (square)/${i}.jpg" class="item" onclick="onImgInput(event)">\n
        </a>`
    }
    elGallery.innerHTML = strHTML;
    gElSearch = document.querySelector('.search-box');
}

function updateValue(ev) {
    gInput = ev.target.value;
}

function delDefault(ev) {
    if (ev.target.value === ev.target.defaultValue) ev.target.value = "";
}

function getDefault(ev) {
    if (ev.target.value === "") ev.target.value = ev.target.defaultValue;
}
