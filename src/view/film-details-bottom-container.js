import AbstractView from './abstract';

const createFilmDetailsBottomContainerTemplate = () => {
  return (
    `<div class="film-details__bottom-container">
    </div>`
  );
};

export default class FilmDetailsBottomContainer extends AbstractView {
  getTemplate() {
    return createFilmDetailsBottomContainerTemplate();
  }
}
