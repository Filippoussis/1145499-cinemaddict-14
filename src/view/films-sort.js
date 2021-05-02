import AbstractView from './abstract';

import {SortType} from '../const';

const createFilmsSortTemplate = () => {
  return (
    `<ul class="sort">
      <li><a href="#" class="sort__button sort__button--active" data-sort-type="${SortType.DEFAULT}">Sort by default</a></li>
      <li><a href="#" class="sort__button" data-sort-type="${SortType.DATE}">Sort by date</a></li>
      <li><a href="#" class="sort__button" data-sort-type="${SortType.RATING}">Sort by rating</a></li>
    </ul>`
  );
};

export default class FilmsSort extends AbstractView {
  constructor() {
    super();

    this._sortTypeChangeHandler = this._sortTypeChangeHandler.bind(this);
  }

  getTemplate() {
    return createFilmsSortTemplate();
  }

  setSortTypeChangeHandler(callback) {
    this._callback.changeSortType = callback;
    this.getElement().addEventListener('click', this._sortTypeChangeHandler);
  }

  _removeSortButtonActive() {
    this.getElement().querySelector('.sort__button.sort__button--active').classList.remove('sort__button--active');
  }

  _sortTypeChangeHandler(evt) {
    const target = evt.target;
    if (target.tagName !== 'A') {
      return;
    }

    evt.preventDefault();

    if (!target.classList.contains('sort__button--active')) {
      this._removeSortButtonActive();
      target.classList.add('sort__button--active');
    }

    this._callback.changeSortType(target.dataset.sortType);
  }
}
