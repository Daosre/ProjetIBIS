class CountryList {
  constructor() {
    this.countryInput = document.querySelector("#country");
  }
  getCountry = async () => {
    await fetch("https://www.themealdb.com/api/json/v1/1/list.php?a=list").then(
      async (response) => {
        let data = await response.json();
        console.log(data);

        data.meals.map((meal) => {
          let country = document.createElement("option");
          country.value = meal.strArea;
          country.innerText = meal.strArea;
          this.countryInput.appendChild(country);
        });
      }
    );
  };
}
const countryMeal = new CountryList();
countryMeal.getCountry();
