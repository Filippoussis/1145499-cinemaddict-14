import Observer from '../utils/observer';
import {SortType} from '../const';

export default class Sort extends Observer {
  constructor() {
    super();
    this._active = SortType.DEFAULT;
  }

  setType(updateType, selectedType) {
    this._active = selectedType;
    this._notify(updateType, selectedType);
  }

  getType() {
    return this._active;
  }

  resetType() {
    this._active = SortType.DEFAULT;
  }
}
