class CategorieList {
  constructor() {
    this.categoriesInput = document.querySelector("#categorie");
  }
  getCategorie = async () => {
    await fetch("https://www.themealdb.com/api/json/v1/1/list.php?c=list").then(
      async (response) => {
        let data = await response.json();
        data.meals.map((meal) => {
          let categorie = document.createElement("option");
          categorie.value = meal.strCategory;
          categorie.innerText = meal.strCategory;
          this.categoriesInput.appendChild(categorie);
        });
      }
    );
  };
}
const categorieMeal = new CategorieList();
categorieMeal.getCategorie();
