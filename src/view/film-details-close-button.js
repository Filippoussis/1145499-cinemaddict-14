import AbstractView from './abstract';

const createFilmDetailsCloseButtonTemplate = () => {
  return (
    `<div class="film-details__close">
      <button class="film-details__close-btn" type="button">close</button>
    </div>`
  );
};

export default class FilmDetailsCloseButton extends AbstractView {
  constructor() {
    super();

    this._closeButtonClickHandler = this._closeButtonClickHandler.bind(this);
  }

  getTemplate() {
    return createFilmDetailsCloseButtonTemplate();
  }

  setCloseButtonClickHandler(callback) {
    this._callback.clickCloseButton = callback;
    this.getElement().firstElementChild.addEventListener('click', this._closeButtonClickHandler);
  }

  _closeButtonClickHandler(evt) {
    evt.preventDefault();
    this._callback.clickCloseButton();
  }
}
