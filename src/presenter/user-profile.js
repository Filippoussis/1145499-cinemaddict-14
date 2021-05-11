// utils
import {render, replace, remove} from '../utils/render';
import {getRatingTitle} from '../utils/rating';

// view
import UserProfileView from '../view/user-profile';

export default class UserProfile {
  constructor(userProfileContainer, filmsModel) {
    this._userProfileContainer = userProfileContainer;
    this._filmsModel = filmsModel;

    this._userProfileView = null;

    this._handleModelEvent = this._handleModelEvent.bind(this);

    this._filmsModel.addObserver(this._handleModelEvent);
  }

  init() {
    const userRank = this._getUserRank();

    const prevUserProfileView = this._userProfileView;
    this._userProfileView = new UserProfileView(userRank);

    if (prevUserProfileView === null) {
      render(this._userProfileContainer, this._userProfileView);
      return;
    }

    replace(this._userProfileView, prevUserProfileView);
    remove(prevUserProfileView);
  }

  _handleModelEvent() {
    this.init();
  }

  _getFilms() {
    return this._filmsModel.getFilms();
  }

  _getWatchedFilmsCount() {
    const films = this._getFilms();
    return films.filter((film) => film.isWatched).length;
  }

  _getUserRank() {
    const watchedFilmsCount = this._getWatchedFilmsCount();
    return getRatingTitle(watchedFilmsCount);
  }
}
