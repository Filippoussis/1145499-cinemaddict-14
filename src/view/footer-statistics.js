export const getFooterStatisticsTemplate = (films) => {

  const filmCount = films.length;

  return (
    `<section class="footer__statistics">
      <p>${filmCount} movies inside</p>
    </section>`
  );
};
