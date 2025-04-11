//récupération des elements tooltip
const tooltip = document.querySelector("#tooltip");
const imgTooltip = document.querySelector(".imgTooltip");
const textTooltip = document.querySelector(".textTooltip");
//affiche le tooltip en fonction de l'ingrédient
function showTooltip(image, text) {
  imgTooltip.src = `https://www.themealdb.com/images/ingredients/${image}.png`;
  textTooltip.innerText = text;
  tooltip.style.display = "block";
}
//cache le tooltip 
function hideTooltip() {
  tooltip.style.display = "none";
}
//déplace le tooltip en fonction de l'emplacement de la souris.
document.body.addEventListener("mousemove", (e) => {
  tooltip.style.top = `${e.clientY + 15}px`;
  tooltip.style.left = `${e.clientX + 15}px`;
});
