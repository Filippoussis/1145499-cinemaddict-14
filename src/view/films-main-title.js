import AbstractView from './abstract';

const createFilmsMainTitleTemplate = (count) => {
  return (
    count > 0
      ? '<h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>'
      : '<h2 class="films-list__title">There are no movies in our database</h2>'
  );
};

export default class FilmsMainTitle extends AbstractView {
  constructor(count) {
    super();

    this._count = count;
  }

  getTemplate() {
    return createFilmsMainTitleTemplate(this._count);
  }
}
