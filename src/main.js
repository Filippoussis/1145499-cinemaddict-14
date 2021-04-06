import {FilmCount, InsertPlace, OPENING_POPUP_CLASS_NAMES} from './const';
import {renderViewComponent} from './utils/render';

import {getProfileTemplate} from './view/profile';
import {getFilterTemplate} from './view/filter';
import {getSortTemplate} from './view/sort';
import {getMainContentTemplate} from './view/main-content';
import {getAllFilmsTemplate} from './view/all-films';
import {getFilmCardTemplate} from './view/film-card';
import {getFilmDetailsTemplate} from './view/film-details';
import {getShowMoreButtonTemplate} from './view/show-more-button';
import {getFooterStatisticsTemplate} from './view/footer-statistics';

// import {getTopRatedFilmsTemplate} from './view/top-rated-films';
// import {getMostCommentedFilmsTemplate} from './view/most-commented-films';

// mocks
import {Count as DataCount} from './mock/const-data';
import {getFilmData} from './mock/film-data';
import {getCommentData} from './mock/comment-data';

const films = new Array(DataCount.FILM).fill(null).map((_, idx) => getFilmData(idx + 1));
const commentsData = new Array(DataCount.COMMENT).fill(null).map((_, idx) => getCommentData(idx + 1));

const header = document.querySelector('.header');
const main = document.querySelector('.main');
const footer = document.querySelector('.footer');

renderViewComponent(header, getProfileTemplate(films));

renderViewComponent(main, getFilterTemplate(films));
renderViewComponent(main, getSortTemplate());

renderViewComponent(main, getMainContentTemplate());
const mainContent = document.querySelector('.films');

renderViewComponent(mainContent, getAllFilmsTemplate());
const allFilmsSection = mainContent.querySelector('#all-films');
const allFilmsList = allFilmsSection.querySelector('.films-list__container');

for (let i = 0; i < Math.min(films.length, FilmCount.STEP); i++) {
  renderViewComponent(allFilmsList, getFilmCardTemplate(films[i]));
}

if (films.length > FilmCount.STEP) {
  let currentFilmCount = FilmCount.STEP;

  renderViewComponent(allFilmsList, getShowMoreButtonTemplate(), InsertPlace.AFTER_END);

  const buttonShowMore = mainContent.querySelector('.films-list__show-more');
  buttonShowMore.addEventListener('click', (evt) => {
    evt.preventDefault();
    films
      .slice(currentFilmCount, currentFilmCount + FilmCount.STEP)
      .forEach((film) => {
        return renderViewComponent(allFilmsList, getFilmCardTemplate(film));
      });

    currentFilmCount += FilmCount.STEP;

    if (currentFilmCount >= films.length) {
      buttonShowMore.remove();
    }
  });
}

renderViewComponent(footer, getFooterStatisticsTemplate(films));

mainContent.addEventListener('click', (evt) => {
  evt.preventDefault();

  if (OPENING_POPUP_CLASS_NAMES.includes(evt.target.className)) {

    const card = evt.target.closest('.film-card');
    const cardId = card.dataset.id;
    const selectedFilm = films.find((film) => film.id == cardId);
    const filmComments = selectedFilm.comments.map((commentId) => commentsData.find((item) => item.id === commentId));

    renderViewComponent(footer, getFilmDetailsTemplate(selectedFilm, filmComments), InsertPlace.AFTER_END);

    const filmDetails = document.querySelector('.film-details');

    const buttonEscKeydownHandler = (evt) => {
      if (evt.key === 'Escape') {
        removeFilmDetails();
      }
    };

    document.addEventListener('keydown', buttonEscKeydownHandler);

    const removeFilmDetails = () => {
      filmDetails.remove();
      document.removeEventListener('keydown', buttonEscKeydownHandler);
    };

    const buttonClose = filmDetails.querySelector('.film-details__close-btn');
    buttonClose.addEventListener('click', (evt) => {
      evt.preventDefault();
      removeFilmDetails();
    });
  }
});

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
