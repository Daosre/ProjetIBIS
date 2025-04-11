const searchBtn = document.querySelector("#searchBtn");

class IngredientSearch {
  constructor() {}
  getMealsbyIngredient = async () => {
    let ingredientInput = document.querySelector("#ingredient");
    await fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredientInput.value}`
    ).then(async (response) => {
      let data = await response.json();
      data.meals.map((meal) => {
        const happyMeal = new Meal(
          meal.idMeal,
          meal.strMeal,
          meal.strMealThumb
        );
        happyMeal.getMoreDetail();
      });
    });
  };
}
const SearchIngredient = new IngredientSearch();

searchBtn.addEventListener("click", () => {
  clearMeals();
  SearchIngredient.getMealsbyIngredient();
});
