const category = document.querySelector("#categorie");
const categoryDefaultValue = country.value;
class CategorieList {
  constructor() {
    this.categoriesInput = document.querySelector("#categorie");
  }
  //récupération de la list des pays
  getCategorie = async () => {
    await fetch("https://www.themealdb.com/api/json/v1/1/list.php?c=list").then(
      async (response) => {
        let data = await response.json();
        data.meals.map((meal) => {
          //on insert une option par categorie
          let categorie = document.createElement("option");
          categorie.value = meal.strCategory;
          categorie.innerText = meal.strCategory;
          this.categoriesInput.appendChild(categorie);
        });
      }
    );
  };
  //récupération de la liste de recette en fonction du pays
  getMealsByCategory = async () => {
    await fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?c=${this.categoriesInput.value}`
    ).then(async (response) => {
      let data = await response.json();
      data.meals.map((meal) => {
        const happyMeal = new Meal(meal.idMeal, meal.strMeal, meal.strMealThumb);
        happyMeal.getMoreDetail();
      });
    });
  };
}
const categorieMeal = new CategorieList();
categorieMeal.getCategorie();
//au moment du changement de la valeur de la selection de la catégorie
category.addEventListener("change", () => {
  if (category.value != categoryDefaultValue) {
    //retire les anciennes recettes si elles existe.
    clearMeals();
    //récupération de la list de recette en fonction du pays.
    categorieMeal.getMealsByCategory();
  }
});
