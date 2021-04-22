// utils
import {render, replace, remove} from '../utils/render';

// view
import FilmCardView from '../view/film-card';

export default class FilmCardPresenter {
  constructor(container, openPopup, changeData, changeMod) {
    this._filmContainer = container;

    this._filmCardView = null;

    this._openPopup = openPopup;
    this._changeData = changeData;
    this._changeMod = changeMod;

    this._toggleWatchlist = this._toggleWatchlist.bind(this);
    this._toggleWatched = this._toggleWatched.bind(this);
    this._toggleFavorite = this._toggleFavorite.bind(this);
  }

  init(film) {
    this._film = film;

    const prevFilmCardView = this._filmCardView;

    this._filmCardView = new FilmCardView(this._film);

    this._filmCardView.setCardClickHandler(() => {
      this._changeMod();
      this._openPopup(this._film);
    });

    this._filmCardView.setWatchlistClickHandler(this._toggleWatchlist);
    this._filmCardView.setWatchedClickHandler(this._toggleWatched);
    this._filmCardView.setFavoriteClickHandler(this._toggleFavorite);

    if (prevFilmCardView === null) {
      render(this._filmContainer, this._filmCardView);
      return;
    }

    if (this._filmContainer.getElement().contains(prevFilmCardView.getElement())) {
      replace(this._filmCardView, prevFilmCardView);
    }

    remove(prevFilmCardView);
  }

  _toggleWatchlist() {
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

  _toggleWatched() {
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

  _toggleFavorite() {
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
