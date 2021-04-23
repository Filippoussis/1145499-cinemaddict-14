import dayjs from 'dayjs';
import AbstractView from './abstract';

const DESCRIPTION_MAX_LENGTH = 140;
const CLASS_MOD_NAME = 'film-card__controls-item--active';

const OPENING_POPUP_CLASS_NAMES = [
  'film-card__poster',
  'film-card__description',
  'film-card__comments',
];

const createControlTemplate = (id, text, isActive = false) => {

  const classMod = isActive ? CLASS_MOD_NAME : '';

  return (
    `<button class="film-card__controls-item button film-card__controls-item--${id} ${classMod}" type="button">
      ${text}
    </button>`
  );
};

const createFilmCardTemplate = (film) => {

  const {id, title, rating, release, time, genres, poster, description, isWatchlist, isWatched, isFavorite, comments} = film;

  const previewRelease = dayjs(release).format('YYYY');
  const previewGenre = genres.join(' ');
  const previewDescription = description.length > DESCRIPTION_MAX_LENGTH ? description.slice(0, DESCRIPTION_MAX_LENGTH - 1) + '\u2026' : description;
  const commentsCount = comments.length;

  return (
    `<article class="film-card" data-id=${id}>
      <h3 class="film-card__title">${title}</h3>
      <p class="film-card__rating">${rating}</p>
      <p class="film-card__info">
        <span class="film-card__year">${previewRelease}</span>
        <span class="film-card__duration">${time}</span>
        <span class="film-card__genre">${previewGenre}</span>
      </p>
      <img src=${poster} alt=${title} class="film-card__poster">
      <p class="film-card__description">${previewDescription}</p>
      <a class="film-card__comments">${commentsCount} comments</a>
      <div class="film-card__controls">
        ${createControlTemplate('add-to-watchlist', 'Add to watchlist', isWatchlist)}
        ${createControlTemplate('mark-as-watched', 'Mark as watched', isWatched)}
        ${createControlTemplate('favorite', 'Mark as favorite', isFavorite)}
      </div>
    </article>`
  );
};

export default class FilmCard extends AbstractView {
  constructor(film) {
    super();

    this._film = film;
    this._cardClickHandler = this._cardClickHandler.bind(this);
    this._addToWatchlistClickHandler = this._addToWatchlistClickHandler.bind(this);
    this._markAsWatchedClickHandler = this._markAsWatchedClickHandler.bind(this);
    this._favoriteClickHandler = this._favoriteClickHandler.bind(this);
  }

  getTemplate() {
    return createFilmCardTemplate(this._film);
  }

  setCardClickHandler(callback) {
    this._callback.clickCard = callback;
    this.getElement().addEventListener('click', this._cardClickHandler);
  }

  setWatchlistClickHandler(callback) {
    this._callback.clickWatchlist = callback;
    this.getElement()
      .querySelector('.film-card__controls-item--add-to-watchlist')
      .addEventListener('click', this._addToWatchlistClickHandler);
  }

  setWatchedClickHandler(callback) {
    this._callback.clickWatched = callback;
    this.getElement()
      .querySelector('.film-card__controls-item--mark-as-watched')
      .addEventListener('click', this._markAsWatchedClickHandler);
  }

  setFavoriteClickHandler(callback) {
    this._callback.clickFavorite = callback;
    this.getElement()
      .querySelector('.film-card__controls-item--favorite')
      .addEventListener('click', this._favoriteClickHandler);
  }

  _cardClickHandler(evt) {
    evt.preventDefault();
    if (OPENING_POPUP_CLASS_NAMES.includes(evt.target.className)) {
      this._callback.clickCard();
    }
  }

  _addToWatchlistClickHandler(evt) {
    evt.preventDefault();
    this._callback.clickWatchlist();
  }

  _markAsWatchedClickHandler(evt) {
    evt.preventDefault();
    this._callback.clickWatched();
  }

  _favoriteClickHandler(evt) {
    evt.preventDefault();
    this._callback.clickFavorite();
  }
}
