import AbstractView from './abstract';

const createFilmDetailsCommentsTitleTemplate = (commentsCount) => {
  return (
    `<h3 class="film-details__comments-title">Comments
      <span class="film-details__comments-count">${commentsCount}</span>
    </h3>`
  );
};

export default class FilmDetailsCommentsTitle extends AbstractView {
  constructor(count) {
    super();

    this._count = count;
  }

  getTemplate() {
    return createFilmDetailsCommentsTitleTemplate(this._count);
  }
}
