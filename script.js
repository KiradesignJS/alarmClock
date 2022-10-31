const currentTime = document.querySelector("h1"),
content = document.querySelector(".content"),
selectMenu = document.querySelectorAll("select"),
setAlarmBtn = document.querySelector("button");

let alarmTime, isAlarmSet = false;
music = new Audio("sound.wav");

for (let i = 12; i > 0; i--) {  //values for hour
    i = i < 10 ? "0" + i : i;
    let option = `<option value="${i}">${i}</option>`;
    selectMenu[0].firstElementChild.insertAdjacentHTML("afterend", option);
}

for (let i = 59; i >= 0; i--) {  //values for minutes
  i = i < 10 ? "0" + i : i;
  let option = `<option value="${i}">${i}</option>`;
  selectMenu[1].firstElementChild.insertAdjacentHTML("afterend", option);
}

for (let i = 2; i > 0; i--) {  //values for am or pm
  let ampm = i == 1 ? "AM" : "PM";
  let option = `<option value="${ampm}">${ampm}</option>`;
  selectMenu[2].firstElementChild.insertAdjacentHTML("afterend", option);
}

setInterval (() => {
  let date = new Date(), //add hour, minutes and secs
  h = date.getHours(),
  m = date.getMinutes(),
  s = date.getSeconds(),
  ampm = "AM";

  if(h >= 12) {
    h = h - 12;
    ampm = "PM";
  }

  h = h ==0 ? h = 12 : h; // if hour is 0 set this value to 12

  h = h < 10 ? "0" + h : h; //add 0 before if value less than 10
  m = m < 10 ? "0" + m : m;
  s = s < 10 ? "0" + s : s;

  currentTime.innerText =`${h}:${m}:${s} ${ampm}`;

  if(alarmTime == `${h}:${m} ${ampm}`) {  //adding sound to alarm
    music.play();
    music.loop = true;
  }
}, 1000);

function setAlarm() {
  if(isAlarmSet) { //is isAlarmSet true
    alarmTime = "";
    music.pause();
    content.classList.remove("disable");
    setAlarmBtn.innerText = "Set Alarm";
    return isAlarmSet = false; //return isAlarmSet value to false
  }

  //choose time for alarm
  let time = `${selectMenu[0].value}:${selectMenu[1].value} ${selectMenu[2].value}`;
  
  if(time.includes("Hour") || time.includes("Minute") ||time.includes("AM/PM")) {
    return alert ("You didn't choose when to wake up!"); //click on alarm button without choosing time
  }

  isAlarmSet = true;
  alarmTime = time;
  content.classList.add("disable");
  setAlarmBtn.innerText = "New Alarm";
}

setAlarmBtn.addEventListener("click", setAlarm);