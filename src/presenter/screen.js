// const
import {InsertPlace, UserAction} from '../const';

// utils
import {render} from '../utils/render';

// view
import PageHeaderView from '../view/page-header';
import MainNavigationView from '../view/main-navigation';
import FilmsStatsView from '../view/films-stats';
import PageMainView from '../view/page-main';
import MainContentView from '../view/main-content';
import PageFooterView from '../view/page-footer';

// presenter
import UserProfilePresenter from './user-profile';
import FilmsFilterPresenter from './films-filter';
import AllFilmsPresenter from './all-films';
import FilmsTotalPresenter from './films-total';

export default class Screen {
  constructor(mainContainer, filmsModel, commentsModel, filterModel, sortModel) {
    this._mainContainer = mainContainer;
    this._filmsModel = filmsModel;
    this._commentsModel = commentsModel;
    this._filterModel = filterModel;
    this._sortModel = sortModel;

    this._pageHeaderView = new PageHeaderView();
    this._pageMainView = new PageMainView();
    this._mainNavigationView = new MainNavigationView();
    this._mainContentView = new MainContentView();
    this._pageFooterView = new PageFooterView();

    this._handleViewAction = this._handleViewAction.bind(this);
  }

  init() {
    this._renderPageHeader();
    this._renderPageMain();
    this._renderPageFooter();
  }

  _getFilms() {
    return this._filmsModel.getItems();
  }

  _renderPageHeader() {
    this._renderUserProfile();
    render(this._mainContainer, this._pageHeaderView, InsertPlace.PREP_END);
  }

  _renderPageMain() {
    this._renderMainNavigation();
    this._renderMainContent();
    this._renderAllFilms();

    render(this._mainContainer, this._pageMainView);
  }

  _renderPageFooter() {
    this._renderFilmsTotal();
    render(this._mainContainer, this._pageFooterView);
  }

  _renderUserProfile() {
    const userProfilePresenter = new UserProfilePresenter(this._pageHeaderView, this._filmsModel);
    userProfilePresenter.init();
  }

  _renderMainNavigation() {
    this._renderFilmsFilter();
    this._renderFilmsStats();
    render(this._pageMainView, this._mainNavigationView, InsertPlace.PREP_END);
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

  _renderMainContent() {
    render(this._pageMainView, this._mainContentView);
  }

  _renderAllFilms() {
    const allFilms = new AllFilmsPresenter(
      this._mainContentView,
      this._filmsModel,
      this._commentsModel,
      this._filterModel,
      this._sortModel,
      this._handleViewAction,
    );
    allFilms.init();
  }

  _renderFilmsTotal() {
    const filmsTotalPresenter = new FilmsTotalPresenter(this._pageFooterView, this._filmsModel);
    filmsTotalPresenter.init();
  }

  _handleViewAction(actionType, updateType, update) {
    switch (actionType) {
      case UserAction.UPDATE_FILM:
        this._filmsModel.updateItem(updateType, update);
        break;
      case UserAction.SORT_FILMS:
        this._sortModel.setType(updateType, update);
        break;
      case UserAction.FILTER_FILMS:
        this._sortModel.resetType();
        this._filterModel.setType(updateType, update);
        break;
    }
  }
}
