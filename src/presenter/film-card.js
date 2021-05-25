// const
import {UserAction, UserDetail, UpdateType} from '../const.js';

// utils
import {render, replace, remove} from '../utils/render';
import {updateUserDetails} from '../utils/update';

// view
import FilmCardView from '../view/film-card';

export default class FilmCard {
  constructor(container, changeMode, changeData) {
    this._containerView = container;

    this._changeMode = changeMode;
    this._changeData = changeData;

    this._handleWatchlist = this._handleWatchlist.bind(this);
    this._handleWatched = this._handleWatched.bind(this);
    this._handleFavorite = this._handleFavorite.bind(this);

    this._sectionView = null;

    this._isDisabled = false;
  }

  init(film) {
    this._film = film;

    const prevSectionView = this._sectionView;

    this._sectionView = new FilmCardView(this._film);

    this._sectionView.setClickHandler(() => {
      this._changeMode(this._film);
    });

    this._disableConrols(this._isDisabled);

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

  setStatusDisable() {
    this._isDisabled = true;
    this._disableConrols();
  }

  unsetStatusDisable() {
    this._isDisabled = false;
    this._disableConrols();
  }

  _disableConrols() {
    this._sectionView.disableConrols(this._isDisabled);
  }

  _handleWatchlist() {
    this._changeData(
      UserAction.UPDATE_WATHLIST,
      UpdateType.PATCH,
      updateUserDetails(this._film, UserDetail.WATCHLIST),
    );
  }

  _handleWatched() {
    this._changeData(
      UserAction.UPDATE_WATCHED,
      UpdateType.PATCH,
      updateUserDetails(this._film, UserDetail.WATCHED),
    );
  }

  _handleFavorite() {
    this._changeData(
      UserAction.UPDATE_FAVORITE,
      UpdateType.PATCH,
      updateUserDetails(this._film, UserDetail.FAVORITE),
    );
  }
}
