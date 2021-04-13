import AbstractView from './abstract';

const createUserProfileTemplate = (rank) => {

  return (
    `<section class="header__profile profile">
      <p class="profile__rating">${rank}</p>
      <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
    </section>`
  );
};

export default class UserProfile extends AbstractView {
  constructor(rank) {
    super();
    this._state = rank;
  }

  getTemplate() {
    return createUserProfileTemplate(this._state);
  }
}
