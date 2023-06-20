let alarmTime, isAlarmSet, eventTitle;
ringtone = new Audio("./mp3/ringtone.mp3");

setInterval(() => {
  let date = new Date(),
    h = date.getHours(),
    m = date.getMinutes(),
    s = date.getSeconds(),
    ampm = "AM";
  if (h >= 12) {
    h = h - 12;
    ampm = "PM";
  }
  h = h == 0 ? (h = 12) : h;
  h = h < 10 ? "0" + h : h;
  m = m < 10 ? "0" + m : m;
  s = s < 10 ? "0" + s : s;

  if (isAlarmSet && alarmTime === `${h}:${m} ${ampm}`) {
    ringtone.play();
    ringtone.loop = true;
    setTimeout(() => {
      if (isAlarmSet && confirm(`${eventTitle} etkinliğinizin saati geldi!`)) {
        ringtone.pause();
        return (isAlarmSet = false);
      }
    }, 2000);
  }
});

function setAlarm(eventTime, eventTit) {
  eventTitle = eventTit;
  alarmTime = eventTime;
  isAlarmSet = true;
  console.log("Alarm time atandı", alarmTime);
}
