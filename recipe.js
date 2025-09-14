const searchBox = document.querySelector(".searchBox");
const recipeContainer = document.querySelector(".recipe-container");
const heroSection = document.querySelector(".hero-section");

async function fetchRecipes(searchText) {
  recipeContainer.innerHTML = "Fetching Recipes...";

  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`);
  const data = await response.json();
  const meals = data.meals;

  if (!meals) {
    recipeContainer.innerHTML = "No recipes found.";
    return;
  }

  let recipeHTML = "";
  meals.forEach(meal => {
    recipeHTML += `
      <div class="recipe">
        <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
        <h3>${meal.strMeal}</h3>
        <p>${meal.strArea}</p>
        <p>${meal.strCategory}</p>
        <button onclick="window.open('details.html?id=${meal.idMeal}', '_blank')">View Recipe</button>
      </div>
    `;
  });
  recipeContainer.innerHTML = recipeHTML;
}

document.querySelector(".searchbtn").addEventListener("click", function (event) {
  event.preventDefault();

  const searchText = searchBox.value.trim();
  if (searchText) {
    heroSection.style.display = "none";
    fetchRecipes(searchText);
  }
});
