import dayjs from 'dayjs';
import {DESCRIPTION_MAX_LENGTH, addClassModActive} from '../const';

export const getFilmCardTemplate = (film) => {

  const {id, title, rating, release, time, genres, poster, description, isWatchlist, isWatched, isFavorite, comments} = film;

  const previewRelease = dayjs(release).format('YYYY');
  const previewGenre = genres.join(' ');
  const previewDescription = description.length > DESCRIPTION_MAX_LENGTH ? description.slice(0, DESCRIPTION_MAX_LENGTH - 1) + '\u2026' : description;
  const isCheckedWatchlist = addClassModActive(isWatchlist);
  const isCheckedWatched = addClassModActive(isWatched);
  const isCheckedFavorite = addClassModActive(isFavorite);
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
        <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist ${isCheckedWatchlist}" type="button">Add to watchlist</button>
        <button class="film-card__controls-item button film-card__controls-item--mark-as-watched ${isCheckedWatched}" type="button">Mark as watched</button>
        <button class="film-card__controls-item button film-card__controls-item--favorite ${isCheckedFavorite}" type="button">Mark as favorite</button>
      </div>
    </article>`
  );
};
