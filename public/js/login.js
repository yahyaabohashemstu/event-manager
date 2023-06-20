const accounts = [
  {
    name: "İsmail Arpa",
    username: "ismail",
    id: "00000",
    number: "05555555555",
    email: "ismail@gmail.com",
    address: "Ankara",
    password: 123456,
    eventsArr: [""],
  },
];

accounts.forEach((acc) => {
  if (!localStorage.getItem(`${acc.username}`)) {
    localStorage.setItem(`${acc.username}`, JSON.stringify(acc));
  } else {
    console.log(
      ` ${acc.username} Kullanıcı adı daha önce kayıt edilmiştir. Lütfen başka bir kullanıcı adı deneyiniz`
    );
  }
});
getAccounts();
const newAccounts = [];

const labelWelcome = document.querySelector(".welcome");
const btnLogin = document.querySelector(".login__btn"),
  inputLoginUsername = document.querySelector(".login__input--user"),
  inputLoginPin = document.querySelector(".login__input--password"),
  containerLogin = document.querySelector(".container__login"),
  pwShowHide = document.querySelectorAll(".showHidePw"),
  pwFields = document.querySelectorAll(".password"),
  signUp = document.querySelector(".signup-link"),
  login = document.querySelector(".login-link"),
  registrationFirstName = document.querySelector(".registration__input--firstname"),
  registrationLastName = document.querySelector(".registration__input--lastname"),
  registrationUsername = document.querySelector(
    ".registration__input--username"
  ),
  registrationId = document.querySelector(".registration__input--id"),
  registrationNumber = document.querySelector(".registration__input--number"),
  registrationEmail = document.querySelector(".registration__input--email"),
  registrationAddress = document.querySelector(".registration__input--address"),
  registrationPassword = document.querySelector(
    ".registration__input--password "
  ),
  btnSignUp = document.querySelector(".registration__signup");

pwShowHide.forEach((eyeIcon) => {
  eyeIcon.addEventListener("click", () => {
    pwFields.forEach((pwField) => {
      if (pwField.type === "password") {
        pwField.type = "text";

        pwShowHide.forEach((icon) => {
          icon.classList.replace("uil-eye-slash", "uil-eye");
        });
      } else {
        pwField.type = "password";

        pwShowHide.forEach((icon) => {
          icon.classList.replace("uil-eye", "uil-eye-slash");
        });
      }
    });
  });
});

window.onload =  function () {
  btnLogin?.addEventListener("click",async function (e) {
    e.preventDefault();

    if (inputLoginPin.value === "" || inputLoginUsername.value === "") {
      return alert("Lütfen tüm alanları doldurun");
    } else {
      const res = await fetch('/auth/login',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: inputLoginUsername.value,
          password: inputLoginPin.value
        })
      })
      if(res.status === 200){
        const data = await res.json()
        localStorage.setItem('access_token', JSON.stringify(data).access_token)
        window.location = '/';
      }else{
        return window.alert("Username veya parola hatalı");
      }
      if (
        currentAccount &&
        currentAccount.password === Number(inputLoginPin.value)
      ) {
        return (window.location.href = "calendar.html");
      } else if (inputLoginPin.value && inputLoginUsername.value) {
        inputLoginPin.value = "";
        return window.alert("Username veya parola hatalı");
      }
    }
  });
};

if (signUp) {
  signUp.addEventListener("click", () => {
    containerLogin.classList.add("active");
  });
}

if (login) {
  login.addEventListener("click", () => {
    containerLogin.classList.remove("active");
  });
}

btnSignUp.addEventListener("click", async() => {
  const firstname = registrationFirstName.value;
  const lastname = registrationLastName.value;
  const username = registrationUsername.value;
  const tc = registrationId.value;
  const phone = registrationNumber.value;
  const email = registrationEmail.value;
  const address = registrationAddress.value;
  const password = (registrationPassword.value);

  if (
    firstname === "" ||
    lastname === "" ||
    username === "" ||
    tc === "" ||
    phone === "" ||
    email === "" ||
    address === "" ||
    password === ""
  ) {
    return alert("Lütfen tüm alanları doldurunuz!");
  }
const res = await fetch('/auth/register',{
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    first_name: firstname,
    last_name: lastname,
    username,
    tc,
    phone,
    email,
    address,
    password
  })
});
if(res.status === 200){
  const data = await res.json()
  localStorage.setItem('access_token', JSON.stringify(data).access_token)
  window.location = '/';
}else{
  return window.alert(res.data);
}
  // newAccounts.forEach((acc) => {
  //   if (!localStorage.getItem(`${acc.username}`)) {
  //     localStorage.setItem(`${acc.username}`, JSON.stringify(acc));
  //     accounts.push(acc);
  //     saveAccounts();
  //     newAccounts.pop();
  //     alert(
  //       "Kayıt olma işleminiz başarıyla tamamlandı. Giriş  ekranına yönlendiriliyorsunuz.."
  //     );
  //     window.location.href = "login.html";
  //   } else {
  //     newAccounts.pop();
  //     return alert(
  //       ` ${acc.username} Kullanıcı adı daha önce kayıt edilmiştir. Lütfen başka bir kullanıcı adı deneyiniz`
  //     );
  //   }
  // });
});

function saveAccounts() {
  localStorage.setItem("accounts", JSON.stringify(accounts));
}

function getAccounts() {
  if (localStorage.getItem("accounts") === null) {
    return;
  }
  accounts.push(...JSON.parse(localStorage.getItem("accounts")));
}
