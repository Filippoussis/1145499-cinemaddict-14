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

    this._watchlistClickHandler = this._watchlistClickHandler.bind(this);
    this._watchedClickHandler = this._watchedClickHandler.bind(this);
    this._favoriteClickHandler = this._favoriteClickHandler.bind(this);
  }

  getTemplate() {
    return createFilmDetailsControlsTemplate(this._userDetails);
  }

  setWatchlistClickHandler(callback) {
    this._callback.clickWatchlist = callback;
    this.getElement()
      .querySelector('#watchlist')
      .addEventListener('click', this._watchlistClickHandler);
  }

  setWatchedClickHandler(callback) {
    this._callback.clickWatched = callback;
    this.getElement()
      .querySelector('#watched')
      .addEventListener('click', this._watchedClickHandler);
  }

  setFavoriteClickHandler(callback) {
    this._callback.clickFavorite = callback;
    this.getElement()
      .querySelector('#favorite')
      .addEventListener('click', this._favoriteClickHandler);
  }

  _watchlistClickHandler(evt) {
    evt.preventDefault();
    this._callback.clickWatchlist();
  }

  _watchedClickHandler(evt) {
    evt.preventDefault();
    this._callback.clickWatched();
  }

  _favoriteClickHandler(evt) {
    evt.preventDefault();
    this._callback.clickFavorite();
  }
}
