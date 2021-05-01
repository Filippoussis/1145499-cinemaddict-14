import dayjs from 'dayjs';
import SmartView from './smart';

const CONTROLS = {
  watchlist: 'Add to watchlist',
  watched: 'Already watched',
  favorite: 'Add to favorites',
};

const COMMENT_EMOJIS = ['smile', 'sleeping', 'puke', 'angry'];

const createListFilmTermsTemplate = (terms) => {

  const createGenreTemplate = (genres) => {
    return genres.map((genre) => `<span class="film-details__genre">${genre}</span>`).join('');
  };

  const template = Object.entries(terms).map(([term, value]) => {

    let cell = value;

    if (term === 'Genre' && cell.length > 1) {
      cell = createGenreTemplate(cell);
      term = 'Genres';
    }

    return (
      `<tr class="film-details__row">
        <td class="film-details__term">${term}</td>
        <td class="film-details__cell">${cell}</td>
      </tr>`);
  }).join('');

  return template;
};

const createControlsTemplate = (controls, state) => {

  const getAttributeChecked = (isActive = false) => {
    return isActive ? 'checked' : '';
  };

  const template = Object.entries(controls).map(([control, value]) => {
    const isControlActive = state[control];
    return (
      `<input type="checkbox" class="film-details__control-input visually-hidden" id=${control} name=${control} ${getAttributeChecked(isControlActive)}>
      <label for=${control} class="film-details__control-label film-details__control-label--${control}">${value}</label>`
    );
  }).join('');

  return template;
};

const createEmojiListTemplate = (emojis) => {
  return emojis.map((emoji) =>
    `<input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-${emoji}" value=${emoji}>
    <label class="film-details__emoji-label" for="emoji-${emoji}">
      <img src="./images/emoji/${emoji}.png" width="30" height="30" alt=${emoji}>
    </label>`)
    .join('');
};

const createCommentEmojiTemplate = (emoji) => {
  return emoji !== '' ? `<img src="images/emoji/${emoji}.png" width="55" height="55" alt="emoji-${emoji}">` : emoji;
};

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

const createFilmDetailsTemplate = (film, filmComments) => {

  const {
    title, origin, rating, director, writers, stars,
    release, time, country, poster, description, age,
    genres, isWatchlist, isWatched, isFavorite, localEmoji, localComment, comments,
  } = film;

  const writersFormated = writers.join(', ');
  const starsFormated = stars.join(', ');
  const releaseFormated = dayjs(release).format('D MMMM YYYY');

  const filmDetailsTerms = {
    'Director': director,
    'Writers': writersFormated,
    'Actors': starsFormated,
    'Release Date': releaseFormated,
    'Runtime': time,
    'Country': country,
    'Genre': genres,
  };

  const controlState = {
    watchlist: isWatchlist,
    watched: isWatched,
    favorite: isFavorite,
  };

  const commentsCount = comments.length;
  const commentsList = commentsCount > 0 ? createCommentsTemplate(filmComments) : '';

  return (
    `<section class="film-details">
      <form class="film-details__inner" action="" method="get">
        <div class="film-details__top-container">
          <div class="film-details__close">
            <button class="film-details__close-btn" type="button">close</button>
          </div>
          <div class="film-details__info-wrap">
            <div class="film-details__poster">
              <img class="film-details__poster-img" src=${poster} alt=${title}>

              <p class="film-details__age">${age}+</p>
            </div>

            <div class="film-details__info">
              <div class="film-details__info-head">
                <div class="film-details__title-wrap">
                  <h3 class="film-details__title">${title}</h3>
                  <p class="film-details__title-original">Original: ${origin}</p>
                </div>

                <div class="film-details__rating">
                  <p class="film-details__total-rating">${rating}</p>
                </div>
              </div>

              <table class="film-details__table">
                ${createListFilmTermsTemplate(filmDetailsTerms)}
              </table>

              <p class="film-details__film-description">${description}</p>
            </div>
          </div>

          <section class="film-details__controls">
            ${createControlsTemplate(CONTROLS, controlState)}
          </section>
        </div>

        <div class="film-details__bottom-container">
          <section class="film-details__comments-wrap">
            <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${commentsCount}</span></h3>

            <ul class="film-details__comments-list">
              ${commentsList}
            </ul>

            <div class="film-details__new-comment">
              <div class="film-details__add-emoji-label">
                ${createCommentEmojiTemplate(localEmoji)}
              </div>

              <label class="film-details__comment-label">
                <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment">${localComment}</textarea>
              </label>

              <div class="film-details__emoji-list">
                ${createEmojiListTemplate(COMMENT_EMOJIS)}
              </div>
            </div>
          </section>
        </div>
      </form>
    </section>`
  );
};

