// const
import {InsertPlace, SortType, UpdateType, FilterType, UserAction, UserDetail} from '../const';

// utils
import {render, remove} from '../utils/render';

// view
import FilmsMainSectionView from '../view/films-main-section';
import FilmsListSectionView from '../view/films-list-section';
import FilmsLoadingTitleView from '../view/films-loading-title';
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

const actionTypeToFilterType = {
  [UserAction.UPDATE_WATHLIST]: FilterType.WATCHLIST,
  [UserAction.UPDATE_WATCHED]: FilterType.HISTORY,
  [UserAction.UPDATE_FAVORITE]: FilterType.FAVORITES,
};

const filterTypeToUserDetail = {
  [FilterType.WATCHLIST]: UserDetail.WATCHLIST,
  [FilterType.HISTORY]: UserDetail.WATCHED,
  [FilterType.FAVORITES]: UserDetail.FAVORITE,
};

export default class Board {
  constructor(container, filmsModel, commentsModel, filterModel, sortModel, api) {
    this._containerView = container;

    this._filmsModel = filmsModel;
    this._commentsModel = commentsModel;
    this._filterModel = filterModel;
    this._sortModel = sortModel;
    this._api = api;

    this._renderedFilmCount = FilmCount.STEP;

    this._handleShowMoreButtonClick = this._handleShowMoreButtonClick.bind(this);
    this._changeMode = this._changeMode.bind(this);
    this._closeFilmDetails = this._closeFilmDetails.bind(this);

    this._handleViewAction = this._handleViewAction.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);

    this._filmsModel.subscribe(this._handleModelEvent);
    this._filterModel.subscribe(this._handleModelEvent);
    this._sortModel.subscribe(this._handleModelEvent);

    this._filmPresenterMap = new Map();
    this._filmDetailsPresenter = null;

    this._isLoading = true;
  }

  init() {
    this._renderFilmsBoard();
  }

  _getFilms() {
    const films = this._filmsModel.getItems();
    const filterType = this._filterModel.getType();
    const filtredFilms = filterType !== FilterType.ALL ? films.filter((film) => film[filterTypeToUserDetail[filterType]]) : films;
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

      case UpdateType.INIT:
        this._isLoading = false;
        remove(this._loadingTitleView);
        this._renderFilmsBoard();
        break;

      case UpdateType.PATCH:
        if (this._filmPresenterMap.size > 0) {
          this._filmPresenterMap.get(data.id).init(data);
        }
        break;

      case UpdateType.MINOR:
        this._clearFilmsBoard();
        this._renderFilmsBoard();
        break;

      case UpdateType.MAJOR:
        this._clearFilmsBoard({resetRenderedFilmCount: true});
        this._renderFilmsBoard();
        break;

      case UpdateType.CLEAR:
        this._clearFilmsBoard({resetRenderedFilmCount: true});
        break;
    }
  }

  _handleViewAction(actionType, updateType, update) {
    switch (actionType) {
      case UserAction.UPDATE_WATHLIST:
      case UserAction.UPDATE_WATCHED:
      case UserAction.UPDATE_FAVORITE:
        this._api.updateFilm(update)
          .then((response) => {
            this._filmsModel.updateItem(
              this._filterModel.getType() === actionTypeToFilterType[actionType] ? UpdateType.MINOR : updateType,
              response,
            );
          })
          .catch(() => this._filmDetailsPresenter.setErrorEffect());
        break;

      case UserAction.UPDATE_SORT:
        this._sortModel.setType(updateType, update);
        break;
    }
  }

  _renderFilmsSort() {
    this._filmsSortPresenter = new FilmsSortPresenter(
      this._mainSectionView,
      this._sortModel,
      this._handleViewAction,
    );
    this._filmsSortPresenter.init();
  }

  _renderMainSection() {
    this._mainSectionView = new FilmsMainSectionView();
    render(this._containerView, this._mainSectionView);
  }

  _renderListSection() {
    this._listSectionView = new FilmsListSectionView();
    render(this._mainSectionView, this._listSectionView);
  }

  _renderLoadingTitle() {
    this._loadingTitleView = new FilmsLoadingTitleView();
    render(this._containerView, this._loadingTitleView, InsertPlace.PREP_END);
  }

  _renderMainTitle(count) {
    this._mainTitleView = new FilmsMainTitleView(count);
    render(this._listSectionView, this._mainTitleView, InsertPlace.PREP_END);
  }

  _changeMode(film) {
    if (this._filmDetailsPresenter !== null) {
      this._filmDetailsPresenter.resetView();
    }

    this._showFilmDetails(film);
  }

  _renderFilmCard(film) {
    const filmPresenter = new FilmCardPresenter(
      this._listContainerView,
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
    this._filmDetailsPresenter = new FilmDetailsPresenter(
      this._filmsModel,
      this._commentsModel,
      this._handleViewAction,
      this._closeFilmDetails,
      this._api,
    );

    this._filmDetailsPresenter.init(film);
  }

  _showFilmDetails(film) {
    this._filmPresenterMap.forEach((presenter) => presenter.setStatusDisable());
    this._renderFilmDetails(film);
  }

  _closeFilmDetails() {
    this._filmPresenterMap.forEach((presenter) => presenter.unsetStatusDisable());
  }

  _renderShowMoreButton() {
    if (this._showMoreButtonView !== null) {
      this._showMoreButtonView = null;
    }

    this._showMoreButtonView = new ShowMoreButtonView();
    this._showMoreButtonView.setClickHandler(this._handleShowMoreButtonClick);
    render(this._listContainerView, this._showMoreButtonView, InsertPlace.AFTER_END);
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

  _renderFilms(films, count) {
    if (this._listContainerView !== null) {
      this._listContainerView = null;
    }

    this._listContainerView = new FilmsListContainerView();

    this._renderFilmsList(films.slice(0, Math.min(count, this._renderedFilmCount)));
    render(this._listSectionView, this._listContainerView);

    if (count > this._renderedFilmCount) {
      this._renderShowMoreButton();
    }
  }

  _clearFilmsBoard({resetRenderedFilmCount = false} = {}) {

    this._filmPresenterMap.forEach((presenter) => presenter.destroy());
    this._filmPresenterMap.clear();

    remove(this._mainTitleView);
    remove(this._showMoreButtonView);
    remove(this._listContainerView);
    remove(this._listSectionView);
    remove(this._mainSectionView);

    this._filmsSortPresenter.destroy();

    this._renderedFilmCount = resetRenderedFilmCount || this._renderedFilmCount === 0
      ? FilmCount.STEP
      : Math.min(this._getFilms().length, this._renderedFilmCount);
  }

  _renderFilmsBoard() {
    if (this._isLoading) {
      this._renderLoadingTitle();
      return;
    }

    const films = this._getFilms();
    const filmCount = films.length;

    this._renderMainSection();
    this._renderListSection();
    this._renderMainTitle(filmCount);

    if (filmCount > 0) {
      this._renderFilmsSort();
      this._renderFilms(films, filmCount);
    }
  }
}
