import FilmsSortView from '../view/films-sort';
import {InsertPlace, UpdateType, UserAction} from '../const';
import {render, remove} from '../utils/render';

export default class FilmsSort {
  constructor(container, sortModel, changeData) {
    this._containerView = container;

    this._sortModel = sortModel;
    this._changeData = changeData;

    this._handleTypeChange = this._handleTypeChange.bind(this);
  }

  init() {
    this._sectionView = new FilmsSortView(this._sortModel.getType());
    this._sectionView.setTypeChangeHandler(this._handleTypeChange);
    render(this._containerView, this._sectionView, InsertPlace.BEFORE_BEGIN);
  }

  destroy() {
    if (this._sectionView !== null) {
      remove(this._sectionView);
    }
  }

  _handleTypeChange(sortType) {
    if (this._sortModel.getType() === sortType) {
      return;
    }

    this._changeData(
      UserAction.SORT_FILMS,
      UpdateType.MAJOR,
      sortType,
    );
  }
}
