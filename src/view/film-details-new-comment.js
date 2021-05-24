// libs
import he from 'he';
import SmartView from './smart';

// utils
import {isControlEnterEvent} from '../utils/keyboard-event';

const COMMENT_EMOJIS = ['smile', 'sleeping', 'puke', 'angry'];

const createCommentEmojiTemplate = (emoji) => {
  return `<img src="images/emoji/${emoji}.png" width="55" height="55" alt="emoji-${emoji}">`;
};

const createEmojiListTemplate = (emojis, localEmoji) => {

  const getAttributeChecked = (isActive = false) => {
    return isActive ? 'checked' : '';
  };

  const template = emojis.map((emoji) => {

    const isEmojiActive = emoji === localEmoji;

    return (
      `<input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-${emoji}" value=${emoji} ${getAttributeChecked(isEmojiActive)}>
      <label class="film-details__emoji-label" for="emoji-${emoji}">
        <img src="./images/emoji/${emoji}.png" width="30" height="30" alt=${emoji}>
      </label>`
    );
  }).join('');

  return template;
};

const createFilmDetailsNewCommentTemplate = (state) => {

  const {emotion, comment} = state;
  const commentEmoji = emotion !== '' ? createCommentEmojiTemplate(emotion) : emotion;
  const emojiList = createEmojiListTemplate(COMMENT_EMOJIS, emotion);

  return (
    `<div class="film-details__new-comment">
      <div class="film-details__add-emoji-label">
        ${commentEmoji}
      </div>

      <label class="film-details__comment-label">
        <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment">${he.encode(comment)}</textarea>
      </label>

      <div class="film-details__emoji-list">
        ${emojiList}
      </div>
    </div>`
  );
};

export default class FilmDetailsNewComment extends SmartView {
  constructor() {
    super();

    this._state = {
      emotion: '',
      comment: '',
    };

    this._emojiListChangeHandler = this._emojiListChangeHandler.bind(this);
    this._commentInputHandler = this._commentInputHandler.bind(this);

    this._formPressKeyDownHandler = this._formPressKeyDownHandler.bind(this);

    this._setInnerHandlers();
  }

  getTemplate() {
    return createFilmDetailsNewCommentTemplate(this._state);
  }

  setFormPressKeyDownHandler(callback) {
    this._callback.pressKeyDownForm = callback;
    document.addEventListener('keydown', this._formPressKeyDownHandler);
  }

  restoreHandlers() {
    this._setInnerHandlers();
  }

  _setInnerHandlers() {
    const node = this.getElement();

    node
      .querySelector('.film-details__emoji-list')
      .addEventListener('change', this._emojiListChangeHandler);

    node
      .querySelector('.film-details__comment-input')
      .addEventListener('input', this._commentInputHandler);
  }

  _emojiListChangeHandler(evt) {
    evt.preventDefault();
    this.updateData({
      emotion: evt.target.value,
    });
  }

  _commentInputHandler(evt) {
    evt.preventDefault();
    this.updateData({
      comment: evt.target.value,
    }, true);
  }

  _formPressKeyDownHandler(evt) {
    if (isControlEnterEvent(evt)) {
      evt.preventDefault();
      this._callback.pressKeyDownForm(this._state);

      this.updateData({
        emotion: '',
        comment: '',
      });
    }
  }
}
