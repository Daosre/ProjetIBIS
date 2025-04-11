// récupération de l'element select country
const country = document.querySelector("#country");
//valeur par défaut
const countryDefaultValue = country.value;
class CountryList {
  constructor() {
    this.countryInput = document.querySelector("#country");
  }
  //récupération de la list des pays
  getCountry = async () => {
    await fetch("https://www.themealdb.com/api/json/v1/1/list.php?a=list").then(
      async (response) => {
        let data = await response.json();
        data.meals.map((country) => {
          //on insert une option par pays
          let countryOption = document.createElement("option");
          countryOption.value = country.strArea;
          countryOption.innerText = country.strArea;
          this.countryInput.appendChild(countryOption);
        });
      }
    );
  };
  //récupération de la liste de recette en fonction du pays
  getMealsByCountry = async () => {
    await fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?a=${this.countryInput.value}`
    ).then(async (response) => {
      let data = await response.json();
      data.meals.map((meal) => {
        // création d'instance par recette dans la liste de recette
        const happyMeal = new Meal(
          meal.idMeal,
          meal.strMeal,
          meal.strMealThumb
        );
        //récupération des détails de la recette
        happyMeal.getMoreDetail();
      });
    });
  };
}

const countryMeal = new CountryList();
countryMeal.getCountry();
//au moment du changement de la valeur de la selection du pays
country.addEventListener("change", () => {
  if (country.value != countryDefaultValue) {
    //retire les anciennes recettes si elles existe.
    clearMeals();
    //récupération de la list de recette en fonction du pays.
    countryMeal.getMealsByCountry();
  }
});
