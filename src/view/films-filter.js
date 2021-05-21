import AbstractView from './abstract';
import {FilterType} from '../const';

const createFilterItemTemplate = (title, link, type,  currentType, count) => {

  const classMod = currentType === type ? 'main-navigation__item--active' : '';
  const itemCount = type !== FilterType.ALL ? `<span class="main-navigation__item-count">${count}</span>` : '';

  return (
    `<a href="#${link}"
        class="main-navigation__item ${classMod}"
        data-filter-type="${type}">${title}
        ${itemCount}
    </a>`
  );
};

const createFilmsFilterTemplate = ({watchlistCount, watchedCount, favoriteCount}, currentType) => {
  return (
    `<div class="main-navigation__items">
      ${createFilterItemTemplate('All movies', 'all', FilterType.ALL, currentType)}
      ${createFilterItemTemplate('Watchlist', 'watchlist', FilterType.WATCHLIST, currentType, watchlistCount)}
      ${createFilterItemTemplate('History', 'history', FilterType.HISTORY, currentType, watchedCount)}
      ${createFilterItemTemplate('Favorites', 'favorites', FilterType.FAVORITES, currentType, favoriteCount)}
    </div>`
  );
};

export default class FilmsFilter extends AbstractView {
  constructor(stats, currentType) {
    super();

    this._stats = stats;
    this._currentType = currentType;

    this._typeChangeHandler = this._typeChangeHandler.bind(this);
  }

  getTemplate() {
    return createFilmsFilterTemplate(this._stats, this._currentType);
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

    console.log(target.href.match(/[^/]+$/)[0]);

    this._callback.changeType(target.dataset.filterType);
  }
}
