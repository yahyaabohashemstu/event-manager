const goCalendarBtn = document.querySelector(".btn__calendar");
const table = document.querySelector("tbody");
let user = {};
const checkUser =async ()=>{
  if(!localStorage.getItem('access_token')){
    window.location.href = '/login'
  }else{
    const res = fetch('/auth/profile',{
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${(localStorage.getItem('access_token'))}`
      }
    })

    if(res.status === 200){
      const data = await res.json()
      user = data;
    }
    else{
      window.location.href = '/login'
    }
  }
}
checkUser()
goCalendarBtn.addEventListener(
  "click",
  () => (window.location.href = "calendar.html")
);

const eventsArray = [];
function getEvents() {
  if (localStorage.getItem("events") === null) {
    return;
  }
  eventsArray.push(...JSON.parse(localStorage.getItem("events")));
}
getEvents();

let index = 0;
function addUserHTML(event) {
  let gün = event.day + "";
  let ay = event.month + "";
  let yıl = event.year;
  index += 1;

  gün = gün.length == 1 ? `0${gün}` : gün;
  ay = ay.length == 1 ? `0${ay}` : ay;

  let html = `
  <tr class='table-row'>
    <td>${index}</td>
    <td>${event.title}</td>
    <td>${event.eventType}</td>
    <td>${gün}/${ay}/${yıl}</td>
    <td><strong>${event.timeFrom}</strong></td>
    <td><strong>${event.timeTo}</strong></td>
  </tr>
  `;

  table.insertAdjacentHTML("beforeend", html);
}

eventsArray.forEach((event) => {
  event.events.forEach((birOlay) => {
    addUserHTML(birOlay);
  });
});

const currentAccount = JSON.parse(localStorage.getItem("currentAccount"));
