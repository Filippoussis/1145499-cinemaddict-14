// const
import {UserAction, UpdateType, FilterType} from '../const.js';

// utils
import {render, replace, remove} from '../utils/render';

// view
import FilmCardView from '../view/film-card';

export default class FilmCard {
  constructor(filmCardContainer, openPopup, changeData, changeMode, filterModel) {
    this._filmCardContainerView = filmCardContainer;

    this._filmCardView = null;

    this._openPopup = openPopup;
    this._changeData = changeData;
    this._changeMode = changeMode;
    this._filterModel = filterModel;

    this._handleWatchlist = this._handleWatchlist.bind(this);
    this._handleWatched = this._handleWatched.bind(this);
    this._handleFavorite = this._handleFavorite.bind(this);
  }

  init(film) {
    this._film = film;

    const prevFilmCardView = this._filmCardView;

    this._filmCardView = new FilmCardView(this._film);

    this._filmCardView.setCardClickHandler(() => {
      this._changeMode();
      this._openPopup(this._film);
    });

    this._filmCardView.setWatchlistClickHandler(this._handleWatchlist);
    this._filmCardView.setWatchedClickHandler(this._handleWatched);
    this._filmCardView.setFavoriteClickHandler(this._handleFavorite);

    if (prevFilmCardView === null) {
      render(this._filmCardContainerView, this._filmCardView);
      return;
    }

    if (this._filmCardContainerView.getElement().contains(prevFilmCardView.getElement())) {
      replace(this._filmCardView, prevFilmCardView);
    }

    remove(prevFilmCardView);
  }

  destroy() {
    remove(this._filmCardView);
  }

  _handleWatchlist() {
    const selectedFilter = this._filterModel.getFilter();
    const isPathUpdate = selectedFilter !== FilterType.WATCHLIST;

    this._changeData(
      UserAction.UPDATE_FILM,
      isPathUpdate ? UpdateType.PATCH : UpdateType.MINOR,
      Object.assign(
        {},
        this._film,
        {
          isWatchlist: !this._film.isWatchlist,
        },
      ),
    );
  }

  _handleWatched() {
    const selectedFilter = this._filterModel.getFilter();
    const isPathUpdate = selectedFilter !== FilterType.WATCHED;

    this._changeData(
      UserAction.UPDATE_FILM,
      isPathUpdate ? UpdateType.PATCH : UpdateType.MINOR,
      Object.assign(
        {},
        this._film,
        {
          isWatched: !this._film.isWatched,
        },
      ),
    );
  }

  _handleFavorite() {
    const selectedFilter = this._filterModel.getFilter();
    const isPathUpdate = selectedFilter !== FilterType.FAVORITES;

    this._changeData(
      UserAction.UPDATE_FILM,
      isPathUpdate ? UpdateType.PATCH : UpdateType.MINOR,
      Object.assign(
        {},
        this._film,
        {
          isFavorite: !this._film.isFavorite,
        },
      ),
    );
  }
}
