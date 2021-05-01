import Abstract from './abstract';

const createFilmDetailsCommentsTemplate = (commentsCount) => {
  return (
    `<section class="film-details__comments-wrap">
      <h3 class="film-details__comments-title">Comments<span class="film-details__comments-count">${commentsCount}</span></h3>
    </section>`
  );
};

export default class createFilmDetailsComments extends Abstract {
  constructor(count) {
    super();

    this._count = count;
  }

  getTemplate() {
    return createFilmDetailsCommentsTemplate(this._count);
  }
}
