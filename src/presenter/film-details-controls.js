// const
import {UserAction, UserDetails, UpdateType} from '../const';

// utils
import {render, replace, remove} from '../utils/render';
import {updateUserDetails} from '../utils/update';

// view
import FilmDetailsControlsView from '../view/film-details-controls';


export default class FilmDetailsControls {
  constructor(container, filmsModel, changeData) {
    this._containerView = container;

    this._filmsModel = filmsModel;
    this._changeData = changeData;

    this._sectionView = null;

    this._handleModelEvent = this._handleModelEvent.bind(this);

    this._handleWatchlist = this._handleWatchlist.bind(this);
    this._handleWatched = this._handleWatched.bind(this);
    this._handleFavorite = this._handleFavorite.bind(this);

    this._filmsModel.subscribe(this._handleModelEvent);
  }

  init(film) {
    this._film = film;

    const prevSectionView = this._sectionView;

    this._sectionView = new FilmDetailsControlsView(this._film);

    this._sectionView.setWatchlistChangeHandler(this._handleWatchlist);
    this._sectionView.setWatchedChangeHandler(this._handleWatched);
    this._sectionView.setFavoriteChangeHandler(this._handleFavorite);

    if (prevSectionView === null) {
      render(this._containerView, this._sectionView);
      return;
    }

    replace(this._sectionView, prevSectionView);
    remove(prevSectionView);
  }

  _handleModelEvent(_, data) {
    this.init(data);
  }

  _handleWatchlist() {
    this._changeData(
      UserAction.UPDATE_WATHLIST,
      UpdateType.PATCH,
      updateUserDetails(this._film, UserDetails.WATCHLIST),
    );
  }

  _handleWatched() {
    this._changeData(
      UserAction.UPDATE_WATCHED,
      UpdateType.PATCH,
      updateUserDetails(this._film, UserDetails.WATCHED),
    );
  }

  _handleFavorite() {
    this._changeData(
      UserAction.UPDATE_FAVORITE,
      UpdateType.PATCH,
      updateUserDetails(this._film, UserDetails.FAVORITE),
    );
  }
}
