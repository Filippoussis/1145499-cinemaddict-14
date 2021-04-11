export const getFilterStats = (films) => {
  return films.reduce((stats, {isWatchlist, isWatched, isFavorite}) => {
    if (isWatchlist) stats.watchlistCount += Number(isWatchlist);
    if (isWatched) stats.watchedCount += Number(isWatched);
    if (isFavorite) stats.favoriteCount += Number(isFavorite);

    return stats;

  }, {watchlistCount: 0, watchedCount: 0, favoriteCount: 0});
};
