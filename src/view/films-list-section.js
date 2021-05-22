import AbstractView from './abstract';

const createFilmsListSectionTemplate = () => {
  return (
    `<section class="films-list">
    </section>`
  );
};

export default class FilmsListSection extends AbstractView {
  getTemplate() {
    return createFilmsListSectionTemplate();
  }
}
