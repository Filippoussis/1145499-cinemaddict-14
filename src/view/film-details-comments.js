import AbstractView from './abstract';

const createFilmDetailsCommentsWrapTemplate = (commentsCount) => {
  return (
    `<section class="film-details__comments-wrap">
      <h3 class="film-details__comments-title">Comments<span class="film-details__comments-count">${commentsCount}</span></h3>
    </section>`
  );
};

export default class FilmDetailsCommentsWrap extends AbstractView {
  constructor(count) {
    super();

    this._count = count;
  }

  getTemplate() {
    return createFilmDetailsCommentsWrapTemplate(this._count);
  }
}
