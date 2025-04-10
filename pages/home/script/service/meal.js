class Meal {
  constructor(id, text, thumb) {
    (this.id = id),
      (this.text = text),
      (this.thumb = thumb),
      (this.mealsArticle = document.querySelector("#meals"));
  }
  insertMeal = async () => {
    let articleMeal = document.createElement("article");
    let imgMeal = document.createElement("img");
    let titleMeal = document.createElement("h3");
    imgMeal.src = this.thumb;
    titleMeal.innerText = this.text;
    articleMeal.appendChild(titleMeal);
    articleMeal.appendChild(imgMeal);
    this.mealsArticle.appendChild(articleMeal);
  };
}
