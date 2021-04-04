export const getFilterTemplate = (films) => {

  const watchlistCount = films.filter((film) => film.isWatchlist).length;
  const historyCount = films.filter((film) => film.isWatched).length;
  const favoriteCount = films.filter((film) => film.isFavorite).length;

  return (
    `<nav class="main-navigation">
      <div class="main-navigation__items">
        <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
        <a href="#watchlist" class="main-navigation__item">Watchlist <span class="main-navigation__item-count">${watchlistCount}</span></a>
        <a href="#history" class="main-navigation__item">History <span class="main-navigation__item-count">${historyCount}</span></a>
        <a href="#favorites" class="main-navigation__item">Favorites <span class="main-navigation__item-count">${favoriteCount}</span></a>
      </div>
      <a href="#stats" class="main-navigation__additional">Stats</a>
    </nav>`
  );
};
