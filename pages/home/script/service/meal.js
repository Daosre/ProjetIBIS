class Meal {
  constructor(id, text, thumb) {
    (this.id = id),
      (this.text = text),
      (this.thumb = thumb),
      (this.mealsArticle = document.querySelector("#meals"));
  }
  insertMeal = async () => {
    let articleMeal = document.createElement("article");
    this.mealsArticle.appendChild(articleMeal);
  };
}
