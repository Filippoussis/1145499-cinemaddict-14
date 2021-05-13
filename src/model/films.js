import Observer from '../utils/observer';

export default class Films extends Observer {
  constructor() {
    super();
    this._items = [];
  }

  setItems(items) {
    this._items = items.slice();
  }

  getItems() {
    return this._items;
  }

  updateItem(updateType, update) {
    const index = this._items.findIndex((item) => item.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting task');
    }

    this._items = [
      ...this._items.slice(0, index),
      update,
      ...this._items.slice(index + 1),
    ];

    this._notify(updateType, update);
  }
}
