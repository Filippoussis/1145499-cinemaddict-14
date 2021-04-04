import {FilmCount, InsertPlace} from './const';
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
import {Count} from './mock/const-data';
import {getFilmData} from './mock/film-data';
import {getCommentData} from './mock/comment-data';

let filmId = 0;
const films = new Array(Count.FILM).fill().map(() => {
  filmId++;
  return getFilmData(filmId);
});

let commentId = 0;
const comments = new Array(Count.COMMENT).fill().map(() => {
  commentId++;
  return getCommentData(commentId);
});

const getCommentCount = (comments, film) => {
  return comments.filter((comment) => comment.filmId === film.id).length;
};

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
  const commentCount = getCommentCount(comments, films[i]);
  renderViewComponent(allFilmsList, getFilmCardTemplate(films[i], commentCount));
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
        const commentCount = getCommentCount(comments, film);
        return renderViewComponent(allFilmsList, getFilmCardTemplate(film, commentCount));
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

  const CLASS_NAME_TARGETS = [
    'film-card__poster',
    'film-card__description',
    'film-card__comments',
  ];

  if (CLASS_NAME_TARGETS.includes(evt.target.className)) {

    const card = evt.target.closest('.film-card');
    const cardId = card.dataset.id;
    const selectedFilm = films.find((film) => film.id == cardId);
    const commentsFilm = comments.filter((comment) => comment.filmId === selectedFilm.id);

    renderViewComponent(footer, getFilmDetailsTemplate(selectedFilm, commentsFilm), InsertPlace.AFTER_END);

    const filmDetails = document.querySelector('.film-details');

    const handlePressEsc = (evt) => {
      if (evt.key === 'Escape') {
        removeFilmDetails();
      }
    };

    document.addEventListener('keydown', handlePressEsc);

    const removeFilmDetails = () => {
      filmDetails.remove();
      document.removeEventListener('keydown', handlePressEsc);
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
