import dayjs from 'dayjs';
import AbstractView from './abstract';

const createListFilmTermsTemplate = (terms) => {

  const createGenreTemplate = (genres) => {
    return genres.map((genre) => `<span class="film-details__genre">${genre}</span>`).join('');
  };

  const template = Object.entries(terms).map(([term, value]) => {

    let cell = value;

    if (term === 'Genre' && cell.length > 1) {
      cell = createGenreTemplate(cell);
      term = 'Genres';
    }

    return (
      `<tr class="film-details__row">
        <td class="film-details__term">${term}</td>
        <td class="film-details__cell">${cell}</td>
      </tr>`);
  }).join('');

  return template;
};

const createFilmDetailsInfoTemplate = (film) => {

  const {
    title, origin, rating, director, writers, stars,
    release, time, country, poster, description, age,
    genres,
  } = film;

  const writersFormated = writers.join(', ');
  const starsFormated = stars.join(', ');
  const releaseFormated = dayjs(release).format('D MMMM YYYY');

  const filmDetailsTerms = {
    'Director': director,
    'Writers': writersFormated,
    'Actors': starsFormated,
    'Release Date': releaseFormated,
    'Runtime': time,
    'Country': country,
    'Genre': genres,
  };

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
          ${createListFilmTermsTemplate(filmDetailsTerms)}
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
