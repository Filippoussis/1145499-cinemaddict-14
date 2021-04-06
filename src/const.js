export const FilmCount = {
  STEP: 5,
  EXTRA: 2,
};

export const InsertPlace = {
  BEFORE_END: 'beforeend',
  AFTER_END: 'afterend',
};

export const DESCRIPTION_MAX_LENGTH = 140;

export const OPENING_POPUP_CLASS_NAMES = [
  'film-card__poster',
  'film-card__description',
  'film-card__comments',
];

const RankNovice = {
  MIN: 1,
  MAX: 10,
  TITLE: 'Novice',
};

const RankFan = {
  MIN: 11,
  MAX: 20,
  TITLE: 'Fan',
};

const RankMovieBuff = {
  MIN: 21,
  TITLE: 'Movie Buff',
};

export const getProfileRank = (watchedFilmsCount) => {
  switch(true) {
    case watchedFilmsCount >= RankNovice.MIN && watchedFilmsCount <= RankNovice.MAX:
      return RankNovice.TITLE;
    case watchedFilmsCount >= RankFan.MIN && watchedFilmsCount <= RankFan.MAX:
      return RankFan.TITLE;
    case watchedFilmsCount >= RankMovieBuff.MIN:
      return RankMovieBuff.TITLE;
    default:
      return '';
  }
};

const ContolActive = {
  ATTRIBUTE: 'checked',
  CLASS_NAME: 'film-card__controls-item--active',
};

export const addAttributeChecked = (isContolActive) => {
  return isContolActive ? ContolActive.ATTRIBUTE : '';
};

export const addClassModActive = (isContolActive) => {
  return isContolActive ? ContolActive.CLASS_NAME : '';
};
