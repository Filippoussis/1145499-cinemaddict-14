export const getFooterStatisticsTemplate = (films) => {

  const filmsNumber = films.length;

  return (
    `<section class="footer__statistics">
      <p>${filmsNumber} movies inside</p>
    </section>`
  );
};
