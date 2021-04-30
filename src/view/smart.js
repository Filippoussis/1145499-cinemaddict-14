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
    const prevView = this.getElement();
    const parent = prevView.parentElement;
    this.removeElement();

    const newView = this.getElement();

    parent.replaceChild(newView, prevView);
    this.restoreHandlers();
  }

  restoreHandlers() {
    throw new Error('Abstract method not implemented: resetHandlers');
  }
}
