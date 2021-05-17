// const
import {UpdateType, InsertPlace} from '../const';

// utils
import {render, remove} from '../utils/render';

// view
import FilmDetailsCommentsTitleView from '../view//film-details-comments-title';
import FilmDetailsCommentsListView from '../view/film-details-comments-list';

export default class FilmDetailsComments {
  constructor(container, commentsModel, changeData) {
    this._containerView = container;

    this._commentsModel = commentsModel;
    this._changeData = changeData;

    this._handleModelEvent = this._handleModelEvent.bind(this);

    this._commentsModel.subscribe(this._handleModelEvent);

    this._isLoading = true;
  }

  init() {
    this._renderComments();
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
    }
  }

  _removeComments() {
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
      render(this._titleView, this._listView, InsertPlace.AFTER_END);
    }
  }
}
