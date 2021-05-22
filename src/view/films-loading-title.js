import AbstractView from './abstract';

const createFilmsLoadingTitleTemplate = () => {
  return '<h2 class="films-list__title">Loading...</h2>';
};

export default class FilmsLoadingTitle extends AbstractView {
  getTemplate() {
    return createFilmsLoadingTitleTemplate();
  }
}
