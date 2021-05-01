import SmartView from './smart';

const CONTROLS = {
  watchlist: 'Add to watchlist',
  watched: 'Already watched',
  favorite: 'Add to favorites',
};

const createControlsTemplate = (controls, state) => {

  const getAttributeChecked = (isActive = false) => {
    return isActive ? 'checked' : '';
  };

  const template = Object.entries(controls).map(([control, value]) => {
    const isControlActive = state[control];
    return (
      `<input type="checkbox" class="film-details__control-input visually-hidden" id=${control} name=${control} ${getAttributeChecked(isControlActive)}>
      <label for=${control} class="film-details__control-label film-details__control-label--${control}">${value}</label>`
    );
  }).join('');

  return template;
};

const createFilmDetailsControlsTemplate = (controlState) => {
  return (
    `<section class="film-details__controls">
      ${createControlsTemplate(CONTROLS, controlState)}
    </section>`
  );
};

export default class FilmDetailsControls extends SmartView {
  constructor(isWatchlist, isWatched, isFavorite) {
    super();

    this._state = {
      watchlist: isWatchlist,
      watched: isWatched,
      favorite: isFavorite,
    };

    this._watchlistChangeHandler = this._watchlistChangeHandler.bind(this);
    this._watchedChangeHandler = this._watchedChangeHandler.bind(this);
    this._favoriteChangeHandler = this._favoriteChangeHandler.bind(this);

    this._setInnerHandlers();
  }

  getTemplate() {
    return createFilmDetailsControlsTemplate(this._state);
  }

  _setInnerHandlers() {
    const viewComponent = this.getElement();

    viewComponent
      .querySelector('#watchlist')
      .addEventListener('change', this._watchlistChangeHandler);

    viewComponent
      .querySelector('#watched')
      .addEventListener('change', this._watchedChangeHandler);

    viewComponent
      .querySelector('#favorite')
      .addEventListener('change', this._favoriteChangeHandler);
  }

  restoreHandlers() {
    this._setInnerHandlers();
  }

  setWatchlistChangeHandler(callback) {
    this._callback.changeWatchlist = callback;
    this.getElement()
      .querySelector('#watchlist')
      .addEventListener('change', this._watchlistChangeHandler);
  }

  setWatchedChangeHandler(callback) {
    this._callback.changeWatched = callback;
    this.getElement()
      .querySelector('#watched')
      .addEventListener('change', this._watchedChangeHandler);
  }

  setFavoriteChangeHandler(callback) {
    this._callback.changeFavorite = callback;
    this.getElement()
      .querySelector('#favorite')
      .addEventListener('change', this._favoriteChangeHandler);
  }

  _watchlistChangeHandler(evt) {
    evt.preventDefault();
    this._callback.changeWatchlist();
    this.updateData({
      watchlist: !this._state.watchlist,
    });
  }

  _watchedChangeHandler(evt) {
    evt.preventDefault();
    this._callback.changeWatched();
    this.updateData({
      watched: !this._state.watched,
    });
  }

  _favoriteChangeHandler(evt) {
    evt.preventDefault();
    this._callback.changeFavorite();
    this.updateData({
      favorite: !this._state.favorite,
    });
  }
}
