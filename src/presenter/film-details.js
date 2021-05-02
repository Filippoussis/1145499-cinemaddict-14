// utils
import {render, remove} from '../utils/render';

// view
import FilmDetailsSectionView from '../view/film-details-section';
import FilmDetailsFormView from '../view/film-details-form';
import FilmDetailsTopContainerView from '../view/film-details-top-container';
import FilmDetailsCloseButtonView from '../view/film-details-close-button';
import FilmDetailsInfoView from '../view/film-details-info';
import FilmDetailsControlsView from '../view/film-details-controls';
import FilmDetailsBottomContainerView from '../view/film-details-bottom-container';
import FilmDetailsCommentsView from '../view/film-details-comments';
import FilmDetailsCommentsListView from '../view/film-details-comments-list';
import FilmDetailsNewCommentView from '../view/film-details-new-comment';

const NO_SCROLL_CLASS_NAME = 'hide-overflow';

export default class FilmDetailsNew {
  constructor(changeData) {

    this._changeData = changeData;

    this._filmDetailsSectionView = new FilmDetailsSectionView();
    this._filmDetailsFormView = new FilmDetailsFormView();
    this._filmDetailsTopContainerView = new FilmDetailsTopContainerView();
    this._filmDetailsCloseButtonView = new FilmDetailsCloseButtonView();

    render(document.body, this._filmDetailsSectionView);

    render(this._filmDetailsSectionView, this._filmDetailsFormView);
    render(this._filmDetailsFormView, this._filmDetailsTopContainerView);
    render(this._filmDetailsTopContainerView, this._filmDetailsCloseButtonView);

    this._handleFilmDetails = this._handleFilmDetails.bind(this);
    this._buttonEscKeyDownHandler = this._buttonEscKeyDownHandler.bind(this);
    this._handleWatchlist = this._handleWatchlist.bind(this);
    this._handleWatched = this._handleWatched.bind(this);
    this._handleFavorite = this._handleFavorite.bind(this);

    this._isActive = true;
  }

  init(filmData, commentsData) {

    this._film = Object.assign({}, filmData);
    this._comments = commentsData;

    const {isWatchlist, isWatched, isFavorite, comments} = this._film;
    const commentsCount = comments.length;

    this._filmDetailsInfoView = new FilmDetailsInfoView(this._film);
    render(this._filmDetailsTopContainerView, this._filmDetailsInfoView);

    this._filmDetailsControlsView = new FilmDetailsControlsView(isWatchlist, isWatched, isFavorite);
    render(this._filmDetailsTopContainerView, this._filmDetailsControlsView);

    this._filmDetailsBottomContainerView = new FilmDetailsBottomContainerView();
    render(this._filmDetailsFormView, this._filmDetailsBottomContainerView);

    this._filmDetailsCommentsView = new FilmDetailsCommentsView(commentsCount);
    render(this._filmDetailsBottomContainerView, this._filmDetailsCommentsView);

    if (commentsCount > 0) {
      this._filmDetailsCommentsListView = new FilmDetailsCommentsListView(this._comments);
      render(this._filmDetailsCommentsView, this._filmDetailsCommentsListView);
    }

    this._filmDetailsNewCommentView = new FilmDetailsNewCommentView();
    render(this._filmDetailsCommentsView, this._filmDetailsNewCommentView);

    this._setBodyNoScroll();
    this._setDocumentKeyDownHandler();

    this._filmDetailsCloseButtonView.setCloseButtonClickHandler(this._handleFilmDetails);

    this._filmDetailsControlsView.setWatchlistChangeHandler(this._handleWatchlist);
    this._filmDetailsControlsView.setWatchedChangeHandler(this._handleWatched);
    this._filmDetailsControlsView.setFavoriteChangeHandler(this._handleFavorite);
  }

  resetView() {
    if (this._isActive) {
      this._removeFilmDetails();
    }
  }

  _setBodyNoScroll() {
    document.body.classList.add(NO_SCROLL_CLASS_NAME);
  }

  _removeBodyNoScroll() {
    document.body.classList.remove(NO_SCROLL_CLASS_NAME);
  }

  _removeFilmDetails() {
    remove(this._filmDetailsSectionView);
    this._removeBodyNoScroll();
    this._removeDocumentKeyDownHandler();
  }

  _setDocumentKeyDownHandler() {
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

  _handleFilmDetails() {
    this._removeFilmDetails();
  }

  _handleWatchlist() {
    const newItem = Object.assign(
      {},
      this._film,
      {
        isWatchlist: !this._film.isWatchlist,
      },
    );
    this._changeData(newItem);
    this._film = newItem;
  }

  _handleWatched() {
    const newItem = Object.assign(
      {},
      this._film,
      {
        isWatched: !this._film.isWatched,
      },
    );
    this._changeData(newItem);
    this._film = newItem;
  }

  _handleFavorite() {
    const newItem = Object.assign(
      {},
      this._film,
      {
        isFavorite: !this._film.isFavorite,
      },
    );
    this._changeData(newItem);
    this._film = newItem;
  }
}
