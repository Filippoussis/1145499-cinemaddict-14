import AbstractView from './abstract';

const createAllFilmsTemplate = () => {
  return (
    `<section class="films-list">
    </section>`
  );
};

export default class AllFilms extends AbstractView {
  getTemplate() {
    return createAllFilmsTemplate();
  }
}
