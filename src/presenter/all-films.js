// const
import {InsertPlace, SortType} from '../const';

// utils
import {render, remove} from '../utils/render';
import {updateItemById} from '../utils/update';

// view
import FilmsSortView from '../view/films-sort';
import AllFilmsView from '../view/all-films';
import FilmsContainerView from '../view/films-container';
import ShowMoreButtonView from '../view/show-more-button';

// presenter
import FilmCardPresenter from './film-card';
import FilmDetailsPresenter from './film-details-new';

const FilmCount = {
  STEP: 5,
  EXTRA: 2,
};

export default class AllFilmsPresenter {
  constructor(container) {
    this._containerView = container;
    this._renderedFilmCount = FilmCount.STEP;

    this._filmsSortView = new FilmsSortView();
    this._allFilmsView = new AllFilmsView();
    this._filmsContainerView = new FilmsContainerView();
    this._showMoreButtonView = new ShowMoreButtonView();

    render(this._containerView, this._allFilmsView);

    this._handleShowMoreButtonClick = this._handleShowMoreButtonClick.bind(this);
    this._showFilmDetails = this._showFilmDetails.bind(this);
    this._changeFilmCard = this._changeFilmCard.bind(this);
    this._changeMode = this._changeMode.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);

    this._filmPresenter = {};
    this._filmDetailsPresenter = {};

    this._currentSortType = SortType.DEFAULT;
  }

  init(films, comments) {
    this._films = films;
    this._comments = comments;

    this._sourcedFilms = films.slice();

    this._renderFilmsSort();
    this._renderFilms();
  }

  _changeMode() {
    Object
      .values(this._filmDetailsPresenter)
      .forEach((presenter) => presenter.resetView());
  }

  _changeFilmCard(updatedFilm) {
    this._films = updateItemById(this._films, updatedFilm);
    this._sourcedFilms = updateItemById(this._sourcedFilms, updatedFilm);
    this._filmPresenter[updatedFilm.id].init(updatedFilm);
  }

  _clearFilmList() {
    Object
      .values(this._filmPresenter)
      .forEach((presenter) => presenter.destroy());
    this._filmPresenter = {};
    this._renderedFilmCount = FilmCount.STEP;
    remove(this._showMoreButtonView);
  }

  _showFilmDetails(film) {
    this._renderFilmDetails(film);
  }

  _renderFilmCard(film) {
    const filmPresenter = new FilmCardPresenter(
      this._filmsContainerView,
      this._showFilmDetails,
      this._changeFilmCard,
      this._changeMode,
    );
    filmPresenter.init(film);
    this._filmPresenter[film.id] = filmPresenter;
  }

  _renderFilmDetails(film) {
    const filmComments = film.comments.map((commentId) => this._comments.find((item) => item.id === commentId));
    const filmDetailsPresenter = new FilmDetailsPresenter(this._changeFilmCard);
    filmDetailsPresenter.init(film, filmComments);
    this._filmDetailsPresenter[film.id] = filmDetailsPresenter;
  }

  _renderFilmList(from, to) {
    this._films
      .slice(from, to)
      .forEach((film) => this._renderFilmCard(film));
  }

  _renderShowMoreButton() {
    render(this._filmsContainerView, this._showMoreButtonView, InsertPlace.AFTER_END);
    this._showMoreButtonView.setClickHandler(this._handleShowMoreButtonClick);
  }

  _renderFilmsSort() {
    render(this._containerView, this._filmsSortView, InsertPlace.BEFORE_BEGIN);
    this._filmsSortView.setSortTypeChangeHandler(this._handleSortTypeChange);
  }

  _renderFilms() {
    this._renderFilmList(0, Math.min(this._films.length, this._renderedFilmCount));
    render(this._allFilmsView, this._filmsContainerView);

    if (this._films.length > this._renderedFilmCount) {
      this._renderShowMoreButton();
    }
  }

  _sortFilms(sortType) {
    switch (sortType) {
      case SortType.DATE:
        this._films.sort((filmA, filmB) => filmA.release - filmB.release);
        break;
      case SortType.RATING:
        this._films.sort((filmA, filmB) => filmA.rating - filmB.rating);
        break;
      default:
        this._films = this._sourcedFilms.slice();
    }

    this._currentSortType = sortType;
  }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }

    this._sortFilms(sortType);

    this._clearFilmList();
    this._renderFilms();
  }

  _handleShowMoreButtonClick() {
    this._renderFilmList(this._renderedFilmCount, this._renderedFilmCount + FilmCount.STEP);
    this._renderedFilmCount += FilmCount.STEP;

    if (this._renderedFilmCount >= this._films.length) {
      remove(this._showMoreButtonView);
    }
  }
}
