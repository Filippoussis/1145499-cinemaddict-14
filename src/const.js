export const InsertPlace = {
  BEFORE_END: 'beforeend',
  AFTER_END: 'afterend',
  BEFORE_BEGIN: 'beforebegin',
  PREP_END: 'prepend',
};

export const SortType = {
  DEFAULT: 'default',
  DATE: 'date',
  RATING: 'rating',
};

export const UserAction = {
  UPDATE_FILM: 'UPDATE_FILM',
  UPDATE_SORT: 'UPDATE_SORT',
  UPDATE_FILTER: 'UPDATE_FILTER',
  UPDATE_WATHLIST: 'UPDATE_WATHLIST',
  UPDATE_WATCHED: 'UPDATE_WATCHED',
  UPDATE_FAVORITE: 'UPDATE_FAVORITE',
};

export const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
  INIT: 'INIT',
};

export const FilterType = {
  ALL: 'all',
  WATCHLIST: 'isWatchlist',
  WATCHED: 'isWatched',
  FAVORITE: 'isFavorite',
};
