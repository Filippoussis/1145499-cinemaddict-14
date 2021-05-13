// const
import {UserAction, UpdateType, FilterType} from '../const.js';

// utils
import {render, replace, remove} from '../utils/render';
import {updateFilmProperty} from '../utils/update';

// view
import FilmView from '../view/film';

export default class Film {
  constructor(container, filterModel, openPopup, changeMode, changeData) {
    this._containerView = container;

    this._cardView = null;

    this._filterModel = filterModel;
    this._openPopup = openPopup;
    this._changeMode = changeMode;
    this._changeData = changeData;

    this._handleWatchlist = this._handleWatchlist.bind(this);
    this._handleWatched = this._handleWatched.bind(this);
    this._handleFavorite = this._handleFavorite.bind(this);
  }

  init(film) {
    this._film = film;

    const prevCardView = this._cardView;

    this._cardView = new FilmView(this._film);

    this._cardView.setCardClickHandler(() => {
      this._changeMode();
      this._openPopup(this._film);
    });

    this._cardView.setWatchlistClickHandler(this._handleWatchlist);
    this._cardView.setWatchedClickHandler(this._handleWatched);
    this._cardView.setFavoriteClickHandler(this._handleFavorite);

    if (prevCardView === null) {
      render(this._containerView, this._cardView);
      return;
    }

    replace(this._cardView, prevCardView);
    remove(prevCardView);
  }

  destroy() {
    remove(this._cardView);
  }

  _handleWatchlist() {
    const selectedFilter = this._filterModel.getType();
    const isPathUpdate = selectedFilter !== FilterType.WATCHLIST;

    this._changeData(
      UserAction.UPDATE_FILM,
      isPathUpdate ? UpdateType.PATCH : UpdateType.MINOR,
      updateFilmProperty(this._film, 'isWatchlist'),
    );
  }

  _handleWatched() {
    const selectedFilter = this._filterModel.getType();
    const isPathUpdate = selectedFilter !== FilterType.WATCHED;

    this._changeData(
      UserAction.UPDATE_FILM,
      isPathUpdate ? UpdateType.PATCH : UpdateType.MINOR,
      updateFilmProperty(this._film, 'isWatched'),
    );
  }

  _handleFavorite() {
    const selectedFilter = this._filterModel.getType();
    const isPathUpdate = selectedFilter !== FilterType.FAVORITES;

    this._changeData(
      UserAction.UPDATE_FILM,
      isPathUpdate ? UpdateType.PATCH : UpdateType.MINOR,
      updateFilmProperty(this._film, 'isFavorite'),
    );
  }
}
