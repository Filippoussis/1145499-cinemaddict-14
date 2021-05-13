import AbstractView from './abstract';

const createMainNavigationTemplate = () => {
  return (
    `<nav class="main-navigation">
    </nav>`
  );
};

export default class MainNavigation extends AbstractView {
  getTemplate() {
    return createMainNavigationTemplate();
  }
}
