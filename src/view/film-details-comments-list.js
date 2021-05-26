import he from 'he';
import dayjs from 'dayjs';
import AbstractView from './abstract';

const createCommentTemplate = (item) => {

  const {id, emotion, comment, author, date} = item;
  const commentDateFormated = dayjs(date).format('YYYY/MM/DD H:m');

  return (
    `<li class="film-details__comment" data-id=${id}>
      <span class="film-details__comment-emoji">
        <img src="./images/emoji/${emotion}.png" width="55" height="55" alt="emoji-${emotion}">
      </span>
      <div>
        <p class="film-details__comment-text">${he.encode(comment)}</p>
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

    this._buttonDeleteClickHandler = this._buttonDeleteClickHandler.bind(this);
  }

  getTemplate() {
    return createFilmDetailsCommentsListTemplate(this._comments);
  }

  showErrorEffect() {
    this.shake();
    this._unlockButton();
  }

  setDeleteHandler(callback) {
    this._callback.clickCommentDelete = callback;
    this.getElement().addEventListener('click', this._buttonDeleteClickHandler);
  }

  _unlockButton() {
    this._target.disabled = false;
    this._target.textContent = 'Delete';
    this._target = null;
  }

  _buttonDeleteClickHandler(evt) {
    evt.preventDefault();

    this._target = evt.target;

    if (this._target.tagName !== 'BUTTON') {
      return;
    }

    this._target.disabled = true;
    this._target.textContent = 'Deleting...';

    const deletedCommentId = this._target.closest('li').dataset.id;
    this._callback.clickCommentDelete(deletedCommentId);
  }
}
