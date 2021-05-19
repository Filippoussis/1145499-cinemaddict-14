// const
import {InsertPlace, SortType, UpdateType, FilterType, UserAction} from '../const';

// utils
import {render, remove} from '../utils/render';

// view
import FilmsListAllView from '../view/films-list-all';
import FilmsMainTitleView from '../view/films-main-title';
import FilmsListContainerView from '../view/films-list-container';
import ShowMoreButtonView from '../view/show-more-button';

// presenter
import FilmsSortPresenter from './films-sort';
import FilmCardPresenter from './film-card';
import FilmDetailsPresenter from './film-details';

const FilmCount = {
  STEP: 5,
  EXTRA: 2,
};

const actionTypetoFilterType = {
  [UserAction.UPDATE_WATHLIST]: FilterType.WATCHLIST,
  [UserAction.UPDATE_WATCHED]: FilterType.WATCHED,
  [UserAction.UPDATE_FAVORITE]: FilterType.FAVORITE,
};

export default class AllFilms {
  constructor(container, filmsModel, commentsModel, filterModel, sortModel, api) {
    this._containerView = container;

    this._filmsModel = filmsModel;
    this._commentsModel = commentsModel;
    this._filterModel = filterModel;
    this._sortModel = sortModel;
    this._api = api;

    this._renderedFilmCount = FilmCount.STEP;

    this._filmsListContainerView = null;
    this._showMoreButtonView = null;

    this._handleShowMoreButtonClick = this._handleShowMoreButtonClick.bind(this);
    this._changeMode = this._changeMode.bind(this);
    this._closeFilmDetails = this._closeFilmDetails.bind(this);

    this._handleViewAction = this._handleViewAction.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);

    this._filmsModel.subscribe(this._handleModelEvent);
    this._filterModel.subscribe(this._handleModelEvent);
    this._sortModel.subscribe(this._handleModelEvent);

    this._filmPresenterMap = new Map();
    this._filmDetailsPresenterMap = new Map();
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

  _handleModelEvent(updateType, data) {
    switch (updateType) {
      case UpdateType.PATCH:
        this._filmPresenterMap.get(data.id).init(data);
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

  _handleViewAction(actionType, updateType, update) {
    switch (actionType) {
      case UserAction.UPDATE_WATHLIST:
      case UserAction.UPDATE_WATCHED:
      case UserAction.UPDATE_FAVORITE:
        this._api.updateFilm(update).then((response) => {
          this._filmsModel.updateItem(
            this._filterModel.getType() === actionTypetoFilterType[actionType] ? UpdateType.MINOR : updateType,
            response,
          );
        });
        break;

      case UserAction.UPDATE_SORT:
        this._sortModel.setType(updateType, update);
        break;
    }
  }

  _changeMode(film) {
    this._filmDetailsPresenterMap.forEach((presenter) => presenter.resetView());
    this._showFilmDetails(film);
  }

  _renderFilmCard(film) {
    const filmPresenter = new FilmCardPresenter(
      this._filmsListContainerView,
      this._changeMode,
      this._handleViewAction,
    );
    filmPresenter.init(film);
    this._filmPresenterMap.set(film.id, filmPresenter);
  }

  _renderFilmsList(films) {
    films.forEach((film) => this._renderFilmCard(film));
  }

  _renderFilmDetails(film) {
    const filmDetailsPresenter = new FilmDetailsPresenter(
      this._filmsModel,
      this._commentsModel,
      this._handleViewAction,
      this._closeFilmDetails,
      this._api,
    );

    filmDetailsPresenter.init(film);
    this._filmDetailsPresenterMap.set(film.id, filmDetailsPresenter);
  }

  _showFilmDetails(film) {
    this._filmPresenterMap.forEach((presenter) => presenter.lockControls());
    this._renderFilmDetails(film);
  }

  _closeFilmDetails() {
    this._filmPresenterMap.forEach((presenter) => presenter.unlockControls());
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
    const films = this._getFilms();
    const filmCount = films.length;
    const newRenderedFilmCount = Math.min(filmCount, this._renderedFilmCount + FilmCount.STEP);
    const nextFilms = films.slice(this._renderedFilmCount, newRenderedFilmCount);

    this._renderFilmsList(nextFilms);
    this._renderedFilmCount = newRenderedFilmCount;

    if (this._renderedFilmCount >= filmCount) {
      remove(this._showMoreButtonView);
    }
  }

  _renderFilmsSort() {
    this._filmsSortPresenter = new FilmsSortPresenter(
      this._containerView,
      this._sortModel,
      this._handleViewAction,
    );
  }

  _renderSection() {
    this._filmsListAllView = new FilmsListAllView();
    render(this._containerView, this._filmsListAllView);
  }

  _renderFilmsMainTitle(count) {
    this._filmsMainTitleView = new FilmsMainTitleView(count);
    render(this._filmsListAllView, this._filmsMainTitleView, InsertPlace.PREP_END);
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

    this._filmPresenterMap.forEach((presenter) => presenter.destroy());
    this._filmPresenterMap.clear();

    remove(this._filmsMainTitleView);
    remove(this._showMoreButtonView);
    remove(this._filmsListContainerView);

    this._filmsSortPresenter.destroy();

    this._renderedFilmCount = resetRenderedFilmCount
      ? FilmCount.STEP
      : Math.min(this._getFilms().length, this._renderedFilmCount);

    if (this._renderedFilmCount === 0) {
      this._filmDetailsPresenterMap.forEach((presenter) => presenter.resetView());
    }
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
