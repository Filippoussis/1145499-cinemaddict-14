import AbstractView from './abstract';

const createPageHeaderTemplate = () => {
  return (
    `<header class="header">
      <h1 class="header__logo logo">Cinemaddict</h1>
    </header>`
  );
};

export default class PageHeader extends AbstractView {
  getTemplate() {
    return createPageHeaderTemplate();
  }
}
