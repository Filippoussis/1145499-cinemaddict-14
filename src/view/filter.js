export const getFilterTemplate = (films) => {

  const watchlistCount = films.reduce((sum, {isWatchlist}) => sum + isWatchlist, 0);
  const historyCount= films.reduce((sum, {isWatched}) => sum + isWatched, 0);
  const favoriteCount = films.reduce((sum, {isFavorite}) => sum + isFavorite, 0);

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
