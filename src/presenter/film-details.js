// const
import {UpdateType} from '../const';

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
import FilmDetailsNewCommentView from '../view/film-details-new-comment';

// presenter
import FilmDetailsControlsPresenter from './film-details-controls';
import FilmDetailsCommentsPresenter from './film-details-comments';

const NO_SCROLL_CLASS_NAME = 'hide-overflow';

export default class FilmDetails {
  constructor(filmsModel, commentsModel, filterModel, changeData, api) {

    this._filmsModel = filmsModel;
    this._commentsModel = commentsModel;
    this._filterModel = filterModel;
    this._changeData = changeData;
    this._api = api;

    this._removePopup = this._removePopup.bind(this);
    this._buttonEscKeyDownHandler = this._buttonEscKeyDownHandler.bind(this);

    this._isActive = true;
  }

  init(film) {
    this._film = film;

    this._renderPopup();
    this._setBodyNoScroll();
    this._setDocumentKeyDownHandler();
    this._getComments(this._film.id);
  }

  _getComments(id) {
    this._api.getComments(id)
      .then((comments) => {
        this._commentsModel.setItems(UpdateType.INIT, comments);
      })
      .catch(() => {
        this._commentsModel.setItems(UpdateType.INIT, []);
      });
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
    closeButtonView.setCloseButtonClickHandler(this._removePopup);
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
      this._filterModel,
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
    const commentsListPresenter = new FilmDetailsCommentsPresenter(
      this._commentsWrapView,
      this._commentsModel,
      this._changeData,
    );
    commentsListPresenter.init();
  }

  _renderNewComment() {
    this._newCommentView = new FilmDetailsNewCommentView();
    render(this._commentsWrapView, this._newCommentView);
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
    this._renderNewComment();
  }

  _removePopup() {
    remove(this._sectionView);
    this._removeBodyNoScroll();
    this._removeDocumentKeyDownHandler();
  }

  resetView() {
    if (this._isActive) {
      this._removePopup();
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
      this._removePopup();
    }
  }
}
