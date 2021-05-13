// const
import {UserAction, UpdateType} from '../const';

// utils
import {render, replace, remove} from '../utils/render';

// view
import FilmDetailsCommentsListView from '../view/film-details-comments-list';

export default class FilmDetailsCommentsList {
  constructor(container, filmsModel, commentsModel, changeData) {
    this._containerView = container;

    this._filmsModel = filmsModel;
    this._commentsModel = commentsModel;
    this._changeData = changeData;

    this._sectionView = null;

    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._handleCommentDeleteClick = this._handleCommentDeleteClick.bind(this);

    this._filmsModel.subscribe(this._handleModelEvent);
  }

  init(film) {
    this._film = film;
    const filmComments = this._film.comments.map((commentId) => this._getComments().find((item) => item.id === commentId));

    const prevSectionView = this._sectionView;

    this._sectionView = new FilmDetailsCommentsListView(filmComments);
    this._sectionView.setCommentDeleteClickHandler(this._handleCommentDeleteClick);

    if (prevSectionView === null) {
      render(this._containerView, this._sectionView);
      return;
    }

    replace(this._sectionView, prevSectionView);
    remove(prevSectionView);
  }

  _getComments() {
    return this._commentsModel.getItems();
  }

  _handleModelEvent(_, data) {
    this.init(data);
  }

  _handleCommentDeleteClick(deletedCommentId) {
    const index = this._film.comments.findIndex((commentId) => commentId === deletedCommentId);

    this._commentsModel.deleteItem('DELETE_COMMENT', deletedCommentId);

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
