import {createElement} from '../utils/render';

const createAllFilmsTemplate = () => {
  return (
    `<section class="films-list" id="all-films">
      <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>
    </section>`
  );
};

export default class AllFilms {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createAllFilmsTemplate();
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
