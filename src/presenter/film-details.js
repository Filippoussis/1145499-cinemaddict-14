// utils
import {render, remove} from '../utils/render';

// view
import FilmDetailsView from '../view/film-details';

const NO_SCROLL_CLASS_NAME = 'hide-overflow';

export default class FilmDetailsPresenter {
  constructor(changeData) {
    this._changeData = changeData;

    this._buttonEscKeyDownHandler = this._buttonEscKeyDownHandler.bind(this);
    this._removeFilmDetails = this._removeFilmDetails.bind(this);
    this._handleWatchlist = this._handleWatchlist.bind(this);
    this._handleWatched = this._handleWatched.bind(this);
    this._handleFavorite = this._handleFavorite.bind(this);
  }

  init(film, comments) {
    this._film = Object.assign({}, film);
    this._filmDetailsView = new FilmDetailsView(this._film, comments);

    render(document.body, this._filmDetailsView);

    this._addBodyNoScroll();
    this._addDocumentKeyDownHandler();

    this._filmDetailsView.setCloseButtonClickHandler(this._removeFilmDetails);

    this._filmDetailsView.setWatchlistChangeHandler(this._handleWatchlist);
    this._filmDetailsView.setWatchedChangeHandler(this._handleWatched);
    this._filmDetailsView.setFavoriteChangeHandler(this._handleFavorite);

    this._isActive = true;
  }

  resetView() {
    if (this._isActive) {
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

  _handleWatchlist() {
    const newItem = Object.assign({}, this._film,
      {
        isWatchlist: !this._film.isWatchlist,
      },
    );
    this._changeData(newItem);
    this._film = newItem;
  }

  _handleWatched() {
    const newItem = Object.assign({}, this._film,
      {
        isWatched: !this._film.isWatched,
      },
    );
    this._changeData(newItem);
    this._film = newItem;
  }

  _handleFavorite() {
    const newItem = Object.assign({}, this._film,
      {
        isFavorite: !this._film.isFavorite,
      },
    );
    this._changeData(newItem);
    this._film = newItem;
  }
}
