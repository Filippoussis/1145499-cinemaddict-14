import Observer from '../utils/observer';
import {FilterType} from '../const';

export default class Filter extends Observer {
  constructor() {
    super();
    this._activeFilter = FilterType.ALL;
  }

  setFilter(updateType, selectedFilter) {
    this._activeFilter = selectedFilter;
    this._notify(updateType, selectedFilter);
  }

  getFilter() {
    return this._activeFilter;
  }
}
