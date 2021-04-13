import AbstractView from './abstract';

const createMainContentTemplate = () => {
  return (
    `<section class="films">
    </section>`
  );
};

export default class MainContent extends AbstractView {
  constructor() {
    super();

    this._clickHandler = this._clickHandler.bind(this);
  }


  getTemplate() {
    return createMainContentTemplate();
  }

  setClickHandler(callback) {
    this._callback.click = callback;
    this.getElement().addEventListener('click', this._clickHandler);
  }

  _clickHandler(evt) {
    evt.preventDefault();
    this._callback.click(evt);
  }
}
