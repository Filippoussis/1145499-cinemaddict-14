// utils
import {render, remove} from '../utils/render';

// view
import FilmDetailsView from '../view/film-details';

const NO_SCROLL_CLASS_NAME = 'hide-overflow';

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};

export default class FilmDetailsPresenter {
  constructor(changeData) {
    this._changeData = changeData;

    this._mode = Mode.DEFAULT;

    this._buttonEscKeyDownHandler = this._buttonEscKeyDownHandler.bind(this);
    this._removeFilmDetails = this._removeFilmDetails.bind(this);
    this._toggleWatchlist = this._toggleWatchlist.bind(this);
    this._toggleWatched = this._toggleWatched.bind(this);
    this._toggleFavorite = this._toggleFavorite.bind(this);
  }

  init(film, comments) {
    this._film = film;
    this._filmDetailsView = new FilmDetailsView(this._film, comments);

    render(document.body, this._filmDetailsView);

    this._mode = Mode.EDITING;

    this._addBodyNoScroll();
    this._addDocumentKeyDownHandler();

    this._filmDetailsView.setCloseButtonClickHandler(this._removeFilmDetails);

    this._filmDetailsView.setWatchlistChangeHandler(this._toggleWatchlist);
    this._filmDetailsView.setWatchedChangeHandler(this._toggleWatched);
    this._filmDetailsView.setFavoriteChangeHandler(this._toggleFavorite);
  }

  resetView() {
    if (this._mode !== Mode.DEFAULT) {
      this._removeFilmDetails();
    }
  }

  _addBodyNoScroll() {
    document.body.classList.add(NO_SCROLL_CLASS_NAME);
  }

  _removeBodyNoScroll() {
    document.body.classList.remove(NO_SCROLL_CLASS_NAME);
  }

  _addDocumentKeyDownHandler() {
    document.addEventListener('keydown', this._buttonEscKeyDownHandler);
  }

  _removeDocumentKeyDownHandler() {
    document.removeEventListener('keydown', this._buttonEscKeyDownHandler);
  }

  _buttonEscKeyDownHandler(evt) {
    if (evt.key === 'Escape') {
      this._removeFilmDetails();
    }
  }

  _removeFilmDetails() {
    remove(this._filmDetailsView);
    this._removeBodyNoScroll();
    this._removeDocumentKeyDownHandler();
  }

  _toggleWatchlist() {
    const newItem = Object.assign({}, this._film,
      {
        isWatchlist: !this._film.isWatchlist,
      },
    );
    this._changeData(newItem);
    this._film = newItem;
  }

  _toggleWatched() {
    const newItem = Object.assign({}, this._film,
      {
        isWatched: !this._film.isWatched,
      },
    );
    this._changeData(newItem);
    this._film = newItem;
  }

  _toggleFavorite() {
    const newItem = Object.assign({}, this._film,
      {
        isFavorite: !this._film.isFavorite,
      },
    );
    this._changeData(newItem);
    this._film = newItem;
  }
}
