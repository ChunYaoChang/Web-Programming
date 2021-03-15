var ind = 0;
const images = ["https://i.imgur.com/HvOEq86.jpg", "https://i.imgur.com/mbCbOdr.jpg", "https://i.imgur.com/lPhEgiy.jpg",
    "https://i.imgur.com/obGsi9x.jpg", "https://i.imgur.com/Y9uYfK7.jpg", "https://i.imgur.com/MWj3gaW.jpg",
    "https://i.imgur.com/etI4gTm.jpg", "https://i.imgur.com/DFkE8wh.jpg", "https://i.imgur.com/knh6xxN.jpg",
    "https://i.imgur.com/rISBJ4s.jpg", "https://i.imgur.com/nv3ng9X.jpg", "https://i.imgur.com/llMbCfd.jpg", 
    "https://i.imgur.com/8ijW3kL.jpg", "https://i.imgur.com/IEnBxBL.jpg", "https://i.imgur.com/sYYxJAF.jpg",
    "https://i.imgur.com/GzQljhX.jpg", "https://i.imgur.com/L1Th8vp.jpg", "https://i.imgur.com/fCZ5ISC.jpg"];
const img = document.getElementById("display");
img.src = images[ind];
const links = document.getElementsByTagName("a");
const link = links[0];
img.src = "./images/loading.gif";
var cache = new Image();
cache.onload = function () {
    img.src = images[ind];
}
cache.src = images[ind];
link.textContent = images[ind];
link.href = images[ind];
const prevButton = document.getElementById("previous");
prevButton.className = "disabled";
prevButton.addEventListener("click", function () {
    const img = document.getElementById("display");
    img.src = "./images/loading.gif";
    if (ind > 0){
        ind = ind - 1;
        if (nextButton.className === "disabled") {
            nextButton.className = "image-viewer__button";
        }
    }
    if (ind === 0){
        prevButton.className = "disabled";
    }
    var cache = new Image();
    cache.onload = function () {
        img.src = images[ind];
    }
    cache.src = images[ind];
    link.textContent = images[ind];
    link.href = images[ind];
});
const nextButton = document.getElementById("next");
nextButton.addEventListener("click", function () {
    const img = document.getElementById("display");
    img.src = "./images/loading.gif";
    if (ind < 17) {
        ind = ind + 1;
        if (prevButton.className === "disabled"){
            prevButton.className = "image-viewer__button";
        }
    }
    if (ind === 17) {
        nextButton.className = "disabled";
    }
    var cache = new Image();
    cache.onload = function () {
        img.src = images[ind];
    }
    img.src = images[ind];
    link.textContent = images[ind];
    link.href = images[ind];
});


