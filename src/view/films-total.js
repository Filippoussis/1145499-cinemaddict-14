import {createElement} from '../utils/render';

const createFilmsTotalTemplate = (filmsTotalCount) => {
  return (
    `<section class="footer__statistics">
      <p>${filmsTotalCount} movies inside</p>
    </section>`
  );
};

export default class FilmsTotal {
  constructor(value) {
    this._element = null;
    this._state = value;
  }

  getTemplate() {
    return createFilmsTotalTemplate(this._state);
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
