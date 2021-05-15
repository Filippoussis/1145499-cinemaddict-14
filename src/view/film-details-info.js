import dayjs from 'dayjs';
import {getFormattedTime} from '../utils/time';
import AbstractView from './abstract';

const createGenreTemplate = (genres) => {
  return genres.map((genre) => `<span class="film-details__genre">${genre}</span>`).join('');
};

const createDetailsRowTemplate = (term, cell) => (
  `<tr class="film-details__row">
    <td class="film-details__term">${term}</td>
    <td class="film-details__cell">${cell}</td>
  </tr>`
);

const createFilmDetailsInfoTemplate = (film) => {

  const {
    title, origin, rating, director, writers, stars,
    release, time, country, poster, description, age,
    genres,
  } = film;

  const formattedWriters = writers.join(', ');
  const formattedStars = stars.join(', ');
  const formattedRelease = dayjs(release).format('D MMMM YYYY');
  const formattedTime = getFormattedTime(time);

  const genreTitle = genres.length > 1 ? 'Genres' : 'Genre';
  const genreTemplate = createGenreTemplate(genres);

  return (
    `<div class="film-details__info-wrap">

      <div class="film-details__poster">
        <img class="film-details__poster-img" src=${poster} alt=${title}>
        <p class="film-details__age">${age}+</p>
      </div>

      <div class="film-details__info">
        <div class="film-details__info-head">
          <div class="film-details__title-wrap">
            <h3 class="film-details__title">${title}</h3>
            <p class="film-details__title-original">Original: ${origin}</p>
          </div>

          <div class="film-details__rating">
            <p class="film-details__total-rating">${rating}</p>
          </div>
        </div>

        <table class="film-details__table">
          ${createDetailsRowTemplate('Director', director)}
          ${createDetailsRowTemplate('Writers', formattedWriters)}
          ${createDetailsRowTemplate('Actors', formattedStars)}
          ${createDetailsRowTemplate('Release Date', formattedRelease)}
          ${createDetailsRowTemplate('Runtime', formattedTime)}
          ${createDetailsRowTemplate('Country', country)}
          ${createDetailsRowTemplate(genreTitle, genreTemplate)}
        </table>

        <p class="film-details__film-description">${description}</p>
      </div>
    </div>`
  );
};

export default class FilmDetailsInfo extends AbstractView {
  constructor(film) {
    super();

    this._film = film;
  }

  getTemplate() {
    return createFilmDetailsInfoTemplate(this._film);
  }
}
