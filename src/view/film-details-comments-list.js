import dayjs from 'dayjs';
import AbstractView from './abstract';

const createCommentTemplate = (comment) => {

  const {emoji, text, author, date} = comment;
  const commentDateFormated = dayjs(date).format('YYYY/MM/DD H:m');

  return (
    `<li class="film-details__comment">
      <span class="film-details__comment-emoji">
        <img src="./images/emoji/${emoji}.png" width="55" height="55" alt="emoji-${emoji}">
      </span>
      <div>
        <p class="film-details__comment-text">${text}</p>
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
  }

  getTemplate() {
    return createFilmDetailsCommentsListTemplate(this._comments);
  }
}
