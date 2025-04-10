class IngredientSearch {
  constructor() {
    this.ingredientInput = document.querySelector("#ingredient");
    this.iconSearch = document.querySelector("#search");
  }
  getMealsbyIngredient = async () => {
    await fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?i=${this.ingredientInput.value}`
    ).then(async (response) => {
      let data = await response.json();
      data.meals.map(() => {
        const happyMeal = new Meal();
        happyMeal.insertMeal();
      });
    });
  };
}

const SearchIngredient = new IngredientSearch();
SearchIngredient.getMealsbyIngredient("Chicken");
