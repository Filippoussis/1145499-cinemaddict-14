// utils
import {render} from '../utils/render';

// view
import FilmsTotalView from '../view/films-total';

export default class FilmsTotal {
  constructor(filmsTotalContainer, filmsModel) {
    this._filmsTotalContainer = filmsTotalContainer;
    this._filmsModel = filmsModel;
  }

  init() {
    this._renderFilmsTotal();
  }

  _getFilms() {
    return this._filmsModel.getFilms();
  }

  _getFilmsTotal() {
    const films = this._getFilms();
    return films.length;
  }

  _renderFilmsTotal() {
    const filmsTotal = this._getFilmsTotal();
    render(this._filmsTotalContainer, new FilmsTotalView(filmsTotal));
  }
}
