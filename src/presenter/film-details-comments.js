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

    this._handleDelete = this._handleDelete.bind(this);
    this._handleSubmit = this._handleSubmit.bind(this);

    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._commentsModel.subscribe(this._handleModelEvent);

    this._isLoading = true;
  }

  init(film) {
    this._film = film;

    this._renderComments();
    this._renderNewComment();
  }

  destroy() {
    this._newCommentView.destroy();
    remove(this._listView);
    remove(this._titleView);
  }

  setErrorEffect() {
    this._listView.showErrorEffect();
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
      this._listView.setDeleteHandler(this._handleDelete);
      render(this._titleView, this._listView, InsertPlace.AFTER_END);
    }
  }

  _renderNewComment() {
    this._newCommentView = new FilmDetailsNewCommentView(this._commentsModel);
    this._newCommentView.setSubmitHandler(this._handleSubmit);
    render(this._containerView, this._newCommentView);
  }

  _handleSubmit(localComment) {
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

  _handleDelete(deletedCommentId) {
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
