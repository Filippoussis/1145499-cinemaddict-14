import AbstractView from './abstract';
import {FilterType} from '../const';

const ADDITIONAL_NAVIGATION_ITEM = 'STATS';

const createFilterItemTemplate = (title, type,  currentType, count) => {

  const classMod = currentType === type ? 'main-navigation__item--active' : '';
  const itemCount = type !== FilterType.ALL ? `<span class="main-navigation__item-count">${count}</span>` : '';

  return `<a href="#${type}" class="main-navigation__item ${classMod}">${title} ${itemCount}</a>`;
};

const createAdditionalItemTemplate = (title, type, currentType) => {
  const classMod = currentType === type ? 'main-navigation__additional--active' : '';
  return `<a href="#${type}" class="main-navigation__additional ${classMod}">${title}</a>`;
};

const createFilmsFilterTemplate = ({watchlistCount, watchedCount, favoriteCount}, currentType) => {
  return (
    `<nav class="main-navigation"
      <div class="main-navigation__items">
        ${createFilterItemTemplate('All movies', FilterType.ALL, currentType)}
        ${createFilterItemTemplate('Watchlist', FilterType.WATCHLIST, currentType, watchlistCount)}
        ${createFilterItemTemplate('History', FilterType.HISTORY, currentType, watchedCount)}
        ${createFilterItemTemplate('Favorites', FilterType.FAVORITES, currentType, favoriteCount)}
      </div>
      ${createAdditionalItemTemplate('Stats', ADDITIONAL_NAVIGATION_ITEM, currentType)}
    </nav>`
  );
};

export default class MainNavigation extends AbstractView {
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

    this._callback.changeType(target.href.match(/[^/#]+$/)[0]);
  }
}
