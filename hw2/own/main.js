var imgsrc = [
  "https://i.imgur.com/7JnhlyL.jpg",
  "https://i.imgur.com/KbxCsBb.jpg",
  "https://i.imgur.com/Rov1nJa.jpg",
  "https://i.imgur.com/EN0xBiH.jpg",
  "https://i.imgur.com/8AxelU5.jpg",
  "https://i.imgur.com/FbCDkn0.jpg",
  "https://i.imgur.com/1en66uV.jpg",
  "https://i.imgur.com/NR9dmbL.jpg",
  "https://i.imgur.com/MyQjq4Z.jpg",
  "https://i.imgur.com/jFiO0ND.jpg"
];

var button = document.getElementsByClassName("image-viewer__button");
var button_disabled = document.getElementsByClassName("disabled");
var source = document.getElementById("source");

var imgsrc_idx = 4;
var target = document.getElementById("display");
target.src = "./images/loading.gif";
let img = new Image();
img.onload = () => {
  target.src = imgsrc[imgsrc_idx];
}
img.src = imgsrc[imgsrc_idx];
// target.src = imgsrc[imgsrc_idx];
source.href = imgsrc[imgsrc_idx];
source.textContent = "Source: " + imgsrc[imgsrc_idx];


var back = document.getElementById("previous");
back.onclick = () => {
  if (imgsrc_idx != 0) {
    imgsrc_idx -= 1;
    target.src = "./images/loading.gif";
    let img = new Image();
    img.onload = () => {
      target.src = imgsrc[imgsrc_idx];
    }
    img.src = imgsrc[imgsrc_idx];
    // target.src = imgsrc[imgsrc_idx];
    source.href = imgsrc[imgsrc_idx];
    source.textContent = "Source: " + imgsrc[imgsrc_idx];
  }
  if (imgsrc_idx == 0) {
    back.classList = "disabled";
    next.classList = "image-viewer__button";
  }
  else {
    back.classList = "image-viewer__button";
    next.classList = "image-viewer__button";
  }
}

var next = document.getElementById("next");
next.onclick = () => {
  if (imgsrc_idx != imgsrc.length - 1) {
    imgsrc_idx += 1;
    target.src = "./images/loading.gif";
    let img = new Image();
    img.onload = () => {
      target.src = imgsrc[imgsrc_idx];
    }
    img.src = imgsrc[imgsrc_idx];
    source.href = imgsrc[imgsrc_idx];
    source.textContent = "Source: " + imgsrc[imgsrc_idx];
  }
  if (imgsrc_idx == imgsrc.length - 1) {
    next.classList = "disabled";
    back.classList = "image-viewer__button";
  }
  else {
    back.classList = "image-viewer__button";
    next.classList = "image-viewer__button";
  } 
}