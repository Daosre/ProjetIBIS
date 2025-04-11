//récupération du bouton de la recherche par ingrédient
const searchBtn = document.querySelector("#searchBtn");
class IngredientSearch {
  constructor() {}
  //récupération de la liste de recette en fonction de l'ingrédient
  getMealsbyIngredient = async () => {
    let ingredientInput = document.querySelector("#ingredient");
    await fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredientInput.value}`
    ).then(async (response) => {
      let data = await response.json();
      data.meals.map((meal) => {
        // création d'instance par recette dans la liste de recette
        const happyMeal = new Meal(meal.idMeal, meal.strMeal, meal.strMealThumb);
        //récupération des détails de la recette
        happyMeal.getMoreDetail();
      });
    });
  };
}
//création de l'instance
const SearchIngredient = new IngredientSearch();
//au moment du click sur le bouton de la recherche de recette par ingrédient
searchBtn.addEventListener("click", () => {
  //retire les anciennes recettes si elles existe.
  clearMeals();
  //récupération de la list de recette par ingrédient.
  SearchIngredient.getMealsbyIngredient();
});
