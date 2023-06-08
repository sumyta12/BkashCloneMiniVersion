import { errorMessage, dateTimeReturen, emojiResturn } from "./constant.js";
import { notfiyhtmltext } from "./htmltext.js";
import UserDetails from "./UserDetails.js";
const mainbalance = document.querySelector(".main-balance");
const fullModal = document.querySelector(".modal-class");
const modalbtn = document.querySelector("button");
const modalptag = document.querySelector(".modal-class p");
const heading = document.querySelector(".modal-class h3");
const inputpin = document.querySelector("input[type='password']");
const inputValue = document.querySelector("input[type='text']");

function displayOutputpinReturn() {
  inputpin.style.display = "none";
  let totalAmount = displayOutput()[0];
  const pinNumber = displayOutput()[1];
  return [pinNumber, totalAmount];
}

displayOutputpinReturn();

let btntext = ``;
let total = displayOutputpinReturn()[1];
let track = false;
const notificationArr = [];

function arrayFilForInOut(notificationArr) {
  let cashArr = 0;
  let inArr = 0;

  notificationArr.forEach((eachItem) => {
    if (eachItem.text === "ক্যাশ আউট") {
      cashArr = cashArr + eachItem.taka;
    } else {
      inArr = inArr + eachItem.taka;
    }
  });
  document.getElementById("incomming").textContent = inArr;
  document.getElementById("OutGoing").textContent = cashArr;
  return true;
}

function displayOneNotifyItem(item) {
  return notfiyhtmltext(item);
}

function notifactionDisplayOutput(displayarr) {
  let text = ``;
  for (let item of displayarr) {
    text += displayOneNotifyItem(item);
  }
  document.querySelector("#notification-slider").children[0].innerHTML =
    `<h1 class="text-center text-white">Notification</h1>` + text;
}

document.addEventListener("click", (e) => {
  let datasetId =
    e.target.dataset.id || e.target.parentElement.parentElement.dataset.id;

  if (datasetId === "1") {
    fullModal.style.display = "block";
    ModaltagtextContextChange(datasetId);
  } else if (datasetId === "2") {
    fullModal.style.display = "block";
    ModaltagtextContextChange(datasetId);
  } else if (e.target.className === "cross") {
    inputValue.style.display = "block";
    modalbtn.setAttribute("style", "background:;");
    document.querySelector(".modal-class i").style.display = "none";
    fullModal.style.display = "none";
  } else if (e.target.tagName.toLowerCase() === "button") {
    buttonActivityChange(e);
  }
});

function ModaltagtextContextChange(id) {
  inputValue.value = ``;
  const itemId = document.querySelector(`#item-${id} p`);
  modalptag.textContent = ` Hey ` + itemId.textContent;
  modalbtn.textContent = itemId.textContent;
  btntext = itemId.textContent;
  fullModal.id = `modalItem-${id}`;
  track = true;
}

function buttonActivityChange(e) {
  track = false;
  const id = e.target.parentElement.parentElement.id.slice(-1);

  const input = inputValueCheck(id, inputValue.value);

  if (!isNaN(input) && id && !track) {
    const parent = document.querySelector(`#item-${id}`).parentElement;

    parent.setAttribute("style", "cursor:not-allowed ;");
    // for (let child of parent.children) {
    //   child.setAttribute("style", "pointer-events:none;");
    // }

    textContentChange("none", "block", `Give Your Pin Number`, "proceesing");

    if (inputpin.value) {
      if (inputpin.value === displayOutputpinReturn()[0]) {
        inputValue.value = ``;
        textContentChange("none", "none", ``, ``);

        modalptag.textContent = ``;

        document.querySelector(".modal-class i").style.display = "block";
        parent.setAttribute("style", "cursor:pointer ;");
        // for (let child of parent.children) {
        //   child.setAttribute("style", "pointer-events:auto;");
        // }
        modalbtn.setAttribute("style", "background: transparent");
        const amountReturen = addSubstractionOutput(id, input);

        notficationArrayCreate(input);

        arrayFilForInOut(notificationArr);
        notifactionDisplayOutput(notificationArr);

        totalAmountUpdate(amountReturen);
      } else {
        inputpin.style.display = "block";
        totalAmountUpdate(total);
        errorMessage(heading, "Your Password is incorrect  Try again!");
      }

      inputpin.value = ``;
    }
  }
}
function notficationArrayCreate(input) {
  return notificationArr.unshift({
    date: dateTimeReturen().date,
    time: dateTimeReturen().timedata,
    taka: input,
    text: btntext,
    transictionId: notificationArr.length + 1,
  });
}
function textContentChange(inputstyle, pinstyle, text, modalbtntext) {
  inputValue.style.display = inputstyle;
  inputpin.style.display = pinstyle;
  modalptag.textContent = text;
  modalbtn.textContent = modalbtntext;
  return true;
}

function addSubstractionOutput(option, input) {
  if (option === "1") {
    return (total += input);
  } else if (option === "2") {
    if (total < input) {
      errorMessage(heading, "You have not enough money");
      //   return 0;
    } else {
      return (total -= input);
    }
  }
}

function inputValueCheck(id, number) {
  if (number.trim() === "" || isNaN(number.trim())) {
    errorMessage(heading, "You must specify a number");
  } else if (id === "2") {
    if (total < number) {
      errorMessage(heading, "You have not enough money");
    } else {
      const input = parseInt(number);
      errorMessage(heading, "");
      return input;
    }
  } else {
    const input = parseInt(number);
    errorMessage(heading, "");
    return input;
  }
}

function totalAmountUpdate(total) {
  document.querySelector(".level-el").textContent =
    "you get " + emojiResturn(total);
  return (mainbalance.textContent = "Balance : " + total);
}

function getAccurateUser() {
  const user = JSON.parse(localStorage.getItem("username"));
  const userResult = user === null ? [] : user;

  return UserDetails.filter((userinfo) => userinfo.email === userResult).map(
    (user) => {
      return {
        username: user.username,
        balance: user.balance,
        password: user.password,
        pin: user.pinNumber,
      };
    }
  )[0];
}

function displayOutput() {
  const userData = getAccurateUser();
  const nameofuser = document.querySelector(".name-of-user");
  const mainbalance = document.querySelector(".main-balance");

  nameofuser.textContent = userData.username;
  mainbalance.textContent = "Balance : " + userData.balance;

  return [parseInt(userData.balance), userData.pin];
}

document
  .querySelector(".bird-click-notification")
  .addEventListener("click", function (e) {
    const notificationslider = document.getElementById('notification-slider');
    if(notificationslider.classList[0] === 'hidden'){
        notificationslider.classList.remove('hidden');
        notificationslider.classList.add('block');
    }
   else{
    notificationslider.classList.add('hidden');
        notificationslider.classList.remove('block');
   }
});
