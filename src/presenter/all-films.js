// const
import {InsertPlace, SortType, UserAction, UpdateType, FilterType} from '../const';

// utils
import {render, remove} from '../utils/render';

// view
import FilmsListAllView from '../view/films-list-all';
import FilmsListContainerView from '../view/films-list-container';
import ShowMoreButtonView from '../view/show-more-button';

// presenter
import FilmCardPresenter from './film-card';
import FilmDetailsPresenter from './film-details';

const FilmCount = {
  STEP: 5,
  EXTRA: 2,
};

export default class AllFilms {
  constructor(allFilmsContainer, filmsModel, commentsModel, filterModel, sortModel) {
    this._allFilmsContainer = allFilmsContainer;
    this._filmsModel = filmsModel;
    this._commentsModel = commentsModel;
    this._filterModel = filterModel;
    this._sortModel = sortModel;

    this._renderedFilmCount = FilmCount.STEP;

    this._filmsListContainerView = null;
    this._showMoreButtonView = null;

    this._handleShowMoreButtonClick = this._handleShowMoreButtonClick.bind(this);
    this._showFilmDetails = this._showFilmDetails.bind(this);
    this._changeMode = this._changeMode.bind(this);

    this._handleViewAction = this._handleViewAction.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);

    this._filmsModel.addObserver(this._handleModelEvent);
    this._filterModel.addObserver(this._handleModelEvent);
    this._sortModel.addObserver(this._handleModelEvent);

    this._filmPresenter = {};
    this._filmDetailsPresenter = {};
  }

  init() {
    this._renderFilmsSection();
    this._renderFilmsBoard();
  }

  _getFilms() {
    const films = this._filmsModel.getFilms();
    const filterType = this._filterModel.getFilter();
    const filtredFilms = filterType !== FilterType.ALL ? films.filter((film) => film[filterType]) : films;
    const currentSortType = this._sortModel.getSort();

    switch (currentSortType) {
      case SortType.DATE:
        return filtredFilms.sort((filmA, filmB) => filmB.release - filmA.release);
      case SortType.RATING:
        return filtredFilms.sort((filmA, filmB) => filmB.rating - filmA.rating);
    }

    return filtredFilms;
  }

  _getComments() {
    return this._commentsModel.getComments();
  }

  _handleViewAction(actionType, updateType, update) {
    switch (actionType) {
      case UserAction.UPDATE_FILM:
        this._filmsModel.updateFilm(updateType, update);
        break;
    }
  }

  _handleModelEvent(updateType, data) {
    switch (updateType) {
      case UpdateType.PATCH:
        this._filmPresenter[data.id].init(data);
        break;
      case UpdateType.MINOR:
        this._clearFilmsBoard();
        this._renderFilmsBoard();
        break;
      case UpdateType.MAJOR:
        this._clearFilmsBoard({resetRenderedFilmCount: true});
        this._renderFilmsBoard();
        break;
    }
  }

  _changeMode() {
    Object
      .values(this._filmDetailsPresenter)
      .forEach((presenter) => presenter.resetView());
  }

  _renderFilmCard(film) {
    const filmPresenter = new FilmCardPresenter(
      this._filmsListContainerView,
      this._showFilmDetails,
      this._handleViewAction,
      this._changeMode,
      this._filterModel,
    );
    filmPresenter.init(film);
    this._filmPresenter[film.id] = filmPresenter;
  }

  _renderFilmList(films) {
    films.forEach((film) => this._renderFilmCard(film));
  }

  _renderFilmDetails(film) {
    const filmDetailsPresenter = new FilmDetailsPresenter(
      this._handleViewAction,
      this._filterModel,
      this._commentsModel,
      this._filmsModel,
    );

    filmDetailsPresenter.init(film);
    this._filmDetailsPresenter[film.id] = filmDetailsPresenter;
  }

  _showFilmDetails(film) {
    this._renderFilmDetails(film);
  }

  _renderShowMoreButton() {
    if (this._showMoreButtonView !== null) {
      this._showMoreButtonView = null;
    }

    this._showMoreButtonView = new ShowMoreButtonView();
    this._showMoreButtonView.setClickHandler(this._handleShowMoreButtonClick);
    render(this._filmsListContainerView, this._showMoreButtonView, InsertPlace.AFTER_END);
  }

  _handleShowMoreButtonClick() {
    const filmCount = this._getFilms().length;
    const newRenderedFilmCount = Math.min(filmCount, this._renderedFilmCount + FilmCount.STEP);
    const films = this._getFilms().slice(this._renderedFilmCount, newRenderedFilmCount);

    this._renderFilmList(films);
    this._renderedFilmCount = newRenderedFilmCount;

    if (this._renderedFilmCount >= filmCount) {
      remove(this._showMoreButtonView);
    }
  }

  _clearFilmsBoard({resetRenderedFilmCount = false} = {}) {
    const filmCount = this._getFilms().length;

    Object
      .values(this._filmPresenter)
      .forEach((presenter) => presenter.destroy());

    this._filmPresenter = {};

    remove(this._showMoreButtonView);
    remove(this._filmsListContainerView);

    if (resetRenderedFilmCount) {
      this._renderedFilmCount = FilmCount.STEP;
    } else {
      this._renderedFilmCount = Math.min(filmCount, this._renderedFilmCount);
    }
  }

  _renderFilmsSection() {
    this._filmsListAllView = new FilmsListAllView();
    render(this._allFilmsContainer, this._filmsListAllView);
  }

  _renderFilmsBoard() {
    const films = this._getFilms();
    const filmCount = films.length;

    if (this._filmsListContainerView !== null) {
      this._filmsListContainerView = null;
    }

    this._filmsListContainerView = new FilmsListContainerView();

    this._renderFilmList(films.slice(0, Math.min(filmCount, this._renderedFilmCount)));
    render(this._filmsListAllView, this._filmsListContainerView);

    if (filmCount > this._renderedFilmCount) {
      this._renderShowMoreButton();
    }
  }
}
