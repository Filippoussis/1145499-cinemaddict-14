import AbstractView from './abstract';

import {SortType} from '../const';

const createSortItemTemplate = (title, type, currentType) => {

  const classMod = currentType === type ? 'sort__button--active' : '';

  return `<li><a href="#" class="sort__button ${classMod}" data-sort-type="${type}">${title}</a></li>`;
};

const createFilmsSortTemplate = (currentType) => {
  return (
    `<ul class="sort">
      ${createSortItemTemplate('Sort by default', SortType.DEFAULT, currentType)}
      ${createSortItemTemplate('Sort by date', SortType.DATE, currentType)}
      ${createSortItemTemplate('Sort by rating', SortType.RATING, currentType)}
    </ul>`
  );
};

export default class FilmsSort extends AbstractView {
  constructor(currentType) {
    super();

    this._currentType = currentType;
    this._typeChangeHandler = this._typeChangeHandler.bind(this);
  }

  getTemplate() {
    return createFilmsSortTemplate(this._currentType);
  }

  setTypeChangeHandler(callback) {
    this._callback.changeType = callback;
    this.getElement().addEventListener('click', this._typeChangeHandler);
  }

  _typeChangeHandler(evt) {
    evt.preventDefault();

    const target = evt.target;
    if (target.tagName !== 'A') {
      return;
    }

    this._callback.changeType(target.dataset.sortType);
  }
}
