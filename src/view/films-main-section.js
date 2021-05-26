import AbstractView from './abstract';

const createFilmsMainSectionTemplate = () => {
  return (
    `<section class="films">
    </section>`
  );
};

export default class FilmsMainSection extends AbstractView {
  getTemplate() {
    return createFilmsMainSectionTemplate();
  }
}
