import AbstractView from './abstract';

const createPageFooterTemplate = () => {
  return (
    `<footer class="footer">
      <section class="footer__logo logo logo--smaller">Cinemaddict</section>
    </footer>`
  );
};

export default class PageFooter extends AbstractView {
  getTemplate() {
    return createPageFooterTemplate();
  }
}
