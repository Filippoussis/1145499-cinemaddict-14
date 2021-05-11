import AbstractView from './abstract';

const createFilmsStatsTemplate = () => {
  return (
    `<a href="#stats" class="main-navigation__additional">Stats
    </a>`
  );
};

export default class FilmsStats extends AbstractView {
  getTemplate() {
    return createFilmsStatsTemplate();
  }
}
