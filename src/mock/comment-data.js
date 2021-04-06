import {Comment, CommentDateRange} from './const-data';

import {getRandomElementFromArray, getRandomDate} from '../utils/random';

export const getCommentData = (id) => {
  return {
    id,
    text: getRandomElementFromArray(Comment.TEXT),
    emoji: getRandomElementFromArray(Comment.EMOJI),
    author: getRandomElementFromArray(Comment.AUTHOR),
    date: getRandomDate(CommentDateRange.YEAR.MIN, CommentDateRange.YEAR.MAX),
  };
};
