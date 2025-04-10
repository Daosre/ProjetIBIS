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
    articleMeal.appendChild(imgMeal);
    articleMeal.appendChild(titleMeal);
    this.mealsArticle.appendChild(articleMeal);
  };
}
