import {elements} from "./base"
export const renderList = (ing) => {
  const markup = `
    <li class="shopping__item" data-itemId="${ing.id}">
      <div class="shopping__count">
          <input type="number" value="${ing.qty}" step="${ing.qty}" class="shopping__count-value">
          <p>${ing.unit}</p>
      </div>
      <p class="shopping__description">${ing.ingredient}</p>
      <button class="shopping__delete btn-tiny">
          <svg>
              <use href="img/icons.svg#icon-circle-with-cross"></use>
          </svg>
      </button>
    </li>
  `;
  elements.shoppingList.insertAdjacentHTML("beforeend", markup)
}

export const removeList = id => {
  const item = document.querySelector(`[data-itemId="${id}"]`)
  item.parentElement.removeChild(item);
}