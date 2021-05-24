// const
import {InsertPlace, UserAction, UpdateType} from '../const';

// utils
import {render, remove} from '../utils/render';

// view
import PageHeaderView from '../view/page-header';
import PageMainView from '../view/page-main';
import PageFooterView from '../view/page-footer';
import UserStatisticView from '../view/user-statistic';

// presenter
import UserProfilePresenter from './user-profile';
import MainNavigationPresenter from './main-navigation';
import BoardPresenter from './board';
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

    this._isStatistic = false;
  }

  init() {
    this._renderPageHeader();
    this._renderPageMain();
    this._renderPageFooter();
    this._renderBoard();
  }

  _renderPageHeader() {
    this._pageHeaderView = new PageHeaderView();
    render(this._mainContainer, this._pageHeaderView, InsertPlace.PREP_END);
  }

  _renderPageMain() {
    this._pageMainView = new PageMainView();
    render(this._mainContainer, this._pageMainView);
  }

  _renderPageFooter() {
    this._pageFooterView = new PageFooterView();
    render(this._mainContainer, this._pageFooterView);
  }

  _renderUserProfile() {
    const userProfilePresenter = new UserProfilePresenter(this._pageHeaderView, this._filmsModel);
    userProfilePresenter.init();
  }

  _renderMainNavigation() {
    this._mainNavigationPresenter = new MainNavigationPresenter(
      this._pageMainView,
      this._filterModel,
      this._filmsModel,
      this._handleViewAction,
    );
    this._mainNavigationPresenter.init();
  }

  _renderUserStatistic() {
    const watchedFilms = this._filmsModel.getItems().filter((film) => film.watched);
    this._userStatisticView = new UserStatisticView(watchedFilms);
    render(this._pageMainView, this._userStatisticView);
  }

  _renderFilmsTotal() {
    const filmsTotalPresenter = new FilmsTotalPresenter(this._pageFooterView, this._filmsModel);
    filmsTotalPresenter.init();
  }

  _renderBoard() {
    this._boardPresenter = new BoardPresenter(
      this._pageMainView,
      this._filmsModel,
      this._commentsModel,
      this._filterModel,
      this._sortModel,
      this._api,
    );
    this._boardPresenter.init();
  }

  _handleViewAction(actionType, updateType, update) {
    switch (actionType) {

      case UserAction.GO_TO_STATISTIC:
        this._sortModel.resetType();
        this._filterModel.setType(updateType, update);
        this._renderUserStatistic();
        this._isStatistic = true;
        break;

      case UserAction.UPDATE_FILTER:
        if (this._isStatistic) {
          remove(this._userStatisticView);
          this._isStatistic = false;
        }

        this._sortModel.resetType();
        this._filterModel.setType(updateType, update);
        break;
    }
  }

  _handleModelEvent(updateType) {
    switch (updateType) {
      case UpdateType.INIT:
        this._renderUserProfile();
        this._renderMainNavigation();
        this._renderFilmsTotal();
        break;
    }
  }
}
