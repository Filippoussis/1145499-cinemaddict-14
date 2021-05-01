import AbstractView from './abstract';

const createFilmDetailsSectionTemplate = () => {
  return (
    `<section class="film-details">
    </section>`
  );
};

export default class FilmDetailsSection extends AbstractView {
  getTemplate() {
    return createFilmDetailsSectionTemplate();
  }
}
