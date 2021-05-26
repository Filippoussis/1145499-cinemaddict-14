import AbstractView from './abstract';

const createControlTemplate = (name, title, isChecked = false) => {

  const checked = isChecked ? 'checked' : '';

  return (
    `<input type="checkbox" class="film-details__control-input visually-hidden" id=${name} name=${name} ${checked}>
    <label for=${name} class="film-details__control-label film-details__control-label--${name}">${title}</label>`
  );
};

const createFilmDetailsControlsTemplate = ({watchlist, watched, favorite}) => {
  return (
    `<section class="film-details__controls">
      ${createControlTemplate('watchlist', 'Add to watchlist', watchlist)}
      ${createControlTemplate('watched', 'Already watched', watched)}
      ${createControlTemplate('favorite', 'Add to favorites', favorite)}
    </section>`
  );
};

export default class FilmDetailsControls extends AbstractView {
  constructor({watchlist, watched, favorite}) {
    super();

    this._userDetails = {watchlist, watched, favorite};

    this._watchlistChangeHandler = this._watchlistChangeHandler.bind(this);
    this._watchedChangeHandler = this._watchedChangeHandler.bind(this);
    this._favoriteChangeHandler = this._favoriteChangeHandler.bind(this);
  }

  getTemplate() {
    return createFilmDetailsControlsTemplate(this._userDetails);
  }

  setWatchlistChangeHandler(callback) {
    this._callback.changeWatchlist = callback;
    this.getElement()
      .querySelector('#watchlist')
      .addEventListener('click', this._watchlistChangeHandler);
  }

  setWatchedChangeHandler(callback) {
    this._callback.changeWatched = callback;
    this.getElement()
      .querySelector('#watched')
      .addEventListener('click', this._watchedChangeHandler);
  }

  setFavoriteChangeHandler(callback) {
    this._callback.changeFavorite = callback;
    this.getElement()
      .querySelector('#favorite')
      .addEventListener('click', this._favoriteChangeHandler);
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
