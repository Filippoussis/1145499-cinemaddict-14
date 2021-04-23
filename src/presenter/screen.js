// const
import {InsertPlace} from '../const';

// utils
import {render} from '../utils/render';
import {getRatingTitle} from '../utils/rating';
import {getFilterStats} from '../utils/filter';

// view
import PageHeaderView from '../view/page-header';
import PageMainView from '../view/page-main';
import PageFooterView from '../view/page-footer';
import UserProfileView from '../view/user-profile';
import FilmsFilterView from '../view/films-filter';
import FilmsSortView from '../view/films-sort';
import MainContentView from '../view/main-content';
import FilmsTotalView from '../view/films-total';
import NoFilmsView from '../view/no-films';
import AllFilmsPresenter from './all-films';

export default class ScreenPresenter {
  constructor(container) {
    this._container = container;

    this._headerView = new PageHeaderView();
    this._mainView = new PageMainView();
    this._footerView = new PageFooterView();
    this._mainContentView = new MainContentView();

    render(this._container, this._headerView);
    render(this._container, this._mainView);
    render(this._container, this._footerView);
  }

  init(films, comments) {
    this._films = films.slice();
    this._comments = comments.slice();

    const filmsTotalCount = this._films.length;
    const filterStats = getFilterStats(this._films);
    const watchedFilmsCount = filterStats.watchedCount;
    const userRank = getRatingTitle(watchedFilmsCount);

    this._renderUserProfile(userRank);
    this._renderFilmsFilter(filterStats);
    this._renderFilmsTotal(filmsTotalCount);
    this._renderMainContent();

    if (filmsTotalCount > 0) {
      this._renderFilmsSort();
      this._renderAllFilms();
    } else {
      this._renderNoFilms();
    }
  }

  _renderUserProfile(rank) {
    render(this._headerView, new UserProfileView(rank));
  }

  _renderFilmsFilter(stats) {
    render(this._mainView, new FilmsFilterView(stats));
  }

  _renderMainContent() {
    render(this._mainView, this._mainContentView);
  }

  _renderFilmsSort() {
    render(this._mainContentView, new FilmsSortView(), InsertPlace.BEFORE_BEGIN);
  }

  _renderFilmsTotal(total) {
    render(this._footerView, new FilmsTotalView(total));
  }

  _renderNoFilms() {
    render(this._mainContentView, new NoFilmsView());
  }

  _renderAllFilms() {
    const allFilms = new AllFilmsPresenter(this._mainContentView);
    allFilms.init(this._films, this._comments);
  }
}
