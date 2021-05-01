import AbstractView from './abstract';

const createFilmDetailsFormTemplate = () => {
  return (
    `<form class="film-details__inner" action="" method="get">
    </form>`
  );
};

export default class FilmDetailsForm extends AbstractView {
  getTemplate() {
    return createFilmDetailsFormTemplate();
  }
}
