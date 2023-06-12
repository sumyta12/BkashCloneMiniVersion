const allnumberdisplay = document.querySelector(".allnumberdisplay");

calenderdateResturn();

function calenderdateResturn() {
  const number = Array.from(Array(30), (v, i) => i);
  let text = ``;

  for (let num in number) {
    text += `
    <div
        data-calenderid ='${parseInt(num) + 1}'
        class=" rounded-lg w-2/12  bg-green-950 h-40 mt-8 shadow-lg shadow-[#e2136e]-500/50 flex flex-col justify-center items-center">
        <div></div>
        <div class="mb-8">
        <h4
            class="text-pink-700"
            style="
            font-family: 'Bellefair', serif;
            font-weight: 300;
            font-size: 32px;
            ">
            ${parseInt(num) + 1}
        </h4>
        </div>
        <div class='display-output-into-${parseInt(num) + 1}'></div>
    </div>
    `;
  }

  allnumberdisplay.innerHTML = text;
}
let click = false;
document.addEventListener("click", function (e) {
  if (e.target.dataset.calenderid) {
    if (!click) {
      const calenderdata = e.target.dataset.calenderid;
      const input = document.createElement("input");
      const button = document.createElement("button");
      input.placeholder = "save info";
      input.type = "text";
      button.textContent = `click`;
      button.id = calenderdata;
      button.classList.add("calenderbtn");

      e.target.children[0].appendChild(input);
      e.target.children[0].appendChild(button);
      click = true;
    }
  } else if (e.target.classList.value === "calenderbtn") {
    const input = e.target.parentElement.children[0];
    if (input.value) {
      click = false;
    }
    const info = {
      inputtext: input.value,
      id: e.target.id,
    };
    const displayoutputinto = document.querySelector(
      `.display-output-into-${info.id}`
    );
    displayoutputinto.innerHTML += `<h1 class="text-white">${info.inputtext}</h1>`;
    input.value = "";
    if(!click){
      input.remove();
      e.target.remove();
    }
  }
});
