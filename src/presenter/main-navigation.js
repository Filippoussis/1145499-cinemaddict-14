import MainNavigationView from '../view/main-navigation';
import {render, replace, remove} from '../utils/render';
import {getFilterStats} from '../utils/filter';
import {UpdateType, InsertPlace, UserAction, FilterType} from '../const';

export default class MainNavigation {
  constructor(container, filterModel, filmsModel, changeData) {
    this._containerView = container;
    this._filterModel = filterModel;
    this._filmsModel = filmsModel;
    this._changeData = changeData;

    this._sectionView = null;

    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._handleTypeChange = this._handleTypeChange.bind(this);

    this._filmsModel.subscribe(this._handleModelEvent);
    this._filterModel.subscribe(this._handleModelEvent);
  }

  init() {
    const filtersStats = this._getStats();
    const prevSectionView = this._sectionView;

    this._sectionView = new MainNavigationView(filtersStats, this._filterModel.getType());
    this._sectionView.setTypeChangeHandler(this._handleTypeChange);

    if (prevSectionView === null) {
      render(this._containerView, this._sectionView, InsertPlace.PREP_END);
      return;
    }

    replace(this._sectionView, prevSectionView);
    remove(prevSectionView);
  }

  _handleModelEvent() {
    this.init();
  }

  _getStats() {
    return getFilterStats(this._filmsModel.getItems());
  }

  _handleTypeChange(filterType) {
    if (this._filterModel.getType() === filterType) {
      return;
    }

    const isUpdateFilter = FilterType[filterType];

    this._changeData(
      isUpdateFilter ? UserAction.UPDATE_FILTER : UserAction.GO_TO_STATISTIC,
      isUpdateFilter? UpdateType.MAJOR : UpdateType.CLEAR,
      filterType,
    );
  }
}
