import {getCommentData} from './comment-data';

import {
  TITLES,
  DESCRIPTION,
  POSTERS,
  GENRES,
  COUNTRIES,
  DIRECTORS,
  STARS,
  WRITERS,
  GenresRange,
  RatingRange,
  ReleaseDateRange,
  TimeMinutesRange,
  AgeRange,
  StarsRange,
  WritersRange,
  ListCommentRange
} from './const-data';

import {
  getRandomInteger,
  getRandomFloat,
  getRandomElementFromArray,
  getArrayRandomLength,
  getRandomDate
} from '../utils/random';

const MINUTES_IN_HOUR = 60;

export const comments = [];
const commentId = {id: 0};

// получение описания к фильму из неповторяющихся предложений
const getRandomDescription = (descriptionString) => {
  const descriptionArray = descriptionString.split('. ');
  const randomNumberSentences = getRandomInteger(1, descriptionArray.length);
  const descriptionArrayCopy = descriptionArray.slice();
  let randomDescription = '';

  for (let i = 0; i < randomNumberSentences; i++) {
    const randomIndex = getRandomInteger(0, descriptionArrayCopy.length - 1);
    randomDescription = randomDescription + descriptionArrayCopy[randomIndex] + '. ';
    descriptionArrayCopy.splice(randomIndex, 1);
  }

  return randomDescription;
};

const getRandomTime = (minMinutes, maxMinutes) => {
  const totalMinutes = getRandomInteger(minMinutes, maxMinutes);
  return `${Math.trunc(totalMinutes/MINUTES_IN_HOUR)}h ${totalMinutes%MINUTES_IN_HOUR}m`;
};

// каждый фильм имеет от 0 до 5 комментариев с уникальными идентификаторами во всем списке фильмов
// в предыдущей реализации комментарии с одинаковыми идентификаторами могли появлятся в разных фильмах
// что могло привести к неконсистентности при добавлении/удалении комментариев
export const getListIdComments = (commentId, comments) => {
  const listIdComments = [];
  const randomFilmCommentsCount = getRandomInteger(ListCommentRange.MIN, ListCommentRange.MAX);

  const listComments = new Array(randomFilmCommentsCount).fill(null).map(() => {
    const id = ++commentId.id;
    listIdComments.push(id);

    return getCommentData(id);
  });

  comments.push(...listComments);

  return listIdComments;
};

export const getFilmData = (id) => {

  const title = getRandomElementFromArray(TITLES);

  return {
    id,
    title,
    origin: title,
    description: getRandomDescription(DESCRIPTION),
    poster: getRandomElementFromArray(POSTERS),
    rating: Number(getRandomFloat(RatingRange.MIN, RatingRange.MAX)),
    release: getRandomDate(ReleaseDateRange.YEAR.MIN, ReleaseDateRange.YEAR.MAX),
    genres: getArrayRandomLength(GENRES, GenresRange.MIN, GenresRange.MAX),
    time: getRandomTime(TimeMinutesRange.MIN, TimeMinutesRange.MAX),
    director: getRandomElementFromArray(DIRECTORS),
    stars: getArrayRandomLength(STARS, StarsRange.MIN, StarsRange.MAX),
    writers: getArrayRandomLength(WRITERS, WritersRange.MIN, WritersRange.MAX),
    country: getRandomElementFromArray(COUNTRIES),
    age: getRandomInteger(AgeRange.MIN, AgeRange.MAX),
    isWatchlist: Boolean(getRandomInteger()),
    isWatched: Boolean(getRandomInteger()),
    isFavorite: Boolean(getRandomInteger()),
    comments: getListIdComments(commentId, comments),
  };
};
