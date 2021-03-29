import { Recipe } from "./models/Recipe";
import Search from "./models/Search";
import List from "./models/List";
import {elements, startLoader, clearLoader} from "./views/base"
import * as searchView from "./views/searchView"
import * as recipeView from "./views/recipeView" 
import * as listView from "./views/listView"
import Likes from "./models/Likes";
import * as likesView from "./views/likesView";


const state = {};
window.state = state;

/* 
  SEARCH CONTROLLER
 */
const controlSearch = async () => {
  elements.searchRecipeInput.blur();
  // 1. get query from view
  const query = searchView.searchInputVal();
  if(query) {
    // update welcome text

    // 2. add search object to state
    state.search = new Search(query);

    // 3. prepare UI for result
    elements.searchRecipeInput.value = "";
    elements.searchedItemlists.innerHTML = "";
    startLoader(elements.searchResult);
    
    // 4. search for recipe
    await state.search.getSearchedRecipe();
    // console.log(state.search.result);
    
    // 5. render the recipes
    clearLoader()
    if(state.search.result !== undefined) {
      elements.welcomeText.innerHTML = "Great choice!"
      searchView.renderRecipes(state.search.result);
    }
    else {
      elements.welcomeText.innerHTML = "404, Recipe not found!"
      searchView.clearPaginationBtns();
    }
  }
}

elements.searchRecipeForm.addEventListener("submit", e => {
  e.preventDefault();
  controlSearch();
});

elements.suggestionItems.forEach(item => {
  item.addEventListener("click", e => {
    elements.searchRecipeInput.value = item.dataset.recipeTitle;
    setTimeout(() => {
      controlSearch();
    }, 200)
  });
});

elements.paginationArea.addEventListener('click', e => {
  let btn = e.target.closest('.btn-inline');
  if(btn) {
    let goto = parseInt(btn.dataset.goto);
    elements.searchedItemlists.innerHTML = "";
    elements.paginationArea.innerHTML = "";
    searchView.renderRecipes(state.search.result, goto);
  }
})

 /* 
  RECIPE CONTROLLER
 */
const controlRecipe = async () => {
  // get recipeId
  const id = window.location.hash.replace('#', '');

  if(id) {
    // remove Welcome text
    elements.welcomeText.style.display = "none"

    // prepare UI for new recipe
    recipeView.clearRecipe();
    startLoader(elements.recipeContainer);

    // Highligh the active recipe
    searchView.activeRecipe(id);

    // create new recipe object in state
    state.recipe = new Recipe(id);

    // call getRecipe method from state.recipe
    await state.recipe.getRecipe()

    // render the recipe
    clearLoader()
    // recipeView.renderRecipe(state.recipe)
    
    // TESTING
    recipeView.renderRecipe(state.recipe, state.likes.isLiked(id))
  }
}

// window.addEventListener('hashchange', controlRecipe);
// window.addEventListener('load', controlRecipe);
['hashchange', 'load'].forEach(e => window.addEventListener(e, controlRecipe));

// recipe click events
elements.recipeContainer.addEventListener("click", e => {
  e.stopPropagation();
  if(e.target.matches('.btn-decrease, .btn-decrease *')) {
    if(state.recipe.servings > 1) {
      state.recipe.updateServings('dec');
      recipeView.updateIgredients(state.recipe)
    }
  }else if(e.target.matches('.btn-increase, .btn-increase *')) {
    state.recipe.updateServings('inc');
    recipeView.updateIgredients(state.recipe)
  }else if(e.target.matches('.recipe__btn--add, .recipe__btn--add *')) {
    let btn = document.querySelector('.recipe__btn--add');
    btn.innerHTML = "Added to list"
    btn.setAttribute('disabled', true)
    listControl();
  }else if(e.target.matches('.recipe__love, .recipe__love *')) {
    controlLikes();
  }

});

/* 
*** LIKES CONTROLLER
 */
// TESTING
const controlLikes = () => {
  if(!state.likes) state.likes = new Likes;

  const curId = state.recipe.id;

  if(!state.likes.isLiked(curId)) {
    // add LIKE to state
    const newLiked = state.likes.addLike(
      curId, 
      state.recipe.title,
      state.recipe.publisher,
      state.recipe.image,
    )

    // toggle the like btn
    likesView.toggleLikeBtn(true)

    // add newly liked recipe to Likes Modal
    // console.log(state.likes.likes);
    likesView.renderLikeRecipes(newLiked)
  }else {
    // remove LIKE from state
    state.likes.removeLike(curId);

    // toggle the like btn
    likesView.toggleLikeBtn(false);

    // remove newly liked recipe from Likes Modal
    likesView.removeLiked(curId);
  }
  likesView.toggleLikeIcon(state.likes.likesLength())
}

window.addEventListener('load', () => {
  state.likes = new Likes;

  // restoring the liked recipes
  state.likes.readStorage();

  // render restored recipes to state
  state.likes.likes.forEach(like => likesView.renderLikeRecipes(like))

  // toggle the like menu in header section
  likesView.toggleLikeIcon(state.likes.likesLength())


});

/**
 * SHOPPING LIST CONTROLLER
 */
const listControl = () => {
  // add list obj to state IF there's none
  if(!state.lists) state.lists = new List();

  // add selected recipe's ingredients to state.lists
  state.recipe.ingredients.forEach(el => {
    const item = state.lists.addItem(el.qty, el.unit, el.ingredient);
    listView.renderList(item);
  });
}

// SHOPPING LIST click events
elements.shoppingList.addEventListener("click", e => {
  const id = e.target.closest('.shopping__item').dataset.itemid;
  if(e.target.matches(".shopping__delete, .shopping__delete *")) {
    
    // delete from state
    state.lists.deleteItem(id)
    // delete from UI
    listView.removeList(id);
  
  }else if(e.target.matches(".shopping__count-value")) {
    const val = parseFloat(e.target.value);
    state.lists.updateQty(id, val)
  }
})