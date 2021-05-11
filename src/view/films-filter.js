import AbstractView from './abstract';
import {FilterType} from '../const';

const createFilmsFilterTemplate = ({watchlistCount, watchedCount, favoriteCount}, currentFilterType) => {
  return (
    `<div class="main-navigation__items">
      <a href="#all"
        class="main-navigation__item ${currentFilterType === FilterType.ALL ? 'main-navigation__item--active' : ''}"
        data-filter-type="${FilterType.ALL}">All movies</a>
      <a href="#watchlist"
        class="main-navigation__item ${currentFilterType === FilterType.WATCHLIST ? 'main-navigation__item--active' : ''}"
        data-filter-type="${FilterType.WATCHLIST}">Watchlist
        <span class="main-navigation__item-count">${watchlistCount}</span>
      </a>
      <a href="#history"
        class="main-navigation__item ${currentFilterType === FilterType.WATCHED ? 'main-navigation__item--active' : ''}"
        data-filter-type="${FilterType.WATCHED}">History
        <span class="main-navigation__item-count">${watchedCount}</span>
      </a>
      <a href="#favorites"
        class="main-navigation__item ${currentFilterType === FilterType.FAVORITES ? 'main-navigation__item--active' : ''}"
        data-filter-type="${FilterType.FAVORITES}">Favorites
        <span class="main-navigation__item-count">${favoriteCount}</span>
      </a>
    </div>`
  );
};

export default class FilmsFilter extends AbstractView {
  constructor(filtersStats, currentFilterType) {
    super();

    this._filtersStats = filtersStats;
    this._currentFilter = currentFilterType;

    this._filterTypeChangeHandler = this._filterTypeChangeHandler.bind(this);
  }

  getTemplate() {
    return createFilmsFilterTemplate(this._filtersStats, this._currentFilter);
  }

  setFilterTypeChangeHandler(callback) {
    this._callback.changeFilterType = callback;
    this.getElement().addEventListener('click', this._filterTypeChangeHandler);
  }

  _filterTypeChangeHandler(evt) {
    evt.preventDefault();

    const target = evt.target;
    if (target.tagName !== 'A') {
      return;
    }

    this._callback.changeFilterType(target.dataset.filterType);
  }
}
