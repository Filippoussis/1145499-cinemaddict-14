// const
import {InsertPlace} from './const';

// utils
import {render, remove} from './utils/render';
import {getRatingTitle} from './utils/rating';
import {getFilterStats} from './utils/filter';

// view
import PageHeaderView from './view/page-header';
import PageMainView from './view/page-main';
import PageFooterView from './view/page-footer';
import UserProfileView from './view/user-profile';
import FilmsFilterView from './view/films-filter';
import FilmsSortView from './view/films-sort';
import MainContentView from './view/main-content';
import AllFilmsView from './view/all-films';
import FilmsContainerView from './view/films-container';
import FilmCardView from './view/film-card';
import FilmDetailsView from './view/film-details';
import ShowMoreButtonView from './view/show-more-button';
import FilmsTotalView from './view/films-total';
import NoFilmsView from './view/no-films';

// mocks
import {Count as DataCount} from './mock/const-data';
import {getFilmData} from './mock/film-data';
import {getCommentData} from './mock/comment-data';

const FilmCount = {
  STEP: 5,
  EXTRA: 2,
};

const OPENING_POPUP_CLASS_NAMES = [
  'film-card__poster',
  'film-card__description',
  'film-card__comments',
];

const NO_SCROLL_CLASS_NAME = 'hide-overflow';

const films = new Array(DataCount.FILM).fill(null).map((_, idx) => getFilmData(idx + 1));
const commentsData = new Array(DataCount.COMMENT).fill(null).map((_, idx) => getCommentData(idx + 1));

const filterStats = getFilterStats(films);

const filmsTotalCount = films.length;
const watchedFilmsCount = filterStats.watchedCount;

const rank = getRatingTitle(watchedFilmsCount);

const body = document.querySelector('body');

const headerView = new PageHeaderView();
const mainView = new PageMainView();
const footerView = new PageFooterView();

render(body, headerView);
render(body, mainView);
render(body, footerView);

render(headerView, new UserProfileView(rank));
render(mainView, new FilmsFilterView(filterStats));
render(mainView, new FilmsSortView());

const mainContentView = new MainContentView();
render(mainView, mainContentView);

render(footerView, new FilmsTotalView(filmsTotalCount));

//film-card
const renderFilmCard = (container, film) => {
  return render(container, new FilmCardView(film));
};

const renderFilmsList = (container, films) => {
  const allFilmsView = new AllFilmsView();
  render(container, allFilmsView);

  const filmsContainerView = new FilmsContainerView();
  render(allFilmsView, filmsContainerView);

  if (films.length === 0) {
    render(container, new NoFilmsView());
    return;
  }

  films
    .slice(0, Math.min(films.length, FilmCount.STEP))
    .forEach((film) => renderFilmCard(filmsContainerView, film));

  if (films.length > FilmCount.STEP) {
    const showMoreButtonView = new ShowMoreButtonView();
    let currentFilmCount = FilmCount.STEP;

    render(filmsContainerView, showMoreButtonView, InsertPlace.AFTER_END);

    showMoreButtonView.setClickHandler(() => {
      films
        .slice(currentFilmCount, currentFilmCount + FilmCount.STEP)
        .forEach((film) => {
          return renderFilmCard(filmsContainerView, film);
        });

      currentFilmCount += FilmCount.STEP;

      if (currentFilmCount >= films.length) {
        remove(showMoreButtonView);
      }
    });
  }
};

// film-details
mainContentView.setClickHandler((evt) => {
  if (OPENING_POPUP_CLASS_NAMES.includes(evt.target.className)) {

    const card = evt.target.closest('.film-card');
    const cardId = card.dataset.id;
    const selectedFilm = films.find((film) => film.id == cardId);
    const filmComments = selectedFilm.comments.map((commentId) => commentsData.find((item) => item.id === commentId));

    const filmDetailsView = new FilmDetailsView(selectedFilm, filmComments);

    render(footerView, filmDetailsView, InsertPlace.AFTER_END);
    document.body.classList.add(NO_SCROLL_CLASS_NAME);

    const buttonEscKeydownHandler = (evt) => {
      if (evt.key === 'Escape') {
        removeFilmDetails();
      }
    };

    document.addEventListener('keydown', buttonEscKeydownHandler);

    const removeFilmDetails = () => {
      remove(filmDetailsView);
      document.removeEventListener('keydown', buttonEscKeydownHandler);
      document.body.classList.remove(NO_SCROLL_CLASS_NAME);
    };

    filmDetailsView.setClickHandler(() => {
      removeFilmDetails();
    });
  }
});

renderFilmsList(mainContentView, films);
