import AbstractView from './abstract';

const createFilmsTotalTemplate = (count) => {
  return (
    `<section class="footer__statistics">
      <p>${count} movies inside</p>
    </section>`
  );
};

export default class FilmsTotal extends AbstractView {
  constructor(count) {
    super();
    this._count = count;
  }

  getTemplate() {
    return createFilmsTotalTemplate(this._count);
  }
}
