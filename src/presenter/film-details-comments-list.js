// const
import {UserAction, UpdateType} from '../const';

// utils
import {render, replace, remove} from '../utils/render';

// view
import FilmDetailsCommentsListView from '../view/film-details-comments-list';

export default class FilmDetailsCommentsList {
  constructor(filmDetailsCommentsListContainer, filmsModel, commentsModel, changeData) {
    this._filmDetailsCommentsListContainerView = filmDetailsCommentsListContainer;

    this._filmsModel = filmsModel;
    this._commentsModel = commentsModel;
    this._changeData = changeData;

    this._filmDetailsCommentsListView = null;

    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._handleCommentDeleteClick = this._handleCommentDeleteClick.bind(this);

    this._filmsModel.addObserver(this._handleModelEvent);
  }

  init(filmData) {
    this._film = filmData;
    const filmComments = this._film.comments.map((commentId) => this._getComments().find((item) => item.id === commentId));

    const prevFilmDetailsCommentsListView = this._filmDetailsCommentsListView;

    this._filmDetailsCommentsListView = new FilmDetailsCommentsListView(filmComments);
    this._filmDetailsCommentsListView.setCommentDeleteClickHandler(this._handleCommentDeleteClick);

    if (prevFilmDetailsCommentsListView === null) {
      render(this._filmDetailsCommentsListContainerView, this._filmDetailsCommentsListView);
      return;
    }

    replace(this._filmDetailsCommentsListView, prevFilmDetailsCommentsListView);
    remove(prevFilmDetailsCommentsListView);
  }

  _getComments() {
    return this._commentsModel.getComments();
  }

  _handleModelEvent(_, data) {
    this.init(data);
  }

  _handleCommentDeleteClick(deletedCommentId) {
    const index = this._film.comments.findIndex((commentId) => commentId === deletedCommentId);

    this._commentsModel.deleteComment('DELETE_COMMENT', deletedCommentId);

    this._changeData(
      UserAction.UPDATE_FILM,
      UpdateType.PATCH,
      Object.assign(
        {},
        this._film,
        {
          comments: [
            ...this._film.comments.slice(0, index),
            ...this._film.comments.slice(index + 1),
          ],
        },
      ),
    );
  }
}
