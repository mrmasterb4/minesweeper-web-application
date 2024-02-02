document.addEventListener ("click", function(e) {
    if (e.target.id == "reset") {
        startTimer();
    }
    else if (e.target.id == "result") {
        startTimer();
    }
    else if (e.target.id == "start") {
        startTimer();
    }
    else if (e.target.classList.contains("b")) {
        stopTimer();
    }
})

var timer = false;
var timeid = 0;
timerspan = document.getElementById("timerspan");
var d = new Date();
var n = new Date();

function startTimer() {
    d = new Date();
}
function stopTimer() {
    console.log(d);
    n = new Date();
    timer = false;
}