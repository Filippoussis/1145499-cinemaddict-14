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

  _removeSortButtonActive() {
    this.getElement().querySelectorAll('.sort__button')
      .forEach((item) => item.classList.remove('sort__button--active'));
  }

  setSortTypeChangeHandler(callback) {
    this._callback.changeSortType = callback;
    this.getElement().addEventListener('click', this._sortTypeChangeHandler);
  }

  _sortTypeChangeHandler(evt) {
    if (evt.target.tagName !== 'A') {
      return;
    }

    evt.preventDefault();

    if (!evt.target.classList.contains('sort__button--active')) {
      this._removeSortButtonActive();
      evt.target.classList.add('sort__button--active');
    }

    this._callback.changeSortType(evt.target.dataset.sortType);
  }
}
