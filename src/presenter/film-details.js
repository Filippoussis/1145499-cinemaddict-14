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
import FilmDetailsCommentsTitlePresenter from './film-details-comments-title';
import FilmDetailsCommentsListPresenter from './film-details-comments-list';

const NO_SCROLL_CLASS_NAME = 'hide-overflow';

export default class FilmDetails {
  constructor(changeData, filterModel, commentsModel, filmsModel) {

    this._changeData = changeData;
    this._filterModel = filterModel;
    this._commentsModel = commentsModel;
    this._filmsModel = filmsModel;

    this._removeFilmDetails = this._removeFilmDetails.bind(this);
    this._buttonEscKeyDownHandler = this._buttonEscKeyDownHandler.bind(this);

    this._isActive = true;
  }

  init(filmData) {
    this._film = filmData;

    this._renderFilmDetails();
    this._setBodyNoScroll();
    this._setDocumentKeyDownHandler();
  }

  _renderFilmDetailsSection() {
    this._filmDetailsSectionView = new FilmDetailsSectionView();
    render(document.body, this._filmDetailsSectionView);
  }

  _renderFilmDetailsForm() {
    this._filmDetailsFormView = new FilmDetailsFormView();
    render(this._filmDetailsSectionView, this._filmDetailsFormView);
  }

  _renderFilmDetailsTopContainer() {
    this._filmDetailsTopContainerView = new FilmDetailsTopContainerView();
    render(this._filmDetailsFormView, this._filmDetailsTopContainerView);
  }

  _renderFilmDetailsCloseButton() {
    const filmDetailsCloseButtonView = new FilmDetailsCloseButtonView();
    filmDetailsCloseButtonView.setCloseButtonClickHandler(this._removeFilmDetails);
    render(this._filmDetailsTopContainerView, filmDetailsCloseButtonView);
  }

  _renderFilmDetailsInfo() {
    this._filmDetailsInfoView = new FilmDetailsInfoView(this._film);
    render(this._filmDetailsTopContainerView, this._filmDetailsInfoView);
  }

  _renderFilmDetailsControls() {
    const filmDetailsControlsPresenter = new FilmDetailsControlsPresenter(
      this._filmDetailsTopContainerView,
      this._changeData,
      this._filterModel,
      this._filmsModel,
    );
    filmDetailsControlsPresenter.init(this._film);
  }

  _renderFilmDetailsBottomContainer() {
    this._filmDetailsBottomContainerView = new FilmDetailsBottomContainerView();
    render(this._filmDetailsFormView, this._filmDetailsBottomContainerView);
  }

  _renderFilmDetailsCommentsWrap() {
    this._filmDetailsCommentsWrapView = new FilmDetailsCommentsWrapView();
    render(this._filmDetailsBottomContainerView, this._filmDetailsCommentsWrapView);
  }

  _renderFilmDetailsCommentsTitle() {
    const filmDetailsCommentsTitlePresenter = new FilmDetailsCommentsTitlePresenter(
      this._filmDetailsCommentsWrapView,
      this._filmsModel,
    );
    filmDetailsCommentsTitlePresenter.init(this._film);
  }

  _renderFilmDetailsCommentsList() {
    const filmDetailsCommentsListPresenter = new FilmDetailsCommentsListPresenter(
      this._filmDetailsCommentsWrapView,
      this._filmsModel,
      this._commentsModel,
      this._changeData,
    );
    filmDetailsCommentsListPresenter.init(this._film);
  }

  _renderFilmDetailsNewComment() {
    this._filmDetailsNewCommentView = new FilmDetailsNewCommentView();
    render(this._filmDetailsCommentsWrapView, this._filmDetailsNewCommentView);
  }

  _renderFilmDetails() {
    const {comments} = this._film;
    const commentsCount = comments.length;

    this._renderFilmDetailsSection();
    this._renderFilmDetailsForm();
    this._renderFilmDetailsTopContainer();
    this._renderFilmDetailsCloseButton();
    this._renderFilmDetailsInfo();
    this._renderFilmDetailsControls();
    this._renderFilmDetailsBottomContainer();
    this._renderFilmDetailsCommentsWrap();
    this._renderFilmDetailsCommentsTitle();

    if (commentsCount > 0) {
      this._renderFilmDetailsCommentsList();
    }

    this._renderFilmDetailsNewComment();
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

  _removeFilmDetails() {
    remove(this._filmDetailsSectionView);
    this._removeBodyNoScroll();
    this._removeDocumentKeyDownHandler();
  }
}
