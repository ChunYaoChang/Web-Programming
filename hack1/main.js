// TODO:
var input = document.getElementById("comment-input");
var comm_but = document.getElementById("comment-button");
var cancel_but = document.getElementById("cancel-button");
var cells = document.getElementById("comment-group");
var comm_num = document.getElementById("comment-num");
var comm_count = 1;

input.addEventListener('keyup', function () {
    if (input.value.trim() != "") {
        comm_but.disabled = false;
        comm_but.style["background-color"] = "#065fd4";

    } else {
        comm_but.disabled = true;
        comm_but.style["background-color"] = "#cccccc";
    }
});

input.addEventListener('click', function () {
    comm_but.style["display"] = "block";
    cancel_but.style["display"] = "block";
});

comm_but.addEventListener('click', function () {
    const div = document.createElement('div');

    div.className = 'comment';

    div.innerHTML = `<img class="comment-img" src="images/user-icon.jpg"/>
    <div class="comment-right">
        <div>
            <span class="comment-name">Toby Chen</span>
            <span class="comment-time">現在</span>
        </div>
        <p class="comment-text">` + input.value.trim() + `</p>
    </div>
    `
    cells.appendChild(div);
    comm_count += 1;
    comm_num.innerText = comm_count + "則留言";
    // console.log(comm_num.value);
    input.value = "";
    comm_but.style["background-color"] = "#cccccc";
    comm_but.disabled = true;
});

cancel_but.addEventListener('click', function () {
    comm_but.disabled = true;
    comm_but.style["background-color"] = "#cccccc";
    input.value = "";
    comm_but.style["display"] = "none";
    cancel_but.style["display"] = "none";
})
