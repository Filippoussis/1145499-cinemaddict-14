import {createElement} from '../utils/render';

const createFilmsTotalTemplate = (filmsTotalCount) => {
  return (
    `<section class="footer__statistics">
      <p>${filmsTotalCount} movies inside</p>
    </section>`
  );
};

export default class FilmsTotal {
  constructor(filmsTotalCount) {
    this._element = null;
    this._filmsTotalCount = filmsTotalCount;
  }

  getTemplate() {
    return createFilmsTotalTemplate(this._filmsTotalCount);
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
