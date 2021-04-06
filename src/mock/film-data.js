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
  ListCommentIdRange,
  CommentIdRange
} from './const-data';

import {
  getRandomInteger,
  getRandomFloat,
  getRandomElementFromArray,
  getArrayRandomLength,
  getRandomDate
} from '../utils/random';

const MINUTES_IN_HOUR = 60;

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

const getListIdComments = () => {
  const randomLengthListCommentId = getRandomInteger(ListCommentIdRange.MIN, ListCommentIdRange.MAX);
  return new Array(randomLengthListCommentId).fill(null).map(() => getRandomInteger(CommentIdRange.MIN, CommentIdRange.MAX));
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
    comments: getListIdComments(),
  };
};
