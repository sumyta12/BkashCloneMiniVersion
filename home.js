import { errorMessage } from "./constant.js";
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

let total = displayOutputpinReturn()[1];
let track = false;

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
    document.querySelector("i").style.display = "none";
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
    for (let child of parent.children) {
      child.setAttribute("style", "pointer-events:none;");
    }

    textContentChange("none", "block", `Give Your Pin Number`, "proceesing");

    if (inputpin.value) {
      if (inputpin.value === displayOutputpinReturn()[0]) {
        inputValue.value = ``;
        textContentChange("none", "none", ``, ``);
        modalptag.textContent = ``;
        document.querySelector("i").style.display = "block";
        parent.setAttribute("style", "cursor:pointer ;");
        for (let child of parent.children) {
          child.setAttribute("style", "pointer-events:auto;");
        }
        modalbtn.setAttribute("style", "background: transparent");
        const amountReturen = addSubstractionOutput(id, input);

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
function textContentChange(inputstyle, pinstyle, text, modalbtntext) {
  inputValue.style.display = inputstyle;
  inputpin.style.display = pinstyle;
  modalptag.textContent = text;
  modalbtn.textContent = modalbtntext;
  return true;
}

function addSubstractionOutput(id, input) {
  if (id === "1") {
    return (total += input);
  } else if (id === "2") {
    if (total < input) {
      return 0;
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
  return (mainbalance.textContent = total);
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
  mainbalance.textContent = userData.balance;

  return [parseInt(userData.balance), userData.pin];
}
