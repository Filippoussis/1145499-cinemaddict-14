import AbstractView from './abstract';

const createFilmsTitleLoadingTemplate = () => {
  return '<h2 class="films-list__title">Loading...</h2>';
};

export default class FilmsTitleLoading extends AbstractView {
  getTemplate() {
    return createFilmsTitleLoadingTemplate();
  }
}
