import AbstractView from './abstract';

const createFilmDetailsTopContainerTemplate = () => {
  return (
    `<div class="film-details__top-container">
    </div>`
  );
};

export default class FilmDetailsTopContainer extends AbstractView {
  getTemplate() {
    return createFilmDetailsTopContainerTemplate();
  }
}
