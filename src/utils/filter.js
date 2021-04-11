export const getFilterStats = (films) => {
  return films.reduce((stats, {isWatchlist, isWatched, isFavorite}) => {
    if (isWatchlist) {
      stats.watchlistCount += 1;
    }
    if (isWatched) {
      stats.watchedCount += 1;
    }
    if (isFavorite) {
      stats.favoriteCount += 1;
    }

    return stats;

  }, {watchlistCount: 0, watchedCount: 0, favoriteCount: 0});
};
