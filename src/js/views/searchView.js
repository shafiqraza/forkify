import {elements} from "./base"
export const searchInputVal = () => elements.searchRecipeInput.value;

export const activeRecipe = (id) => {
  const prevActive = Array.from(document.querySelectorAll('.results__link'))
  prevActive.forEach(el => el.classList.remove('results__link--active'))
  const selectedRec = document.querySelector(`.results__link[href*="#${id}"]`)

  if (selectedRec) {
    selectedRec.classList.add("results__link--active")
  }
  console.log("active" +  id);
} 

const limitRecipeTitle = (title, limit=17) => {
  const newTitle = []
  if(title.length > limit) {
    title.split(" ").reduce((oldValLength, currentVal) => {
      if(currentVal.length + oldValLength <= limit) newTitle.push(currentVal);
      return currentVal.length + oldValLength
    },0);
    return `${newTitle.join(' ')} ...`;
  }
  return title;
}
const renderRecipe = recipe => {
  const markup = `
    <li>
      <a class="results__link" href="#${recipe.recipe_id}">
        <figure class="results__fig">
            <img src="${recipe.image_url}" alt="Test">
        </figure>
        <div class="results__data">
            <h4 class="results__name">${limitRecipeTitle(recipe.title)}</h4>
            <p class="results__author">${recipe.publisher}</p>
        </div>
      </a>
    </li>
  `;
  elements.searchedItemlists.insertAdjacentHTML('beforeend', markup)
} 
export const renderRecipes = (recipes, page=1, perPage=5) => {
  // redering recipes 
  const start = (page - 1) * perPage;
  const end = page * perPage;
  recipes.slice(start, end).forEach(renderRecipe);

  // redering pagination btns
  renderButtons(page, perPage, recipes.length)
}

export const clearPaginationBtns = () => {
  elements.paginationArea.innerHTML = "";
}

const renderButtons = (page, perPage, totalRec) => {
  // clear paginaton btns of previous results
  clearPaginationBtns();
  
  const pages = Math.ceil(totalRec / perPage)
  let btn;
  if(page === 1 && pages > 1) {
    // only next btn show
    btn = button('next', page);
  }else if(pages > page) {
    // show both btns
    btn = `${button('prev', page)} ${button('next', page)}`
  }else if(page === pages && pages > 1) {
    // only show prev btn.
    btn = button('prev', page);
  }
  elements.paginationArea.insertAdjacentHTML('afterbegin', btn)
}

const button = (type, page) => `
  <button class="btn-inline results__btn--${type === 'prev' ? 'prev' : 'next'}" data-goto='${type === 'prev' ? page - 1 : page + 1}'>
    <span>Page ${type === 'prev' ? page - 1 : page + 1}</span>
    <svg class="search__icon">
        <use href="img/icons.svg#icon-triangle-${type === 'prev' ? 'left' : 'right'}"></use>
    </svg>
  </button>
`; 