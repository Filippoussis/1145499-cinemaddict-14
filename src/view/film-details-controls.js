import AbstractView from './abstract';

const createControlTemplate = (name, title, isChecked = false) => {

  const checked = isChecked ? 'checked' : '';

  return (
    `<input type="checkbox" class="film-details__control-input visually-hidden" id=${name} name=${name} ${checked}>
    <label for=${name} class="film-details__control-label film-details__control-label--${name}">${title}</label>`
  );
};

const createFilmDetailsControlsTemplate = ({isWatchlist, isWatched, isFavorite}) => {
  return (
    `<section class="film-details__controls">
      ${createControlTemplate('watchlist', 'Add to watchlist', isWatchlist)}
      ${createControlTemplate('watched', 'Already watched', isWatched)}
      ${createControlTemplate('favorite', 'Add to favorites', isFavorite)}
    </section>`
  );
};

export default class FilmDetailsControls extends AbstractView {
  constructor({isWatchlist, isWatched, isFavorite}) {
    super();

    this._state = {
      isWatchlist,
      isWatched,
      isFavorite,
    };

    this._watchlistChangeHandler = this._watchlistChangeHandler.bind(this);
    this._watchedChangeHandler = this._watchedChangeHandler.bind(this);
    this._favoriteChangeHandler = this._favoriteChangeHandler.bind(this);
  }

  getTemplate() {
    return createFilmDetailsControlsTemplate(this._state);
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
  }

  _watchedChangeHandler(evt) {
    evt.preventDefault();
    this._callback.changeWatched();
  }

  _favoriteChangeHandler(evt) {
    evt.preventDefault();
    this._callback.changeFavorite();
  }
}
