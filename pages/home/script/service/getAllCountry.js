const country = document.querySelector("#country");
const defaultValue = country.value;
class CountryList {
  constructor() {
    this.countryInput = document.querySelector("#country");
  }
  getCountry = async () => {
    await fetch("https://www.themealdb.com/api/json/v1/1/list.php?a=list").then(
      async (response) => {
        let data = await response.json();
        data.meals.map((meal) => {
          let country = document.createElement("option");
          country.value = meal.strArea;
          country.innerText = meal.strArea;
          this.countryInput.appendChild(country);
        });
      }
    );
  };
  getMealsByCountry = async () => {
    await fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?a=${this.countryInput.value}`
    ).then(async (response) => {
      let data = await response.json();
      data.meals.map((meal) => {
        const happyMeal = new Meal(meal.idMeal, meal.strMeal, meal.strMealThumb);
        happyMeal.getMoreDetail();
      });
    });
  };
}
const countryMeal = new CountryList();
countryMeal.getCountry();
country.addEventListener("change", () => {
  if (country.value != defaultValue) {
    countryMeal.getMealsByCountry();
  }
});
