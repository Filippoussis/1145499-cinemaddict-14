import FilterView from '../view/films-filter';
import {render, replace, remove} from '../utils/render';
import {getFilterStats} from '../utils/filter';
import {UpdateType, InsertPlace} from '../const';

export default class FilmsFilter {
  constructor(filterContainer, filterModel, filmsModel) {
    this._filterContainer = filterContainer;
    this._filterModel = filterModel;
    this._filmsModel = filmsModel;

    this._filterView = null;

    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._handleFilterTypeChange = this._handleFilterTypeChange.bind(this);

    this._filmsModel.addObserver(this._handleModelEvent);
    this._filterModel.addObserver(this._handleModelEvent);
  }

  init() {
    const filtersStats = this._getFiltersStats();
    const prevFilterView = this._filterView;

    this._filterView = new FilterView(filtersStats, this._filterModel.getFilter());
    this._filterView.setFilterTypeChangeHandler(this._handleFilterTypeChange);

    if (prevFilterView === null) {
      render(this._filterContainer, this._filterView, InsertPlace.PREP_END);
      return;
    }

    replace(this._filterView, prevFilterView);
    remove(prevFilterView);
  }

  _handleModelEvent() {
    this.init();
  }

  _getFiltersStats() {
    const films = this._filmsModel.getFilms();
    return getFilterStats(films);
  }

  _handleFilterTypeChange(filterType) {
    if (this._filterModel.getFilter() === filterType) {
      return;
    }

    this._filterModel.setFilter(UpdateType.MAJOR, filterType);
  }
}
