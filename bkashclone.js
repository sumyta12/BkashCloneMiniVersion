import { errorMessage } from "./constant.js";
import { loadingHtmlText } from "./htmltext.js";
let validationResult = false;
const form = document.querySelector("form");
form.addEventListener("submit", formGetUserDataOutput);

function formGetUserDataOutput(e) {
  e.preventDefault();
  const user = {};
  const form = new FormData(e.target);
  const formData = Object.fromEntries(form);
  for (let [key, value] of Object.entries(formData)) {
    if (value.trim() === "") {
      validationResult = false;
      return errorMessage(e.target.children[2], `${key} must not be empty`);
    }
    user[key] = value;
    validationResult = true;
    if (validationResult && user.username && user.password) {
      errorMessage(e.target.children[2], "");
      setTimeoutCall(user.username);
    }
  }
  console.log(validationResult, user);
}
function setTimeoutCall(username) {
  let result = false;
  setTimeout(() => {
    form.innerHTML = loadingHtmlText(username);
    result = true;
  }, 1500);
  if (result) {
    setTimeout(() => {
      window.location.assign("./Home.html");
    }, 3000);
  }
}
