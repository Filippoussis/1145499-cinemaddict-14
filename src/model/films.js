import Observer from '../utils/observer';

export default class Films extends Observer {
  constructor() {
    super();
    this._items = [];
  }

  setItems(updateType, items) {
    this._items = items.slice();
    this._notify(updateType);
  }

  getItems() {
    return this._items;
  }

  updateItem(updateType, update) {
    const index = this._items.findIndex((item) => item.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting task');
    }

    this._items = [
      ...this._items.slice(0, index),
      update,
      ...this._items.slice(index + 1),
    ];

    this._notify(updateType, update);
  }

  static adaptToClient(item) {
    const adaptedItem = Object.assign(
      {},
      item,
      {
        title: item.film_info.title,
        origin: item.film_info.alternative_title,
        description: item.film_info.description,
        poster: item.film_info.poster,
        rating: item.film_info.total_rating,
        release: item.film_info.release.date !== null
          ? new Date(item.film_info.release.date)
          : item.film_info.release.date,
        country: item.film_info.release.release_country,
        genres: item.film_info.genre,
        time: item.film_info.runtime,
        director: item.film_info.director,
        stars: item.film_info.actors,
        writers: item.film_info.writers,
        age: item.film_info.age_rating,
        isWatchlist: item.user_details.watchlist,
        isWatched: item.user_details.already_watched,
        isFavorite: item.user_details.favorite,
        watchingDate: item.user_details.watching_date !== null
          ? new Date(item.user_details.watching_date)
          : item.user_details.watching_date,
      },
    );

    delete adaptedItem.film_info;
    delete adaptedItem.user_details;

    return adaptedItem;
  }

  static adaptToServer(item) {
    const adaptedItem = Object.assign(
      {},
      item,
      {
        'film_info': {
          'title': item.title,
          'alternative_title': item.origin,
          'total_rating': item.rating,
          'poster': item.poster,
          'age_rating': item.age,
          'director': item.director,
          'writers': item.writers,
          'actors': item.stars,
          'release': {
            'date': item.release instanceof Date ? item.release.toISOString() : null,
            'release_country': item.country,
          },
          'runtime': item.time,
          'genre': item.genres,
          'description': item.description,
        },
        'user_details': {
          'watchlist': item.isWatchlist,
          'already_watched': item.isWatched,
          'favorite': item.isFavorite,
          'watching_date': item.watchingDate instanceof Date ? item.watchingDate.toISOString() : null,
        },
      },
    );

    delete adaptedItem.title;
    delete adaptedItem.origin;
    delete adaptedItem.description;
    delete adaptedItem.poster;
    delete adaptedItem.rating;
    delete adaptedItem.release;
    delete adaptedItem.country;
    delete adaptedItem.genres;
    delete adaptedItem.time;
    delete adaptedItem.director;
    delete adaptedItem.stars;
    delete adaptedItem.age;
    delete adaptedItem.writers;
    delete adaptedItem.isWatchlist;
    delete adaptedItem.isWatched;
    delete adaptedItem.isFavorite;
    delete adaptedItem.watchingDate;

    return adaptedItem;
  }
}
