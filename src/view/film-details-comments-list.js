import he from 'he';
import dayjs from 'dayjs';
import AbstractView from './abstract';

const createCommentTemplate = (comment) => {

  const {id, emoji, text, author, date} = comment;
  const commentDateFormated = dayjs(date).format('YYYY/MM/DD H:m');

  return (
    `<li class="film-details__comment" data-id=${id}>
      <span class="film-details__comment-emoji">
        <img src="./images/emoji/${emoji}.png" width="55" height="55" alt="emoji-${emoji}">
      </span>
      <div>
        <p class="film-details__comment-text">${he.encode(text)}</p>
        <p class="film-details__comment-info">
          <span class="film-details__comment-author">${author}</span>
          <span class="film-details__comment-day">${commentDateFormated}</span>
          <button class="film-details__comment-delete">Delete</button>
        </p>
      </div>
    </li>`
  );
};

const createCommentsTemplate = (comments) => {
  return comments.map(createCommentTemplate).join('');
};

const createFilmDetailsCommentsListTemplate = (comments) => {
  return (
    `<ul class="film-details__comments-list">
      ${createCommentsTemplate(comments)}
    </ul>`
  );
};

export default class FilmDetailsCommentsList extends AbstractView {
  constructor(comments) {
    super();

    this._comments = comments;
    this._commentDeleteClickHandler = this._commentDeleteClickHandler.bind(this);
  }

  getTemplate() {
    return createFilmDetailsCommentsListTemplate(this._comments);
  }

  setCommentDeleteClickHandler(callback) {
    this._callback.clickCommentDelete = callback;
    this.getElement().addEventListener('click', this._commentDeleteClickHandler);
  }

  _commentDeleteClickHandler(evt) {
    evt.preventDefault();

    const target = evt.target;

    if (target.tagName !== 'BUTTON') {
      return;
    }

    const deletedCommentId = Number(target.closest('li').dataset.id);
    this._callback.clickCommentDelete(deletedCommentId);
  }
}
