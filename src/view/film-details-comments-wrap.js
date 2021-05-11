import AbstractView from './abstract';

const createFilmDetailsCommentsWrapTemplate = () => {
  return (
    `<section class="film-details__comments-wrap">
    </section>`
  );
};

export default class FilmDetailsCommentsWrap extends AbstractView {
  getTemplate() {
    return createFilmDetailsCommentsWrapTemplate();
  }
}
