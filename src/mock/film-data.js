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
  TimeRange,
  AgeRange,
  StarsRange,
  WritersRange
} from './const-data';

import {
  getRandomInteger,
  getRandomFloat,
  getRandomElementFromArray,
  getArrayRandomLength,
  getRandomDate
} from '../utils/common';

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

const getRandomTime = (minHours, maxHours, minMinutes, maxMinutes) => {
  return `${getRandomInteger(minHours, maxHours)}h ${getRandomInteger(minMinutes, maxMinutes)}m`;
};

export const getFilmData = (id) => {

  const title = getRandomElementFromArray(TITLES);

  return {
    id,
    title,
    origin: title,
    description: getRandomDescription(DESCRIPTION),
    poster: getRandomElementFromArray(POSTERS),
    rating: getRandomFloat(RatingRange.MIN, RatingRange.MAX),
    release: getRandomDate(ReleaseDateRange.YEAR.MIN, ReleaseDateRange.YEAR.MAX),
    genre: getArrayRandomLength(GENRES, GenresRange.MIN, GenresRange.MAX),
    time: getRandomTime(TimeRange.HOUR.MIN, TimeRange.HOUR.MAX, TimeRange.MINUTES.MIN, TimeRange.MINUTES.MAX),
    director: getRandomElementFromArray(DIRECTORS),
    stars: getArrayRandomLength(STARS, StarsRange.MIN, StarsRange.MAX).join(', '),
    writers: getArrayRandomLength(WRITERS, WritersRange.MIN, WritersRange.MAX).join(', '),
    country: getRandomElementFromArray(COUNTRIES),
    age: getRandomInteger(AgeRange.MIN, AgeRange.MAX),
    isWatchlist: Boolean(getRandomInteger()),
    isWatched: Boolean(getRandomInteger()),
    isFavorite: Boolean(getRandomInteger()),
  };
};
