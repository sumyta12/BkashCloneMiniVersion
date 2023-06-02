const mainbalance = document.querySelector(".main-balance");
const modalclass = document.querySelector(".modal-class button");

let totalAmount = parseInt(mainbalance.textContent);
const pinNumber = "1234";

document.addEventListener("click", (e) => {
  const datasetId =
    e.target.dataset.id || e.target.parentElement.parentElement.dataset.id;
  if (datasetId === "1") {
    ModalChangeFunctionality(datasetId);
  } else if (datasetId === "2") {
    ModalChangeFunctionality(datasetId);
  }
});
function ModalChangeFunctionality(id) {
  document.querySelector(".modal-class p").textContent = document.querySelector(
    `#item-${id} p`
  ).textContent;
  modalclass.addEventListener("click", (e) => {
    const inputtext = e.target.parentElement.children[1].tagName;
    const input = parseInt(document.querySelector(`${inputtext}`).value);
    let total = totalAmount;
    if (id === "1") {
      total += input;
      console.log(total);
    }
    if (id === "2") {
      if (total > input) {
        total -= input;
      }
    }
    mainbalance.textContent = total;
  });
}
