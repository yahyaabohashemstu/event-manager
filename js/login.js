const accounts = [
  {
    name: "Yahya ABO HASHEM",
    username: "yahya",
    id: "00001",
    number: "05555555555",
    email: "yahya@gmail.com",
    address: "gaziantep",
    password: 123456,
    eventsArr: [""],
  },
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
  registrationName = document.querySelector(".registration__input--name"),
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

window.onload = function () {
  btnLogin?.addEventListener("click", function (e) {
    e.preventDefault();

    if (inputLoginPin.value === "" || inputLoginUsername.value === "") {
      return alert("Lütfen tüm alanları doldurun");
    } else {
      let currentAccount = accounts.find(
        (acc) => acc.username === inputLoginUsername.value
      );
      localStorage.setItem("currentAccount", JSON.stringify(currentAccount));

      if (
        currentAccount &&
        currentAccount.password === Number(inputLoginPin.value)
      ) {
        return (window.location.href = "calendar.html");
      } else if (inputLoginPin.value && inputLoginUsername.value) {
        inputLoginPin.value = "";
        inputLoginUsername.value = "";
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

btnSignUp.addEventListener("click", () => {
  const name = registrationName.value;
  const username = registrationUsername.value;
  const id = registrationId.value;
  const number = registrationNumber.value;
  const email = registrationEmail.value;
  const address = registrationAddress.value;
  const password = Number(registrationPassword.value);

  if (
    name === "" ||
    username === "" ||
    id === "" ||
    number === "" ||
    email === "" ||
    address === "" ||
    password === ""
  ) {
    return alert("Lütfen tüm alanları doldurunuz!");
  }

  newAccounts.push({
    name: name,
    username: username,
    id: id,
    number: number,
    email: email,
    address: address,
    password: password,
    eventsArr: [],
  });

  newAccounts.forEach((acc) => {
    if (!localStorage.getItem(`${acc.username}`)) {
      localStorage.setItem(`${acc.username}`, JSON.stringify(acc));
      accounts.push(acc);
      saveAccounts();
      newAccounts.pop();
      alert(
        "Kayıt olma işleminiz başarıyla tamamlandı. Giriş  ekranına yönlendiriliyorsunuz.."
      );
      window.location.href = "index.html";
    } else {
      newAccounts.pop();
      return alert(
        ` ${acc.username} Kullanıcı adı daha önce kayıt edilmiştir. Lütfen başka bir kullanıcı adı deneyiniz`
      );
    }
  });
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
