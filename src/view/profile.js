const getProfileRating = (watchedFilmsCount) => {

  let profileRating = '';

  if (watchedFilmsCount >= 1 && watchedFilmsCount <= 10) {
    profileRating = 'Novice';
  } else if (watchedFilmsCount >= 11 && watchedFilmsCount <= 20) {
    profileRating = 'Fan';
  } else if (watchedFilmsCount >= 21) {
    profileRating = 'Movie Buff';
  }

  return profileRating;
};

export const getProfileTemplate = (films) => {

  const watchedFilmsCount = films.filter((film) => film.isWatched === true).length;
  const profileRating = getProfileRating(watchedFilmsCount);

  return (
    `<section class="header__profile profile">
      <p class="profile__rating">${profileRating}</p>
      <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
    </section>`
  );
};
