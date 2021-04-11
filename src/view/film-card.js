import dayjs from 'dayjs';
import {createElement} from '../utils/render';

const DESCRIPTION_MAX_LENGTH = 140;
const CLASS_MOD_NAME = 'film-card__controls-item--active';

const createControlTemplate = (id, text, isActive = false) => {

  const classMod = isActive === true ? CLASS_MOD_NAME : '';

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

export default class FilmCard {
  constructor(film) {
    this._element = null;
    this._film = film;
  }

  getTemplate() {
    return createFilmCardTemplate(this._film);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
