const searchInput = document.querySelector('.js-search-input');
const searchButton = document.querySelector('.js-search-button');
const searchingMessage = document.querySelector('.js-searching-message');
const errorMessage = document.querySelector('.js-error-message');
const resultsContainer = document.querySelector('.js-results-container');
const backButton = document.querySelector('.js-back-button');
const recipeSection = document.querySelector('.js-recipe-section');
const recipeSectionTitle = document.querySelector('.js-recipe-section-title');
const recipeSectioncategory = document.querySelector('.js-recipe-section-category');
const instructionText = document.querySelector('.js-instructions-text');
const ingredientsSection = document.querySelector('.js-ingredients-section');

const BASE_URL = 'https://www.themealdb.com/api/json/v1/1/';
const SEARCH_URL = `${BASE_URL}search.php?s=`;
const LOOKUP_URL = `${BASE_URL}lookup.php?i=`;

searchButton.addEventListener('click', search);
searchInput.addEventListener('keypress', (event) => {
  if (event.key === 'Enter')
    search();
});

function search() {
  const searchKeyword = searchInput.value.replace(/ /g, "_");
  searchInput.value = '';

  searchingMessage.style.display = 'block';
  searchingMessage.textContent = `Searching for "${searchKeyword}"...`;

  errorMessage.style.display = 'none';

  resultsContainer.style.display = 'none';

  fetch(`${SEARCH_URL}${searchKeyword}`)
    .then(response => {
      if (response.ok)
        return response.json();
      else
        throw new Error('something went wrong while searching.');
    })
    .then(data => {
      const meals = data.meals;

      searchingMessage.textContent = `Search results for "${searchKeyword}":`;

      if (meals) {
        resultsContainer.style.display = 'grid';
        resultsContainer.innerHTML = '';
        meals.forEach((meal) => {
          resultsContainer.innerHTML += `
          <div class="meal-card">
            <img src=${meal.strMealThumb} class="meal-thumbnail">
            <div class="result-card-bottom-row">
              <p class="meal-name">
                ${meal.strMeal}
              </p>
              <p class="meal-category">
                ${meal.strCategory}
              </p>
            </div>
          </div>
        `;
        });
      }
      else {
        searchingMessage.style.display = 'none';

        errorMessage.style.display = 'block';
        errorMessage.textContent = `No recipes found for "${searchKeyword}". Try another search term!`;
      }
    })
    .catch(error => {
      console.error(error);
    });
}