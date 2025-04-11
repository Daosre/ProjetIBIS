const tooltip = document.querySelector("#tooltip");
const imgTooltip = document.querySelector(".imgTooltip");
const textTooltip = document.querySelector(".textTooltip");
function showTooltip(data, text) {
  imgTooltip.src = `https://www.themealdb.com/images/ingredients/${data}.png`;
  textTooltip.innerText = text;
  tooltip.style.display = "block";
}
function hideTooltip() {
  tooltip.style.display = "none";
}

document.body.addEventListener("mousemove", (e) => {
  tooltip.style.top = `${e.clientY + 15}px`;
  tooltip.style.left = `${e.clientX + 15}px`;
});
