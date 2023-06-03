import { errorMessage } from "./constant.js";
const mainbalance = document.querySelector(".main-balance");
const fullModal = document.querySelector(".modal-class");
const modalbtn = document.querySelector("button");
const modalptag = document.querySelector(".modal-class p");

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
  }
});

function ModaltagtextContextChange(id) {
  const itemId = document.querySelector(`#item-${id} p`);
  modalptag.textContent = ` Hey ` + itemId.textContent;
  modalbtn.textContent = itemId.textContent;

  fullModal.id = `modalItem-${id}`;
}

modalbtn.addEventListener("click", (e) => {
  const modalp = modalptag.textContent;
  const inputValue = document.querySelector("input[type='text']").value;
  const id = e.target.parentElement.parentElement.id.slice(-1);
  if (id) {
    const input = inputValueCheck(inputValue);
    const amountReturen = addSubstractionOutput(id, input);
    totalAmountUpdate(amountReturen);
  }
});
function addSubstractionOutput(id, input) {
  if (id === "1") {
    return (total += input);
  } else {
    return (total -= input);
  }
}
function inputValueCheck(number) {
  const heading = document.querySelector(".modal-class h3");
  if (number.trim() === "") {
    errorMessage(heading, "You must specify a number");
  } else {
    const input = parseInt(number);
    errorMessage(heading, "");
    return input;
  }
}

function totalAmountUpdate(total) {
  return (mainbalance.textContent = total);
}
