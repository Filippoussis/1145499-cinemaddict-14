const RATING_TITLES = [
  {rating: 21, title: 'Movie Buff'},
  {rating: 11, title: 'Fan'},
  {rating: 1, title: 'Novice'},
  {rating: 0, title: ''},
];

export const getRatingTitle = (value) => RATING_TITLES
  .find(({rating}) => rating <= value)
  .title || '';
