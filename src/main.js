import {FilmCount, InsertPlace} from './const';
import {renderViewComponent} from './utils';

import {getProfileTemplate} from './view/profile';
import {getNavigationTemplate} from './view/navigation';
import {getSortTemplate} from './view/sort';
import {getMainContentTemplate} from './view/main-content';
import {getAllFilmsTemplate} from './view/all-films';
import {getFilmCardTemplate} from './view/film-card';
import {getShowMoreButtonTemplate} from './view/show-more-button';
import {getTopRatedFilmsTemplate} from './view/top-rated-films';
import {getMostCommentedFilmsTemplate} from './view/most-commented-films';
import {getStatisticsTemplate} from './view/statistics';

const header = document.querySelector('.header');
const main = document.querySelector('.main');
const footer = document.querySelector('.footer');

renderViewComponent(header, getProfileTemplate());

renderViewComponent(main, getNavigationTemplate());
renderViewComponent(main, getSortTemplate());

renderViewComponent(main, getMainContentTemplate());
const mainContent = document.querySelector('.films');

renderViewComponent(mainContent, getAllFilmsTemplate());
const allFilmsSection = mainContent.querySelector('#all-films');
const allFilmsList = allFilmsSection.querySelector('.films-list__container');

for (let i = 0; i < FilmCount.STEP; i++) {
  renderViewComponent(allFilmsList, getFilmCardTemplate());
}

renderViewComponent(allFilmsList, getShowMoreButtonTemplate(), InsertPlace.AFTER_END);

renderViewComponent(mainContent, getTopRatedFilmsTemplate());
const topRatedFilmsSection = mainContent.querySelector('#top-rated-films');
const topRatedFilmsList = topRatedFilmsSection.querySelector('.films-list__container');

for (let i = 0; i < FilmCount.EXTRA; i++) {
  renderViewComponent(topRatedFilmsList, getFilmCardTemplate());
}

renderViewComponent(mainContent, getMostCommentedFilmsTemplate());
const mostCommentedFilmsSection = mainContent.querySelector('#most-commented-films');
const mostCommentedFilmsList = mostCommentedFilmsSection.querySelector('.films-list__container');

for (let i = 0; i < FilmCount.EXTRA; i++) {
  renderViewComponent(mostCommentedFilmsList, getFilmCardTemplate());
}

renderViewComponent(footer, getStatisticsTemplate());
