// const
import {UpdateType, InsertPlace, UserAction} from '../const';

// utils
import {render, remove} from '../utils/render';

// view
import FilmDetailsCommentsTitleView from '../view//film-details-comments-title';
import FilmDetailsCommentsListView from '../view/film-details-comments-list';
import FilmDetailsNewCommentView from '../view/film-details-new-comment';

export default class FilmDetailsComments {
  constructor(container, commentsModel, changeData) {
    this._containerView = container;

    this._commentsModel = commentsModel;
    this._changeData = changeData;

    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._handleButtonDeleteClick = this._handleButtonDeleteClick.bind(this);
    this._handleFormSubmit = this._handleFormSubmit.bind(this);

    this._commentsModel.subscribe(this._handleModelEvent);

    this._isLoading = true;
  }

  init(film) {
    this._film = film;

    this._renderComments();
    this._renderNewComment();
  }

  setActionOnError() {
    this._listView.actionOnError();
  }

  _getComments() {
    return this._commentsModel.getItems();
  }

  _handleModelEvent(updateType) {
    switch (updateType) {
      case UpdateType.INIT:
        this._isLoading = false;
        this._renderComments();
        break;

      case UpdateType.PATCH:
        this._isLoading = false;
        this._clearComments();
        this._renderComments();
        break;
    }
  }

  _clearComments() {
    remove(this._listView);
    remove(this._titleView);
  }

  _renderComments() {
    if(this._isLoading) {
      return;
    }

    const comments = this._getComments();
    const commentsCount = comments.length;

    this._titleView = new FilmDetailsCommentsTitleView(commentsCount);
    render(this._containerView, this._titleView, InsertPlace.PREP_END);


    if (commentsCount > 0) {
      this._listView = new FilmDetailsCommentsListView(comments);
      this._listView.setButtonDeleteClickHandler(this._handleButtonDeleteClick);
      render(this._titleView, this._listView, InsertPlace.AFTER_END);
    }
  }

  _renderNewComment() {
    const newCommentView = new FilmDetailsNewCommentView();
    newCommentView.setFormSubmitHandler(this._handleFormSubmit);
    render(this._containerView, newCommentView);
  }

  _handleFormSubmit(localComment) {
    this._isLoading = true;

    const requestBody = {
      filmId: this._film.id,
      localComment,
    };

    this._changeData(
      UserAction.ADD_COMMENT,
      UpdateType.PATCH,
      requestBody,
    );
  }

  _handleButtonDeleteClick(deletedCommentId) {
    this._isLoading = true;

    const updatedFilm = {
      film: this._film,
      deletedCommentId,
    };

    this._changeData(
      UserAction.DELETE_COMMENT,
      UpdateType.PATCH,
      updatedFilm,
    );
  }
}
