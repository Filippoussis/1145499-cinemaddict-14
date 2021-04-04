import {Comment, FilmIdRange, CommentDateRange} from './const-data';

import {getRandomInteger, getRandomElementFromArray, getRandomDate} from '../utils/common';

export const getCommentData = (id) => {
  return {
    id,
    text: getRandomElementFromArray(Comment.TEXT),
    emoji: getRandomElementFromArray(Comment.EMOJI),
    author: getRandomElementFromArray(Comment.AUTHOR),
    date: getRandomDate(CommentDateRange.YEAR.MIN, CommentDateRange.YEAR.MAX),
    filmId: getRandomInteger(FilmIdRange.MIN, FilmIdRange.MAX),
  };
};
