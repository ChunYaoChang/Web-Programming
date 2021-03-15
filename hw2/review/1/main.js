const pictures = ["https://img.ltn.com.tw/Upload/news/600/2020/10/23/phpfXr29X.jpg","https://img.ttshow.tw/images/author/peggy/101666975_679535829290250_1586175951206136486_n%20(1).jpg","https://images.900.tw/upload_file/51/content/375abe71-5d30-8e10-7dee-ad0be331e374.jpg"]
const display = document.getElementById("display")
display.src = pictures[0]
var num = 0
const back = document.getElementById("back")
const next = document.getElementById("next")
back.className = "image-viewer__button disabled";
back.onclick = () => {
    if(num !== 0){
        num = num - 1;
        display.src = pictures[num]
        if(num === 0)
            back.className = "image-viewer__button disabled";
        next.className = "image-viewer__button";
    }
}
next.onclick = () => {
    if(num !== pictures.length - 1){
        num = num + 1;
        display.src = pictures[num]
        if(num === pictures.length - 1)
            next.className = "image-viewer__button disabled";
        back.className = "image-viewer__button";
    }
}
