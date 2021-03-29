import {elements} from "./base"

export const toggleLikeBtn = (isliked) => {
  const likeIconString = isliked ? 'icon-heart' : 'icon-heart-outlined'
  document.querySelector('.recipe__love use').setAttribute('href', `img/icons.svg#${likeIconString}`)
}

export const toggleLikeIcon = (likesLength) => {
  elements.likesIcon.style.visibility = likesLength > 0 ? 'visible' : 'hidden'
}

export const renderLikeRecipes = recipe => {
  // recipes.forEach(recipe => renderRecipe(recipe))

  const markup = `
    <li class="likes__item">
      <a class="likes__link" href="#${recipe.id}">
          <figure class="likes__fig">
              <img src="${recipe.img}" alt="Test">
          </figure>
          <div class="likes__data">
              <h4 class="likes__name">${recipe.title}</h4>
              <p class="likes__author">${recipe.publisher}</p>
          </div>
      </a>
    </li>
  `;
  elements.likesList.insertAdjacentHTML('afterend', markup)
}

export const removeLiked = id => {
  let el = elements.likesList;
  el = document.querySelector(`li.likes__item a[href="#${id}"]`); //
  el.parentElement.removeChild(el);
}