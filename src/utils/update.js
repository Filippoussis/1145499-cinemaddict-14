export const updateUserDetails = (film, prop) => {
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
