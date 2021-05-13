// const
import {UserAction, UpdateType, FilterType} from '../const';

// utils
import {render, replace, remove} from '../utils/render';
import {updateFilmProperty} from '../utils/update';

// view
import FilmDetailsControlsView from '../view/film-details-controls';


export default class FilmDetailsControls {
  constructor(container, filmsModel, filterModel, changeData) {
    this._containerView = container;

    this._filmsModel = filmsModel;
    this._filterModel = filterModel;
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
