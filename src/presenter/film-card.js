// const
import {UserAction, UpdateType, FilterType} from '../const.js';

// utils
import {render, replace, remove} from '../utils/render';
import {updateFilmProperty} from '../utils/update';

// view
import FilmCardView from '../view/film-card';

export default class FilmCard {
  constructor(container, openPopup, changeMode, changeData) {
    this._containerView = container;

    this._sectionView = null;

    this._openPopup = openPopup;
    this._changeMode = changeMode;
    this._changeData = changeData;

    this._handleWatchlist = this._handleWatchlist.bind(this);
    this._handleWatched = this._handleWatched.bind(this);
    this._handleFavorite = this._handleFavorite.bind(this);
  }

  init(film) {
    this._film = film;

    const prevSectionView = this._sectionView;

    this._sectionView = new FilmCardView(this._film);

    this._sectionView.setClickHandler(() => {
      this._changeMode();
      this._openPopup(this._film);
    });

    this._sectionView.setWatchlistClickHandler(this._handleWatchlist);
    this._sectionView.setWatchedClickHandler(this._handleWatched);
    this._sectionView.setFavoriteClickHandler(this._handleFavorite);

    if (prevSectionView === null) {
      render(this._containerView, this._sectionView);
      return;
    }

    replace(this._sectionView, prevSectionView);
    remove(prevSectionView);
  }

  destroy() {
    remove(this._sectionView);
  }

  _handleWatchlist() {
    this._changeData(
      UserAction.UPDATE_WATHLIST,
      UpdateType.PATCH,
      updateFilmProperty(this._film, FilterType.WATCHLIST),
    );
  }

  _handleWatched() {
    this._changeData(
      UserAction.UPDATE_WATCHED,
      UpdateType.PATCH,
      updateFilmProperty(this._film, FilterType.WATCHED),
    );
  }

  _handleFavorite() {
    this._changeData(
      UserAction.UPDATE_FAVORITE,
      UpdateType.PATCH,
      updateFilmProperty(this._film, FilterType.FAVORITE),
    );
  }
}
