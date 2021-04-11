const profileRatings = [
  {
    title: 'Novice',
    range: {
      min: 1,
      max: 10,
    },
  }, {
    title: 'Fan',
    range: {
      min: 11,
      max: 20,
    },
  }, {
    title: 'Movie Buff',
    range: {
      min: 21,
      max: Number.MAX_SAFE_INTEGER,
    },
  },
];

export const getProfileRank = (value) => {
  return value !== 0 ? (profileRatings.find((item) => value >= item.range.min && value <= item.range.max)).title : '';
};
