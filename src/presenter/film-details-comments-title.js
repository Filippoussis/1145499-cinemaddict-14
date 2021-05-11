// const
import {InsertPlace} from '../const.js';

// utils
import {render, replace, remove} from '../utils/render';

// view
import FilmDetailsCommentsTitleView from '../view//film-details-comments-title';

export default class FilmCommentsTitle {
  constructor(filmDetailsCommentsTitleContainer, filmsModel) {
    this._filmDetailsCommentsTitleContainerView = filmDetailsCommentsTitleContainer;
    this._filmsModel = filmsModel;

    this._filmDetailsCommentsTitleView = null;

    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._filmsModel.addObserver(this._handleModelEvent);
  }

  init(filmData) {
    const film = filmData;
    const filmCommentsCount = film.comments.length;

    const prevFilmDetailsCommentsTitleView = this._filmDetailsCommentsTitleView;
    this._filmDetailsCommentsTitleView = new FilmDetailsCommentsTitleView(filmCommentsCount);

    if (prevFilmDetailsCommentsTitleView === null) {
      render(this._filmDetailsCommentsTitleContainerView, this._filmDetailsCommentsTitleView, InsertPlace.PREP_END);
      return;
    }

    replace(this._filmDetailsCommentsTitleView, prevFilmDetailsCommentsTitleView);
    remove(prevFilmDetailsCommentsTitleView);
  }

  _handleModelEvent(_, data) {
    this.init(data);
  }
}
