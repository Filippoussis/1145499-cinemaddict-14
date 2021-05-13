import Observer from '../utils/observer';
import {FilterType} from '../const';

export default class Filter extends Observer {
  constructor() {
    super();
    this._active = FilterType.ALL;
  }

  setType(updateType, selectedType) {
    this._active = selectedType;
    this._notify(updateType, selectedType);
  }

  getType() {
    return this._active;
  }
}
