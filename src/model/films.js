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
      throw new Error('Can\'t update unexisting item');
    }

    this._items = [
      ...this._items.slice(0, index),
      update,
      ...this._items.slice(index + 1),
    ];

    this._notify(updateType, update);
  }

  static adaptToClient(item) {
    const info = item.film_info;
    const user = item.user_details;

    const adaptedItem = Object.assign(
      {},
      {
        id: item.id,
        comments: item.comments,
        title: info.title,
        origin: info.alternative_title,
        description: info.description,
        poster: info.poster,
        rating: info.total_rating,
        release: info.release.date !== null
          ? new Date(info.release.date)
          : info.release.date,
        country: info.release.release_country,
        genres: info.genre,
        time: info.runtime,
        director: info.director,
        stars: info.actors,
        writers: info.writers,
        age: info.age_rating,
        watchlist: user.watchlist,
        watched: user.already_watched,
        favorite: user.favorite,
        watchingDate: user.watching_date !== null
          ? new Date(user.watching_date)
          : user.watching_date,
      },
    );

    return adaptedItem;
  }

  static adaptToServer(item) {
    const adaptedItem = Object.assign(
      {},
      {
        'id': item.id,
        'comments': item.comments,
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
          'watchlist': item.watchlist,
          'already_watched': item.watched,
          'favorite': item.favorite,
          'watching_date': item.watchingDate instanceof Date ? item.watchingDate.toISOString() : null,
        },
      },
    );

    return adaptedItem;
  }
}
