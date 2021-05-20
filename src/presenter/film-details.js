// const
import {UpdateType, UserAction} from '../const';

// utils
import {render, remove} from '../utils/render';

// view
import FilmDetailsSectionView from '../view/film-details-section';
import FilmDetailsFormView from '../view/film-details-form';
import FilmDetailsTopContainerView from '../view/film-details-top-container';
import FilmDetailsCloseButtonView from '../view/film-details-close-button';
import FilmDetailsInfoView from '../view/film-details-info';
import FilmDetailsBottomContainerView from '../view/film-details-bottom-container';
import FilmDetailsCommentsWrapView from '../view/film-details-comments-wrap';

// presenter
import FilmDetailsControlsPresenter from './film-details-controls';
import FilmDetailsCommentsPresenter from './film-details-comments';

const NO_SCROLL_CLASS_NAME = 'hide-overflow';

export default class FilmDetails {
  constructor(filmsModel, commentsModel, changeData, unlockControls, api) {

    this._filmsModel = filmsModel;
    this._commentsModel = commentsModel;
    this._changeData = changeData;
    this._unlockControls = unlockControls;
    this._api = api;

    this._buttonEscKeyDownHandler = this._buttonEscKeyDownHandler.bind(this);

    this._closePopup = this._closePopup.bind(this);

    this._handleViewAction = this._handleViewAction.bind(this);

    this._isActive = true;
  }

  init(film) {
    this._film = film;

    this._getCommentsData(this._film.id);

    this._renderPopup();
    this._setBodyNoScroll();
    this._setDocumentKeyDownHandler();
  }

  _getCommentsData(id) {
    this._api.getComments(id)
      .then((comments) => {
        this._commentsModel.setItems(UpdateType.INIT, comments);
      })
      .catch(() => {
        this._commentsModel.setItems(UpdateType.INIT, []);
      });
  }

  _handleViewAction(actionType, updateType, update) {
    switch (actionType) {
      case UserAction.ADD_COMMENT:
        this._api.addComment(update.filmId, update.localComment)
          .then((response) => {
            const {movie, comments} = response;

            this._commentsModel.setItems(
              updateType,
              comments,
            );

            this._filmsModel.updateItem(
              updateType,
              movie,
            );
          })
          .catch(() => this._formView.shake());
        break;

      case UserAction.DELETE_COMMENT:
        this._api.deleteComment(update.deletedCommentId)
          .then(() => {
            this._commentsModel.deleteItem(
              updateType,
              update.deletedCommentId,
            );

            this._api.updateFilm(update.film).then((response) => {
              this._filmsModel.updateItem(
                updateType,
                response,
              );
            });
          })
          .catch(() => this._commentsListPresenter.setErrorEffect());
        break;
    }
  }

  _renderSection() {
    this._sectionView = new FilmDetailsSectionView();
    render(document.body, this._sectionView);
  }

  _renderForm() {
    this._formView = new FilmDetailsFormView();
    render(this._sectionView, this._formView);
  }

  _renderTopContainer() {
    this._topContainerView = new FilmDetailsTopContainerView();
    render(this._formView, this._topContainerView);
  }

  _renderCloseButton() {
    const closeButtonView = new FilmDetailsCloseButtonView();
    closeButtonView.setCloseButtonClickHandler(this._closePopup);
    render(this._topContainerView, closeButtonView);
  }

  _renderInfo() {
    this._infoView = new FilmDetailsInfoView(this._film);
    render(this._topContainerView, this._infoView);
  }

  _renderControls() {
    const controlsPresenter = new FilmDetailsControlsPresenter(
      this._topContainerView,
      this._filmsModel,
      this._changeData,
    );
    controlsPresenter.init(this._film);
  }

  _renderBottomContainer() {
    this._bottomContainerView = new FilmDetailsBottomContainerView();
    render(this._formView, this._bottomContainerView);
  }

  _renderCommentsWrap() {
    this._commentsWrapView = new FilmDetailsCommentsWrapView();
    render(this._bottomContainerView, this._commentsWrapView);
  }

  _renderCommentsList() {
    this._commentsListPresenter = new FilmDetailsCommentsPresenter(
      this._commentsWrapView,
      this._commentsModel,
      this._handleViewAction,
    );
    this._commentsListPresenter.init(this._film);
  }

  _renderPopup() {
    this._renderSection();
    this._renderForm();
    this._renderTopContainer();
    this._renderCloseButton();
    this._renderInfo();
    this._renderControls();
    this._renderBottomContainer();
    this._renderCommentsWrap();
    this._renderCommentsList();
  }

  _closePopup() {
    remove(this._sectionView);
    this._unlockControls();
    this._removeBodyNoScroll();
    this._removeDocumentKeyDownHandler();
  }

  resetView() {
    if (this._isActive) {
      this._closePopup();
    }
  }

  _setBodyNoScroll() {
    document.body.classList.add(NO_SCROLL_CLASS_NAME);
  }

  _removeBodyNoScroll() {
    document.body.classList.remove(NO_SCROLL_CLASS_NAME);
  }

  _setDocumentKeyDownHandler() {
    document.addEventListener('keydown', this._buttonEscKeyDownHandler);
  }

  _removeDocumentKeyDownHandler() {
    document.removeEventListener('keydown', this._buttonEscKeyDownHandler);
  }

  _buttonEscKeyDownHandler(evt) {
    if (evt.key === 'Escape') {
      this._closePopup();
    }
  }
}
