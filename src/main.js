import {InsertPlace} from './const';
import {render} from './utils/render';
import {getProfileRank} from './utils/rating';

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

// import {getTopRatedFilmsTemplate} from './view/top-rated-films';
// import {getMostCommentedFilmsTemplate} from './view/most-commented-films';

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

const filterResult = films.reduce((sum, {isWatchlist, isWatched, isFavorite}) => {
  return ({
    watchlistCount: sum.watchlistCount + isWatchlist,
    watchedCount: sum.watchedCount + isWatched,
    favoriteCount: sum.favoriteCount + isFavorite,
  });
}, {watchlistCount: 0, watchedCount: 0, favoriteCount: 0});

const filmsTotalCount = films.length;
const watchedFilmsCount = filterResult.watchedCount;

const rank = getProfileRank(watchedFilmsCount);

const header = document.querySelector('.header');
const main = document.querySelector('.main');
const footer = document.querySelector('.footer');

render(header, new UserProfileView(rank).getElement());
render(main, new FilmsFilterView(filterResult).getElement());
render(main, new FilmsSortView().getElement());

const mainContentView = new MainContentView();
render(main, mainContentView.getElement());

render(footer, new FilmsTotalView(filmsTotalCount).getElement());

const renderFilmCard = (container, film) => {
  return render(container.getElement(), new FilmCardView(film).getElement());
};

const renderFilmsList = (container) => {
  const allFilmsView = new AllFilmsView();
  render(container.getElement(), allFilmsView.getElement());

  const filmsContainerView = new FilmsContainerView();
  render(allFilmsView.getElement(), filmsContainerView.getElement());

  for (let i = 0; i < Math.min(films.length, FilmCount.STEP); i++) {
    renderFilmCard(filmsContainerView, films[i]);
  }

  if (films.length > FilmCount.STEP) {
    const showMoreButtonView = new ShowMoreButtonView();
    let currentFilmCount = FilmCount.STEP;

    render(filmsContainerView.getElement(), showMoreButtonView.getElement(), InsertPlace.AFTER_END);

    showMoreButtonView.getElement().addEventListener('click', (evt) => {
      evt.preventDefault();
      films
        .slice(currentFilmCount, currentFilmCount + FilmCount.STEP)
        .forEach((film) => {
          return renderFilmCard(filmsContainerView, film);
        });

      currentFilmCount += FilmCount.STEP;

      if (currentFilmCount >= films.length) {
        showMoreButtonView.getElement().remove();
        showMoreButtonView.removeElement();
      }
    });
  }
};

mainContentView.getElement().addEventListener('click', (evt) => {
  evt.preventDefault();

  if (OPENING_POPUP_CLASS_NAMES.includes(evt.target.className)) {

    const card = evt.target.closest('.film-card');
    const cardId = card.dataset.id;
    const selectedFilm = films.find((film) => film.id == cardId);
    const filmComments = selectedFilm.comments.map((commentId) => commentsData.find((item) => item.id === commentId));

    const filmDetailsView = new FilmDetailsView(selectedFilm, filmComments);

    render(footer, filmDetailsView.getElement(), InsertPlace.AFTER_END);
    document.body.classList.add(NO_SCROLL_CLASS_NAME);

    const buttonEscKeydownHandler = (evt) => {
      if (evt.key === 'Escape') {
        removeFilmDetails();
      }
    };

    document.addEventListener('keydown', buttonEscKeydownHandler);

    const removeFilmDetails = () => {
      filmDetailsView.getElement().remove();
      filmDetailsView.removeElement();
      document.removeEventListener('keydown', buttonEscKeydownHandler);
      document.body.classList.remove(NO_SCROLL_CLASS_NAME);
    };

    const buttonClose = document.querySelector('.film-details__close-btn');
    buttonClose.addEventListener('click', (evt) => {
      evt.preventDefault();
      removeFilmDetails();
    });
  }
});

renderFilmsList(mainContentView);

// чуть позднее :)
// renderViewComponent(mainContent, getTopRatedFilmsTemplate());
// const topRatedFilmsSection = mainContent.querySelector('#top-rated-films');
// const topRatedFilmsList = topRatedFilmsSection.querySelector('.films-list__container');

// for (let i = 0; i < FilmCount.EXTRA; i++) {
//   renderViewComponent(topRatedFilmsList, getFilmCardTemplate());
// }

// renderViewComponent(mainContent, getMostCommentedFilmsTemplate());
// const mostCommentedFilmsSection = mainContent.querySelector('#most-commented-films');
// const mostCommentedFilmsList = mostCommentedFilmsSection.querySelector('.films-list__container');

// for (let i = 0; i < FilmCount.EXTRA; i++) {
//   renderViewComponent(mostCommentedFilmsList, getFilmCardTemplate());
// }
