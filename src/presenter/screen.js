// const
import {InsertPlace, UserAction, UpdateType} from '../const';

// utils
import {render, remove} from '../utils/render';

// view
import PageHeaderView from '../view/page-header';
import MainNavigationView from '../view/main-navigation';
import FilmsStatsView from '../view/films-stats';
import PageMainView from '../view/page-main';
import MainContentView from '../view/main-content';
import PageFooterView from '../view/page-footer';
import FilmsTitleLoadingView from '../view/films-title-loading';

// presenter
import UserProfilePresenter from './user-profile';
import FilmsFilterPresenter from './films-filter';
import AllFilmsPresenter from './all-films';
import FilmsTotalPresenter from './films-total';

export default class Screen {
  constructor(mainContainer, filmsModel, commentsModel, filterModel, sortModel, api) {
    this._mainContainer = mainContainer;
    this._filmsModel = filmsModel;
    this._commentsModel = commentsModel;
    this._filterModel = filterModel;
    this._sortModel = sortModel;
    this._api = api;

    this._handleViewAction = this._handleViewAction.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);

    this._filmsModel.subscribe(this._handleModelEvent);

    this._isFilmsLoading = true;
  }

  init() {
    this._renderPageHeader();
    this._renderPageMain();
    this._renderPageFooter();

    if (this._isFilmsLoading) {
      this._renderLoading();
      return;
    }
  }

  _renderPageHeader() {
    this._pageHeaderView = new PageHeaderView();
    render(this._mainContainer, this._pageHeaderView, InsertPlace.PREP_END);
  }

  _renderPageMain() {
    this._pageMainView = new PageMainView();

    this._renderMainNavigation();
    this._renderMainContent();

    render(this._mainContainer, this._pageMainView);
  }

  _renderMainNavigation() {
    this._mainNavigationView = new MainNavigationView();
    render(this._pageMainView, this._mainNavigationView, InsertPlace.PREP_END);
  }

  _renderMainContent() {
    this._mainContentView = new MainContentView();
    render(this._pageMainView, this._mainContentView);
  }

  _renderPageFooter() {
    this._pageFooterView = new PageFooterView();
    render(this._mainContainer, this._pageFooterView);
  }

  _renderLoading() {
    this._filmsTitleLoadingView = new FilmsTitleLoadingView();
    render(this._mainContentView, this._filmsTitleLoadingView, InsertPlace.PREP_END);
  }

  _renderUserProfile() {
    const userProfilePresenter = new UserProfilePresenter(this._pageHeaderView, this._filmsModel);
    userProfilePresenter.init();
  }

  _renderFilmsFilter() {
    const filmsFilterPresenter = new FilmsFilterPresenter(
      this._mainNavigationView,
      this._filterModel,
      this._filmsModel,
      this._handleViewAction,
    );
    filmsFilterPresenter.init();
  }

  _renderFilmsStats() {
    const filmsStatsView = new FilmsStatsView();
    render(this._mainNavigationView, filmsStatsView);
  }

  _renderAllFilms() {
    const allFilms = new AllFilmsPresenter(
      this._mainContentView,
      this._filmsModel,
      this._commentsModel,
      this._filterModel,
      this._sortModel,
      this._api,
    );
    allFilms.init();
  }

  _renderFilmsTotal() {
    const filmsTotalPresenter = new FilmsTotalPresenter(this._pageFooterView, this._filmsModel);
    filmsTotalPresenter.init();
  }

  _handleViewAction(actionType, updateType, update) {
    switch (actionType) {
      case UserAction.UPDATE_FILTER:
        this._sortModel.resetType();
        this._filterModel.setType(updateType, update);
        break;
    }
  }

  _handleModelEvent(updateType) {
    switch (updateType) {
      case UpdateType.INIT:

        this._isFilmsLoading = false;
        remove(this._filmsTitleLoadingView);

        this._renderUserProfile();
        this._renderFilmsFilter();
        this._renderFilmsStats();
        this._renderAllFilms();
        this._renderFilmsTotal();

        break;
    }
  }
}
