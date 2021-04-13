import AbstractView from './abstract';

const createFilmsTotalTemplate = (count) => {
  return (
    `<section class="footer__statistics">
      <p>${count} movies inside</p>
    </section>`
  );
};

export default class FilmsTotal extends AbstractView {
  constructor(value) {
    super();
    this._state = value;
  }

  getTemplate() {
    return createFilmsTotalTemplate(this._state);
  }
}
