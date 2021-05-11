import AbstractView from './abstract';

import {SortType} from '../const';

const createFilmsSortTemplate = (currentSortType) => {
  return (
    `<ul class="sort">
      <li>
        <a href="#"
          class="sort__button ${currentSortType === SortType.DEFAULT ? 'sort__button--active' : ''}"
          data-sort-type="${SortType.DEFAULT}">Sort by default
        </a>
      </li>
      <li>
        <a href="#"
          class="sort__button ${currentSortType === SortType.DATE ? 'sort__button--active' : ''}"
          data-sort-type="${SortType.DATE}">Sort by date
        </a>
      </li>
      <li>
        <a href="#"
          class="sort__button ${currentSortType === SortType.RATING ? 'sort__button--active' : ''}"
          data-sort-type="${SortType.RATING}">Sort by rating
        </a>
      </li>
    </ul>`
  );
};

export default class FilmsSort extends AbstractView {
  constructor(currentSortType) {
    super();

    this._currentSortType = currentSortType;
    this._sortTypeChangeHandler = this._sortTypeChangeHandler.bind(this);
  }

  getTemplate() {
    return createFilmsSortTemplate(this._currentSortType);
  }

  setSortTypeChangeHandler(callback) {
    this._callback.changeSortType = callback;
    this.getElement().addEventListener('click', this._sortTypeChangeHandler);
  }

  _sortTypeChangeHandler(evt) {
    evt.preventDefault();

    const target = evt.target;
    if (target.tagName !== 'A') {
      return;
    }

    this._callback.changeSortType(target.dataset.sortType);
  }
}
