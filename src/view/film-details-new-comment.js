import he from 'he';
import SmartView from './smart';

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

  const {localEmoji, localComment} = state;
  const commentEmoji = localEmoji !== '' ? createCommentEmojiTemplate(localEmoji) : localEmoji;
  const emojiList = createEmojiListTemplate(COMMENT_EMOJIS, localEmoji);

  return (
    `<div class="film-details__new-comment">
      <div class="film-details__add-emoji-label">
        ${commentEmoji}
      </div>

      <label class="film-details__comment-label">
        <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment">${he.encode(localComment)}</textarea>
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
      localEmoji: '',
      localComment: '',
    };

    this._emojiListChangeHandler = this._emojiListChangeHandler.bind(this);
    this._commentInputHandler = this._commentInputHandler.bind(this);

    this._setInnerHandlers();
  }

  getTemplate() {
    return createFilmDetailsNewCommentTemplate(this._state);
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
      localEmoji: evt.target.value,
    });
  }

  _commentInputHandler(evt) {
    evt.preventDefault();
    this.updateData({
      localComment: evt.target.value,
    }, true);
  }
}