export default class FilmDetails extends SmartView {
  constructor(film, comments) {
    super();

    this._state = FilmDetails.parseFilmToState(film);
    this._comments = comments;
    this._closeButtonClickHandler = this._closeButtonClickHandler.bind(this);
    this._watchlistChangeHandler = this._watchlistChangeHandler.bind(this);
    this._watchedChangeHandler = this._watchedChangeHandler.bind(this);
    this._favoriteChangeHandler = this._favoriteChangeHandler.bind(this);
    this._emojiChangeHandler = this._emojiChangeHandler.bind(this);
    this._commentInputHandler = this._commentInputHandler.bind(this);

    this._setInnerHandlers();
  }

  getTemplate() {
    return createFilmDetailsTemplate(this._state, this._comments);
  }

  _setInnerHandlers() {
    const viewComponent = this.getElement();

    viewComponent
      .querySelector('.film-details__close-btn')
      .addEventListener('click', this._closeButtonClickHandler);

    viewComponent
      .querySelector('#watchlist')
      .addEventListener('change', this._watchlistChangeHandler);

    viewComponent
      .querySelector('#watched')
      .addEventListener('change', this._watchedChangeHandler);

    viewComponent
      .querySelector('#favorite')
      .addEventListener('change', this._favoriteChangeHandler);

    viewComponent
      .querySelector('.film-details__emoji-list')
      .addEventListener('change', this._emojiChangeHandler);

    viewComponent
      .querySelector('.film-details__comment-input')
      .addEventListener('input', this._commentInputHandler);
  }

  restoreHandlers() {
    this._setInnerHandlers();
  }

  setCloseButtonClickHandler(callback) {
    this._callback.clickCloseButton = callback;
    this.getElement()
      .querySelector('.film-details__close-btn')
      .addEventListener('click', this._closeButtonClickHandler);
  }

  setWatchlistChangeHandler(callback) {
    this._callback.changeWatchlist = callback;
    this.getElement()
      .querySelector('#watchlist')
      .addEventListener('change', this._watchlistChangeHandler);
  }

  setWatchedChangeHandler(callback) {
    this._callback.changeWatched = callback;
    this.getElement()
      .querySelector('#watched')
      .addEventListener('change', this._watchedChangeHandler);
  }

  setFavoriteChangeHandler(callback) {
    this._callback.changeFavorite = callback;
    this.getElement()
      .querySelector('#favorite')
      .addEventListener('change', this._favoriteChangeHandler);
  }

  _closeButtonClickHandler(evt) {
    evt.preventDefault();
    this._callback.clickCloseButton();
  }

  _watchlistChangeHandler(evt) {
    evt.preventDefault();
    this._callback.changeWatchlist();
    this.updateData({
      isWatchlist: !this._state.isWatchlist,
    });
  }

  _watchedChangeHandler(evt) {
    evt.preventDefault();
    this._callback.changeWatched();
    this.updateData({
      isWatched: !this._state.isWatched,
    });
  }

  _favoriteChangeHandler(evt) {
    evt.preventDefault();
    this._callback.changeFavorite();
    this.updateData({
      isFavorite: !this._state.isFavorite,
    });
  }

  _emojiChangeHandler(evt) {
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

  static parseFilmToState(film) {
    return Object.assign(
      {},
      film,
      {
        localEmoji: '',
        localComment: '',
      },
    );
  }
}
