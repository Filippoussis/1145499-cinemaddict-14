// const
import {InsertPlace, SortType, UpdateType, FilterType} from '../const';

// utils
import {render, remove} from '../utils/render';

// view
import FilmsListAllView from '../view/films-list-all';
import FilmsMainTitleView from '../view/films-main-title';
import FilmsListContainerView from '../view/films-list-container';
import ShowMoreButtonView from '../view/show-more-button';

// presenter
import FilmsSortPresenter from './films-sort';
import FilmPresenter from './film';
import FilmDetailsPresenter from './film-details';

const FilmCount = {
  STEP: 5,
  EXTRA: 2,
};

export default class AllFilms {
  constructor(container, filmsModel, commentsModel, filterModel, sortModel, changeData) {
    this._containerView = container;

    this._filmsModel = filmsModel;
    this._commentsModel = commentsModel;
    this._filterModel = filterModel;
    this._sortModel = sortModel;
    this._changeData = changeData;

    this._renderedFilmCount = FilmCount.STEP;

    this._filmsListContainerView = null;
    this._showMoreButtonView = null;

    this._handleShowMoreButtonClick = this._handleShowMoreButtonClick.bind(this);
    this._showFilmDetails = this._showFilmDetails.bind(this);
    this._changeMode = this._changeMode.bind(this);

    this._handleModelEvent = this._handleModelEvent.bind(this);

    this._filmsModel.subscribe(this._handleModelEvent);
    this._filterModel.subscribe(this._handleModelEvent);
    this._sortModel.subscribe(this._handleModelEvent);

    this._filmPresenter = {};
    this._filmDetailsPresenter = {};
  }

  init() {
    this._renderSection();
    this._renderFilmsSort();
    this._renderFilmsBoard();
  }

  _getFilms() {
    const films = this._filmsModel.getItems();
    const filterType = this._filterModel.getType();
    const filtredFilms = filterType !== FilterType.ALL ? films.filter((film) => film[filterType]) : films;
    const currentSortType = this._sortModel.getType();

    switch (currentSortType) {
      case SortType.DATE:
        return filtredFilms.slice().sort((filmA, filmB) => filmB.release - filmA.release);
      case SortType.RATING:
        return filtredFilms.slice().sort((filmA, filmB) => filmB.rating - filmA.rating);
    }

    return filtredFilms;
  }

  _getComments() {
    return this._commentsModel.getItems();
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

  _renderFilm(film) {
    const filmPresenter = new FilmPresenter(
      this._filmsListContainerView,
      this._filterModel,
      this._showFilmDetails,
      this._changeMode,
      this._changeData,
    );
    filmPresenter.init(film);
    this._filmPresenter[film.id] = filmPresenter;
  }

  _renderFilmsList(films) {
    films.forEach((film) => this._renderFilm(film));
  }

  _renderFilmDetails(film) {
    const filmDetailsPresenter = new FilmDetailsPresenter(
      this._filmsModel,
      this._commentsModel,
      this._filterModel,
      this._changeData,
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

    this._renderFilmsList(films);
    this._renderedFilmCount = newRenderedFilmCount;

    if (this._renderedFilmCount >= filmCount) {
      remove(this._showMoreButtonView);
    }
  }

  _renderFilmsSort() {
    this._filmsSortPresenter = new FilmsSortPresenter(
      this._containerView,
      this._sortModel,
      this._changeData,
    );
  }

  _renderSection() {
    this._filmsListAllView = new FilmsListAllView();
    render(this._containerView, this._filmsListAllView);
  }

  _renderFilmsMainTitle(count) {
    this._filmsMainTitleView = new FilmsMainTitleView(count);
    render(this._filmsListAllView, this._filmsMainTitleView);
  }

  _renderFilms(films, count) {
    if (this._filmsListContainerView !== null) {
      this._filmsListContainerView = null;
    }

    this._filmsListContainerView = new FilmsListContainerView();

    this._renderFilmsList(films.slice(0, Math.min(count, this._renderedFilmCount)));
    render(this._filmsListAllView, this._filmsListContainerView);

    if (count > this._renderedFilmCount) {
      this._renderShowMoreButton();
    }
  }

  _clearFilmsBoard({resetRenderedFilmCount = false} = {}) {
    Object
      .values(this._filmPresenter)
      .forEach((presenter) => presenter.destroy());

    this._filmPresenter = {};

    remove(this._showMoreButtonView);
    remove(this._filmsListContainerView);
    remove(this._filmsMainTitleView);

    this._filmsSortPresenter.destroy();

    this._renderedFilmCount = resetRenderedFilmCount
      ? FilmCount.STEP
      : Math.min(this._getFilms().length, this._renderedFilmCount);
  }

  _renderFilmsBoard() {
    const films = this._getFilms();
    const filmCount = films.length;

    this._renderFilmsMainTitle(filmCount);

    if (filmCount > 0) {
      this._filmsSortPresenter.init();
      this._renderFilms(films, filmCount);
    }
  }
}
