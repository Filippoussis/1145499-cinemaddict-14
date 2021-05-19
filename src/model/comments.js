import Observer from '../utils/observer';

export default class Comments extends Observer {
  constructor() {
    super();
    this._items = [];
  }

  setItems(updateType, items) {
    this._items = items.slice();
    this._notify(updateType);
  }

  getItems() {
    return this._items;
  }

  deleteItem(updateType, deletedId) {
    const index = this._items.findIndex((item) => item.id === deletedId);

    if (index === -1) {
      throw new Error('Can\'t delete unexisting item');
    }

    this._items = [
      ...this._items.slice(0, index),
      ...this._items.slice(index + 1),
    ];

    this._notify(updateType);
  }
}
