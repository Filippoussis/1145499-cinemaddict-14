import FilmsSortView from '../view/films-sort';
import {InsertPlace, UpdateType} from '../const';
import {render, replace, remove} from '../utils/render';

export default class FilmsSort {
  constructor(filmsSortContainer, sortModel, filterModel) {
    this._filmsSortContainer = filmsSortContainer;
    this._sortModel = sortModel;
    this._filterModel = filterModel;

    this._filmsSortView = null;

    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
    this._handleSortModelEvent = this._handleSortModelEvent.bind(this);
    this._handleFilterModelEvent = this._handleFilterModelEvent.bind(this);

    this._filterModel.addObserver(this._handleFilterModelEvent);
    this._sortModel.addObserver(this._handleSortModelEvent);
  }

  init() {
    const prevFilmsSortView = this._filmsSortView;

    this._filmsSortView = new FilmsSortView(this._sortModel.getSort());
    this._filmsSortView.setSortTypeChangeHandler(this._handleSortTypeChange);

    if (prevFilmsSortView === null) {
      render(this._filmsSortContainer, this._filmsSortView, InsertPlace.AFTER_END);
      return;
    }

    replace(this._filmsSortView, prevFilmsSortView);
    remove(prevFilmsSortView);
  }

  _handleSortModelEvent() {
    this.init();
  }

  _handleFilterModelEvent() {
    this._sortModel.resetSort();
    this._handleSortModelEvent();
  }

  _handleSortTypeChange(sortType) {
    if (this._sortModel.getSort() === sortType) {
      return;
    }

    this._sortModel.setSort(UpdateType.MAJOR, sortType);
  }
}
