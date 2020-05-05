var oCountup = document.getElementById("countup");
var oCountdown = document.getElementById("countdown");
var oTime = document.getElementById("time");
var oPause = document.getElementById("pause");
var oRestart = document.getElementById("restart");
var oClear = document.getElementById("clear");
var oResume = document.getElementById("resume");
var oTip = document.getElementsByClassName("tip");
var oTime_input = document.getElementsByClassName("time_input");
var oHint = document.getElementById("hint");
var oHour = document.getElementById("hour").value;
var oMinute = document.getElementById("minute").value;
var oSecond = document.getElementById("second").value;
var CountUpEvent = document.createEvent("MouseEvents");
var PauseEvent = document.createEvent("MouseEvents");
var ResumeEvent = document.createEvent("MouseEvents");
var timeSum;
var sum = 0;
var direct;
var CountDownTimer;
var CountUpTimer;
var finalTimer;
var oDate;
var oDate1;
var oDate2;
var subtime;
var state = 0;
//state=0 开始；state=1 计时；state=2暂停
CountUpEvent.initEvent("click", true, true);
PauseEvent.initEvent("click", true, true);
ResumeEvent.initEvent("click", true, true);

function to_time(t) {
    var t1 = t + "";
    if (t1.length < 2) {
        t1 = "0" + t;
        return t1;
    } else
        return t1;
}

function final() {
    if (direct === -1) {
        if (timeSum === 0) {
            clearInterval(CountDownTimer);
            oPause.style.display = "none";
            oHint.value = "倒计时 " + to_time(oHour) + ":" + to_time(oMinute) + ":" + to_time(oSecond) + " 已结束";
        }
    } else {
        if (timeSum === sum) {
            clearInterval(CountUpTimer);
            oPause.style.display = "none";
            oHint.value = "正计时 " + to_time(oHour) + ":" + to_time(oMinute) + ":" + to_time(oSecond) + " 已结束";
        }
    }
}

//倒计时
function time_change_down() {
    timeSum -= 1;
    var oHourNew = parseInt(timeSum / 3600);
    var temp = timeSum % 3600;
    var oMinuteNew = parseInt(temp / 60);
    var oSecondNew = temp % 60;
    oTime.value = to_time(oHourNew) + ":" + to_time(oMinuteNew) + ":" + to_time(oSecondNew);
}

//正计时
function time_change_up() {
    timeSum += 1;
    var oHourNew = parseInt(timeSum / 3600);
    var temp = timeSum % 3600;
    var oMinuteNew = parseInt(temp / 60);
    var oSecondNew = temp % 60;
    oTime.value = to_time(oHourNew) + ":" + to_time(oMinuteNew) + ":" + to_time(oSecondNew);
}

function start_count() {
    oCountup.style.display = "none";
    oCountdown.style.display = "none";
    oResume.style.display = "none";
    oClear.style.display = "block";
    oPause.style.display = "block";
    oRestart.style.display = "block";
    oHint.style.display = "block";
    var i;
    for (i = 0; i < oTip.length; i++) {
        oTip[i].style.display = "none";
    }
    for (i = 0; i < oTime_input.length; i++) {
        oTime_input[i].style.display = "none";
    }
    if (direct === -1) {
        if (timeSum === 0) {
            clearInterval(CountDownTimer);
            oPause.style.display = "none";
            oHint.value = "倒计时 " + to_time(oHour) + ":" + to_time(oMinute) + ":" + to_time(oSecond) + " 已结束";
        } else {
            state = 1;
            oHint.value = "正在倒计时 " + to_time(oHour) + ":" + to_time(oMinute) + ":" + to_time(oSecond);
            CountDownTimer = setInterval(time_change_down, 1000);
            finalTimer = setInterval(final, 1);
        }
    } else {
        if (timeSum === sum) {
            clearInterval(CountUpTimer);
            oPause.style.display = "none";
            oHint.value = "正计时 " + to_time(oHour) + ":" + to_time(oMinute) + ":" + to_time(oSecond) + " 已结束";
        } else {
            state = 1;
            oHint.value = "正在正计时 " + to_time(oHour) + ":" + to_time(oMinute) + ":" + to_time(oSecond);
            CountUpTimer = setInterval(time_change_up, 1000);
            finalTimer = setInterval(final, 1);
        }
    }
}

