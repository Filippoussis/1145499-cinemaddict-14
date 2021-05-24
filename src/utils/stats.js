export const getStats = (films) => {
  return films.reduce((stats, {time, genres}) => {
    genres.forEach((element) => {
      const isKeyInObject = element in stats.genres;

      if (!isKeyInObject) {
        stats.genres[element] = 0;
      }

      stats.genres[element] += 1;
    });

    stats.watchedCount += 1;
    stats.watchedTime += time;

    return stats;

  }, {watchedCount: 0, watchedTime: 0, genres: {}});
};
