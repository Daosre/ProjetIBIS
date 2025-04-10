class Meal {
  constructor(id, text, thumb) {
    (this.id = id),
      (this.text = text),
      (this.thumb = thumb),
      (this.mealsArticle = document.querySelector("#meals"));
  }
  getMoreDetail = async () => {
    await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${this.id}`).then(
      async (response) => {
        let data = await response.json();
        this.insertMeal(data);
        console.log(data);
      }
    );
  };
  insertMeal = async (data) => {
    let articleMeal = document.createElement("article");
    articleMeal.classList.add("meal");
    let imgMeal = document.createElement("img");
    imgMeal.src = this.thumb;
    articleMeal.appendChild(imgMeal);
    let titleMeal = document.createElement("h3");
    titleMeal.innerText = this.text;
    articleMeal.appendChild(titleMeal);
    let ingredientSection = document.createElement("section");
    let titleIngredientSection = document.createElement("h4");
    titleIngredientSection.innerText = "Ingredient List :";
    ingredientSection.appendChild(titleIngredientSection);
    let listIngredient = document.createElement("ul");
    for (let i = 1; i < 21; i++) {
      if (data.meals[0][`strIngredient${i}`]) {
        let ingredient = document.createElement("li");
        ingredient.innerText = data.meals[0][`strIngredient${i}`];
        listIngredient.appendChild(ingredient);
      }
    }
    ingredientSection.appendChild(listIngredient);
    articleMeal.appendChild(ingredientSection);
    let instructionSection = document.createElement("section");
    let titleInstructionSection = document.createElement("h4");
    titleInstructionSection.innerText = "Instructions :";
    instructionSection.appendChild(titleInstructionSection);
    let textInstruction = document.createElement("p");
    textInstruction.innerText = data.meals[0].strInstructions;
    instructionSection.appendChild(textInstruction);
    articleMeal.appendChild(instructionSection);
    this.mealsArticle.appendChild(articleMeal);
  };
}
