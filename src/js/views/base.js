export const elements = {
  welcomeText : document.querySelector('.welcome-text'),
  searchRecipeForm: document.querySelector(".search"),
  searchRecipeInput: document.querySelector(".search__field"),
  searchedItemlists: document.querySelector(".results__list"),
  searchResult: document.querySelector(".results"),
  paginationArea: document.querySelector('.results__pages'),
  recipeContainer: document.querySelector('.recipe'),
  ingredientList : document.querySelector('.recipe__ingredient-list'),
  shoppingList : document.querySelector('.shopping__list'),
  likesIcon : document.querySelector('.likes__field'),
  likesList : document.querySelector('.likes__list'),
  suggestions: document.querySelector('.search__suggestions'),
  suggestionItems: document.querySelectorAll('.search__suggestions-item')
}

const elClass = {
  loader: "loader"
}

export const startLoader = (parent) => {
  const loader = `
    <div class="${elClass.loader}">
      <svg>
          <use href="img/icons.svg#icon-cw"/>
      </svg>
    </div>
  `;
  if(loader) parent.insertAdjacentHTML('afterbegin',loader);
}

export const clearLoader = () => {
  const loader = document.querySelector(`.${elClass.loader}`);
  loader.parentElement.removeChild(loader);
}