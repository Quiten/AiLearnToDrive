const timer = document.getElementById('stopwatch');

var hr = 0;
var minuten = 0;
var sec = 0;
var stoptime = true;

function startTimer() {
    if (stoptime == true) {
        stoptime = false;
        timerCycle();
    }
}
function stopTimer() {
    if (stoptime == false) {
        stoptime = true;
    }
}

function timerCycle() {
    if (stoptime == false) {
    sec = parseInt(sec);
    minuten = parseInt(minuten);
    hr = parseInt(hr);

    sec = sec + 1;

    if (sec == 60) {
        minuten = minuten + 1;
      sec = 0;
    }

    if (minuten == 60) {
      hr = hr + 1;
      minuten = 0;
      sec = 0;
    }

    if (sec < 10 || sec == 0) {
      sec = '0' + sec;
    }
    if (minuten < 10 || minuten == 0) {
        minuten = '0' + minuten;
    }
    if (hr < 10 || hr == 0) {
      hr = '0' + hr;
    }

    document.getElementById('stopwatch').textContent = (hr + ':' + minuten + ':' + sec);

    setTimeout("timerCycle()", 1000);
  }
}

function resetTimer() {
    document.getElementById('stopwatch').textContent = '00:00:00';
    UIupdate();
    sec = 0;
    minuten = 0;
    hr = 0;
}