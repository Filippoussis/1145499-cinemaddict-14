// utils
import {render, replace, remove} from '../utils/render';
import {getRatingTitle} from '../utils/rating';

// view
import UserProfileView from '../view/user-profile';

export default class UserProfile {
  constructor(container, filmsModel) {
    this._containerView = container;

    this._filmsModel = filmsModel;

    this._sectionView = null;

    this._handleModelEvent = this._handleModelEvent.bind(this);

    this._filmsModel.subscribe(this._handleModelEvent);
  }

  init() {
    const userRank = this._getRank();

    const prevSectionView = this._sectionView;
    this._sectionView = new UserProfileView(userRank);

    if (prevSectionView === null) {
      render(this._containerView, this._sectionView);
      return;
    }

    replace(this._sectionView, prevSectionView);
    remove(prevSectionView);
  }

  _handleModelEvent() {
    this.init();
  }

  _getFilms() {
    return this._filmsModel.getItems();
  }

  _getWatchedFilmsCount() {
    return this._getFilms().reduce((count, film) => film.isWatched ? count + 1 : count, 0);
  }

  _getRank() {
    return getRatingTitle(this._getWatchedFilmsCount());
  }
}
