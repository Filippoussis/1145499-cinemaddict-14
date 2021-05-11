import Observer from '../utils/observer';
import {SortType} from '../const';

export default class Sort extends Observer {
  constructor() {
    super();
    this._activeSort = SortType.DEFAULT;
  }

  setSort(updateType, selectedSort) {
    this._activeSort = selectedSort;
    this._notify(updateType, selectedSort);
  }

  getSort() {
    return this._activeSort;
  }

  resetSort() {
    this._activeSort = SortType.DEFAULT;
  }
}
