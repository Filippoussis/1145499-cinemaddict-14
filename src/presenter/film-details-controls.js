// const
import {UserAction, UpdateType, FilterType} from '../const';

// utils
import {render, replace, remove} from '../utils/render';

// view
import FilmDetailsControlsView from '../view/film-details-controls';


export default class FilmDetailsControls {
  constructor(filmDetailsControlsContainer, changeData, filterModel, filmsModel) {
    this._filmDetailsControlsContainer = filmDetailsControlsContainer;

    this._changeData = changeData;
    this._filterModel = filterModel;
    this._filmsModel = filmsModel;

    this._filmDetailsControlsView = null;

    this._handleModelEvent = this._handleModelEvent.bind(this);

    this._handleWatchlist = this._handleWatchlist.bind(this);
    this._handleWatched = this._handleWatched.bind(this);
    this._handleFavorite = this._handleFavorite.bind(this);

    this._filmsModel.addObserver(this._handleModelEvent);
  }

  init(film) {
    this._film = film;

    const prevfilmDetailsControlsView = this._filmDetailsControlsView;

    this._filmDetailsControlsView = new FilmDetailsControlsView(this._film);

    this._filmDetailsControlsView.setWatchlistChangeHandler(this._handleWatchlist);
    this._filmDetailsControlsView.setWatchedChangeHandler(this._handleWatched);
    this._filmDetailsControlsView.setFavoriteChangeHandler(this._handleFavorite);

    if (prevfilmDetailsControlsView === null) {
      render(this._filmDetailsControlsContainer, this._filmDetailsControlsView);
      return;
    }

    replace(this._filmDetailsControlsView, prevfilmDetailsControlsView);
    remove(prevfilmDetailsControlsView);
  }

  _handleModelEvent(_, data) {
    this.init(data);
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
