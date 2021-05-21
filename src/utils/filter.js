export const getFilterStats = (films) => {
  return films.reduce((stats, {watchlist, watched, favorite}) => {
    if (watchlist) {
      stats.watchlistCount += 1;
    }
    if (watched) {
      stats.watchedCount += 1;
    }
    if (favorite) {
      stats.favoriteCount += 1;
    }

    return stats;

  }, {watchlistCount: 0, watchedCount: 0, favoriteCount: 0});
};
