import AbstractView from './abstract';

const createAllFilmsTemplate = () => {
  return (
    `<section class="films-list" id="all-films">
      <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>
    </section>`
  );
};

export default class AllFilms extends AbstractView {
  getTemplate() {
    return createAllFilmsTemplate();
  }
}
