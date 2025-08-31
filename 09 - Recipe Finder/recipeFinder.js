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
const recipeImage = document.querySelector('.js-recipe-image');
const youtubeLink = document.querySelector('.js-youtube-link');

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

  recipeSection.style.display = 'none';

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
          <div class="meal-card js-meal-card" data-id=${meal.idMeal}>
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

        document.querySelectorAll('.js-meal-card').forEach((mealCard) => {
          mealCard.addEventListener('click', () => {
            lookup(mealCard.dataset.id);
          });
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

function lookup(mealId) {
  fetch(`${LOOKUP_URL}${mealId}`)
    .then(response => {
      if (response.ok)
        return response.json();
      else
        throw new Error('something went wrong while looking up the meal');
    }).then(data => {
      if (data.meals === 'Invalid ID')
        throw new Error('Invalid ID');
      else {
        const meal = data.meals[0];

        recipeSection.style.display = 'flex';
        recipeImage.src = meal.strMealThumb;
        recipeSectionTitle.textContent = meal.strMeal;
        recipeSectioncategory.textContent = meal.strCategory;
        instructionText.textContent = meal.strInstructions;

        ingredientsSection.innerHTML = `
          <p class="recipe-subsection-title">
            Ingredients
          </p>
        `;

        for (let i = 1; i <= 20; i++) {
          if (meal[`strIngredient${i}`]) {
            ingredientsSection.innerHTML += `
              <div class="ingredient">
                <i class="fa-solid fa-circle-check"></i>
                <p>
                  ${meal[`strMeasure${i}`]} ${meal[`strIngredient${i}`]}
                </p>
              </div>
            `;
          }
        }

        youtubeLink.href = meal.strYoutube;
      }
    })
    .catch(error => {
      console.error(error);
    });
}

backButton.addEventListener('click', ()=>{
  recipeSection.style.display = 'none';
});