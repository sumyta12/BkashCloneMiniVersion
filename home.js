import { errorMessage } from "./constant.js";
const mainbalance = document.querySelector(".main-balance");
const fullModal = document.querySelector(".modal-class");
const modalbtn = document.querySelector("button");
const modalptag = document.querySelector(".modal-class p");
const heading = document.querySelector(".modal-class h3");

let totalAmount = parseInt(mainbalance.textContent);
let total = totalAmount;
const pinNumber = "1234";
let remain = false;

document.addEventListener("click", (e) => {
  let datasetId =
    e.target.dataset.id || e.target.parentElement.parentElement.dataset.id;

  if (datasetId === "1") {
    ModaltagtextContextChange(datasetId);
  } else if (datasetId === "2") {
    ModaltagtextContextChange(datasetId);
  } else if (e.target.className === "cross") {
    fullModal.style.display = "none";
  } else if (e.target.tagName.toLowerCase() === "button") {
    buttonActivityChange(e);
  }
});

function ModaltagtextContextChange(id) {
  const itemId = document.querySelector(`#item-${id} p`);
  modalptag.textContent = ` Hey ` + itemId.textContent;
  modalbtn.textContent = itemId.textContent;
  fullModal.id = `modalItem-${id}`;
}
function buttonActivityChange(e) {
  const id = e.target.parentElement.parentElement.id.slice(-1);
  const inputpin = document.querySelector("input[type='password']");
  const inputValue = document.querySelector("input[type='text']");

  const input = inputValueCheck(id, inputValue.value);

  if (!isNaN(input) && id) {
    inputValue.style.display = "none";
    inputpin.style.display = "block";
    textContentChange(`Give Your Pin Number`);
    modalbtn.textContent = "proceesing";
    if (inputpin.value) {
      if (inputpin.value === pinNumber) {
        modalptag.textContent = ``;
        inputpin.style.display = "none";
        document.querySelector("i").style.display = "block";
        modalbtn.setAttribute("style", "background: transparent");
        const amountReturen = addSubstractionOutput(id, input);

        totalAmountUpdate(amountReturen);
      } else {
        errorMessage(heading, "Your Password is incorrect  Try again!");
      }
    }
  }
}
function textContentChange(text) {
  modalptag.textContent = text;
  return true;
}

function addSubstractionOutput(id, input) {
  if (id === "1") {
    return (total += input);
  } else if (id === "2") {
    console.log(total, input, total > input);
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
