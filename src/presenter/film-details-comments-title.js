// const
import {InsertPlace} from '../const.js';

// utils
import {render, replace, remove} from '../utils/render';

// view
import FilmDetailsCommentsTitleView from '../view//film-details-comments-title';

export default class FilmDetailsCommentsTitle {
  constructor(container, filmsModel) {
    this._containerView = container;

    this._filmsModel = filmsModel;

    this._headerView = null;

    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._filmsModel.subscribe(this._handleModelEvent);
  }

  init(data) {
    const film = data;
    const filmCommentsCount = film.comments.length;

    const prevHeaderView = this._headerView;
    this._headerView = new FilmDetailsCommentsTitleView(filmCommentsCount);

    if (prevHeaderView === null) {
      render(this._containerView, this._headerView, InsertPlace.PREP_END);
      return;
    }

    replace(this._headerView, prevHeaderView);
    remove(prevHeaderView);
  }

  _handleModelEvent(_, data) {
    this.init(data);
  }
}
