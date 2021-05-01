import AbstractView from './abstract';

export default class Smart extends AbstractView {
  constructor() {
    super();

    this._state = {};
  }

  updateData(update, justStateUpdating) {
    if (!update) {
      return;
    }

    this._state = Object.assign(
      {},
      this._state,
      update,
    );

    if (justStateUpdating) {
      return;
    }

    this.updateElement();
  }

  updateElement() {
    const prevNode = this.getElement();
    const parent = prevNode.parentElement;
    this.removeElement();

    const newNode = this.getElement();

    parent.replaceChild(newNode, prevNode);
    this.restoreHandlers();
  }

  restoreHandlers() {
    throw new Error('Abstract method not implemented: resetHandlers');
  }
}
