import dayjs from 'dayjs';
import {LIMIT_CHAR_COMMENTS} from '../const';

export const getFilmCardTemplate = (film, commentCount) => {

  const {id, title, rating, release, time, genre, poster, description} = film;

  const previewRelease = dayjs(release).format('YYYY');
  const previewGenre = genre.join(' ');
  const previewDescription = description.length > LIMIT_CHAR_COMMENTS ? description.slice(0, LIMIT_CHAR_COMMENTS) + '...' : description;

  return (
    `<article class="film-card" data-id=${id}>
      <h3 class="film-card__title">${title}</h3>
      <p class="film-card__rating">${rating}</p>
      <p class="film-card__info">
        <span class="film-card__year">${previewRelease}</span>
        <span class="film-card__duration">${time}</span>
        <span class="film-card__genre">${previewGenre}</span>
      </p>
      <img src="./images/posters/${poster}" alt=${title} class="film-card__poster">
      <p class="film-card__description">${previewDescription}</p>
      <a class="film-card__comments">${commentCount} comments</a>
      <div class="film-card__controls">
        <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist" type="button">Add to watchlist</button>
        <button class="film-card__controls-item button film-card__controls-item--mark-as-watched" type="button">Mark as watched</button>
        <button class="film-card__controls-item button film-card__controls-item--favorite" type="button">Mark as favorite</button>
      </div>
    </article>`
  );
};
