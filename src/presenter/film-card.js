// utils
import {render, replace, remove} from '../utils/render';

// view
import FilmCardView from '../view/film-card';

export default class FilmCardPresenter {
  constructor(container, openPopup, changeData, changeMode) {
    this._filmContainerView = container;

    this._filmCardView = null;

    this._openPopup = openPopup;
    this._changeData = changeData;
    this._changeMode = changeMode;

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
      render(this._filmContainerView, this._filmCardView);
      return;
    }

    if (this._filmContainerView.getElement().contains(prevFilmCardView.getElement())) {
      replace(this._filmCardView, prevFilmCardView);
    }

    remove(prevFilmCardView);
  }

  _handleWatchlist() {
    this._changeData(
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
    this._changeData(
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
    this._changeData(
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
