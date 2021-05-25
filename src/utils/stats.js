export const getStats = (films) => {
  return films.reduce((stats, {time, genres}) => {
    genres.forEach((item) => {

      if (!(stats.genres[item] !== undefined)) {
        stats.genres[item] = 0;
      }

      stats.genres[item] += 1;
    });

    stats.watchedCount += 1;
    stats.watchedTime += time;

    return stats;

  }, {watchedCount: 0, watchedTime: 0, genres: {}});
};
