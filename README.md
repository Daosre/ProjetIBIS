# Projet IBIS
## How to install this on your machine
  Use `git clone` + `code SSH or HTTPS`
  You can take this code on screen :
  
![CodeScreen](https://github.com/Daosre/ProjetIBIS/blob/main/public/assets/readMe/CodeScreen.png)


Launch your index.html for see the result.

If everything working you gonna see this : 

  <img src="https://github.com/Daosre/ProjetIBIS/blob/main/public/assets/readMe/Website1.png" width="50%" height="auto" /> 
  <img src="https://github.com/Daosre/ProjetIBIS/blob/main/public/assets/readMe/Website2.png" width="50%" height="auto" /> 
  <img src="https://github.com/Daosre/ProjetIBIS/blob/main/public/assets/readMe/Website3.png" width="50%" height="auto" /> 
  <img src="https://github.com/Daosre/ProjetIBIS/blob/main/public/assets/readMe/Website4.png" width="50%" height="auto" /> 


# How this work ? 

This site lets you search for recipes by ingredient, country and category.
You can use different option on the input below this screen :

## By Category :

<img src="https://github.com/Daosre/ProjetIBIS/blob/main/public/assets/readMe/SearchByCategory.png" width="50%" height="auto" /> 

Here we gonna use a fetch for taking category by a API [MealDB](https://www.themealdb.com/):

```
const category = document.querySelector("#categorie");
const categoryDefaultValue = country.value;
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
``` 

## By Country

<img src="https://github.com/Daosre/ProjetIBIS/blob/main/public/assets/readMe/SearchByCountry.png" width="50%" height="auto" /> 

Same thing for country :

```
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
``` 

## By Ingredient

<img src="https://github.com/Daosre/ProjetIBIS/blob/main/public/assets/readMe/InputIngredient.png" width="50%" height="auto" /> 

Same thing for ingredient :

```
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
```
## Show recipes

Once you have made your selection, the recipes will be displayed.

<img src="https://github.com/Daosre/ProjetIBIS/blob/main/public/assets/readMe/Recipe.png" width="40%" height="auto" /> 

For insert on HTML we use this :

```
const articleRecipe = document.querySelector(".articleRecipe");
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
      }
    );
  };
  insertMeal = async (data) => {
    let articleMeal = document.createElement("article");
    articleMeal.classList.add("meal");
    let imgMeal = document.createElement("img");
    imgMeal.src = this.thumb;
    imgMeal.alt = `picture of ${this.text}`;
    articleMeal.appendChild(imgMeal);
    let titleMeal = document.createElement("h3");
    titleMeal.innerText = this.text;
    articleMeal.appendChild(titleMeal);
    let countryDiv = document.createElement("div");
    countryDiv.classList.add("countryContainer");
    let flagCountry = document.createElement("img");
    flagCountry.src = await apiCountry(data.meals[0].strArea);
    flagCountry.alt = `flag of ${data.meals[0].strArea}`;
    countryDiv.appendChild(flagCountry);
    let nameCountry = document.createElement("p");
    nameCountry.innerText = data.meals[0].strArea;
    countryDiv.appendChild(nameCountry);
    articleMeal.appendChild(countryDiv);
    let ingredientSection = document.createElement("section");
    let titleIngredientSection = document.createElement("h4");
    titleIngredientSection.innerText = "Ingredient List :";
    ingredientSection.appendChild(titleIngredientSection);
    let listIngredient = document.createElement("ul");
    for (let i = 1; i < 21; i++) {
      if (data.meals[0][`strIngredient${i}`]) {
        let divIngredient = document.createElement("div");
        divIngredient.classList.add("divIngredient");
        let ingredient = document.createElement("li");
        let nameIngredient = data.meals[0][`strIngredient${i}`];
        ingredient.innerText = nameIngredient;
        let quantity = data.meals[0][`strMeasure${i}`];
        ingredient.addEventListener("mouseenter", () => {
          showTooltip(nameIngredient, quantity);
        });
        ingredient.addEventListener("mouseleave", () => {
          hideTooltip();
        });
        divIngredient.appendChild(ingredient);
        listIngredient.appendChild(divIngredient);
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

function clearMeals() {
  const listMeal = document.querySelector("#meals");
  if (listMeal) {
    listMeal.remove();
  }
  const newListMeal = document.createElement("article");
  newListMeal.id = "meals";
  articleRecipe.appendChild(newListMeal);
}

```

## Flag API

The flag of the country corresponding to the recipe is displayed.

We use [Rest Countries API](https://restcountries.com/#api-endpoints-using-this-project) : 

```
const apiCountry = async (country) => {
  return fetch(`https://restcountries.com/v3.1/demonym/${country}`).then(async (response) => {
    let data = await response.json();
    return data[0].flags.png;
  });
};

```








