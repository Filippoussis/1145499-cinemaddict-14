import AbstractView from './abstract';

const createPageMainTemplate = () => {
  return (
    `<main class="main">
    </main>`
  );
};

export default class PageMain extends AbstractView {
  getTemplate() {
    return createPageMainTemplate();
  }
}
