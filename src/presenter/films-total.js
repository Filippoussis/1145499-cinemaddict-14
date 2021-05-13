// utils
import {render} from '../utils/render';

// view
import FilmsTotalView from '../view/films-total';

export default class FilmsTotal {
  constructor(container, filmsModel) {
    this._containerView = container;
    this._filmsModel = filmsModel;
  }

  init() {
    this._renderSection();
  }

  _getItems() {
    return this._filmsModel.getItems();
  }

  _getItemsCount() {
    return this._getItems().length;
  }

  _renderSection() {
    render(this._containerView, new FilmsTotalView(this._getItemsCount()));
  }
}