oCountdown.onclick = function () {
    oDate = Date.now();
    oHour = document.getElementById("hour").value;
    oMinute = document.getElementById("minute").value;
    oSecond = document.getElementById("second").value;
    if (oHour === null || oHour === undefined || oHour === '')
        oHour = "0";
    if (oMinute === null || oMinute === undefined || oMinute === '')
        oMinute = "0";
    if (oSecond === null || oSecond === undefined || oSecond === '')
        oSecond = "0";
    if (parseInt(oMinute) > 59)
        oMinute = "59";
    if (parseInt(oSecond) > 59)
        oSecond = "59";
    sum = parseInt(oHour) * 3600 + parseInt(oMinute) * 60 + parseInt(oSecond);
    timeSum = sum;
    direct = -1;
    start_count();
};
oCountup.onclick = function () {
    oDate = Date.now();
    oHour = document.getElementById("hour").value;
    oMinute = document.getElementById("minute").value;
    oSecond = document.getElementById("second").value;
    if (oHour === null || oHour === undefined || oHour === '')
        oHour = "0";
    if (oMinute === null || oMinute === undefined || oMinute === '')
        oMinute = "0";
    if (oSecond === null || oSecond === undefined || oSecond === '')
        oSecond = "0";
    if (parseInt(oMinute) > 59)
        oMinute = "59";
    if (parseInt(oSecond) > 59)
        oSecond = "59";
    sum = parseInt(oHour) * 3600 + parseInt(oMinute) * 60 + parseInt(oSecond);
    timeSum = 0;
    direct = 1;
    start_count();
};
oRestart.onclick = function () {
    oRestart.blur();
    clearInterval(finalTimer);
    state = 1;
    if (direct === -1) {
        clearInterval(CountDownTimer);
        timeSum = sum;
        start_count();
    } else {
        clearInterval(CountUpTimer);
        timeSum = 0;
        start_count();
    }
};
oClear.onclick = function () {
    oClear.blur();
    state = 0;
    clearInterval(CountDownTimer);
    clearInterval(CountUpTimer);
    oTime.value = "00:00:00";
    document.getElementById("hour").value = null;
    document.getElementById("minute").value = null;
    document.getElementById("second").value = null;
    oCountup.style.display = "block";
    oCountdown.style.display = "block";
    oResume.style.display = "none";
    oClear.style.display = "none";
    oPause.style.display = "none";
    oRestart.style.display = "none";
    oHint.style.display = "none";
    var i;
    for (i = 0; i < oTip.length; i++) {
        oTip[i].style.display = "block";
    }
    for (i = 0; i < oTime_input.length; i++) {
        oTime_input[i].style.display = "block";
    }
};
oPause.onclick = function () {
    oDate1 = Date.now();
    state = 2;
    subtime = 1000 - (oDate1 - oDate) % 1000;
    oPause.style.display = "none";
    oResume.style.display = "block";
    if (direct === -1) {
        oHint.value = "暂停倒计时 " + to_time(oHour) + ":" + to_time(oMinute) + ":" + to_time(oSecond);
        clearInterval(CountDownTimer);
    } else {
        oHint.value = "暂停正计时 " + to_time(oHour) + ":" + to_time(oMinute) + ":" + to_time(oSecond);
        clearInterval(CountUpTimer);
    }
};
oResume.onclick = function () {
    oPause.style.display = "block";
    oResume.style.display = "none";
    state = 1;
    if (direct === -1)
        oHint.value = "正在倒计时 " + to_time(oHour) + ":" + to_time(oMinute) + ":" + to_time(oSecond);
    else
        oHint.value = "正在正计时 " + to_time(oHour) + ":" + to_time(oMinute) + ":" + to_time(oSecond);
    setTimeout(function () {
        if (direct === -1) {
            time_change_down();
            CountDownTimer = setInterval(time_change_down, 1000);
        } else {
            time_change_up();
            CountUpTimer = setInterval(time_change_up, 1000)
        }
    }, subtime);
};
window.onkeyup = function (keyboard) {
    if (keyboard.key === "Enter" && state === 0) {
        oCountup.dispatchEvent(CountUpEvent);
        oCountup.onclick;
    } else if (keyboard.keyCode === 32) {
        if (state === 1) {
            oPause.dispatchEvent(PauseEvent);
            oPause.onclick;
        } else if (state === 2) {
            oResume.dispatchEvent(ResumeEvent);
            oResume.onclick;
        }
    }
};