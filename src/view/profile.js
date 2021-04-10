import {createElement} from '../utils/render';

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

const getProfileRank = (watchedFilmsCount) => {
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

const createProfileTemplate = (watchedFilmsCount) => {

  const rank = getProfileRank(watchedFilmsCount);

  return (
    `<section class="header__profile profile">
      <p class="profile__rating">${rank}</p>
      <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
    </section>`
  );
};

export default class Profile {
  constructor(watchedFilmsCount) {
    this._element = null;
    this._watchedFilmsCount = watchedFilmsCount;
  }

  getTemplate() {
    return createProfileTemplate(this._watchedFilmsCount);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
