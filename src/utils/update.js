export const updateFilmProperty = (film, prop) => {
  return (
    Object.assign(
      {},
      film,
      {
        [prop]: !film[prop],
      },
    )
  );
};
