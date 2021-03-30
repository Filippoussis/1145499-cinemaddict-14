import {NumberFilms, InsertPlace} from './const';
import {renderViewComponent} from './utils';

import {profileComponent} from './view/profile';
import {navigationComponent} from './view/navigation';
import {sortComponent} from './view/sort';
import {mainContentComponent} from './view/main-content';
import {allFilmsComponent} from './view/all-films';
import {filmCardComponent} from './view/film-card';
import {showMoreButtonComponent} from './view/show-more-button';
import {topRatedFilmsComponent} from './view/top-rated-films';
import {mostCommentedFilmsComponent} from './view/most-commented-films';
import {statisticsComponent} from './view/statistics';

const header = document.querySelector('.header');
const main = document.querySelector('.main');
const footer = document.querySelector('.footer');

renderViewComponent(header, profileComponent());

renderViewComponent(main, navigationComponent());
renderViewComponent(main, sortComponent());

renderViewComponent(main, mainContentComponent());
const mainContent = document.querySelector('.films');

renderViewComponent(mainContent, allFilmsComponent());
const allFilmsSection = mainContent.querySelector('#all-films');
const allFilmsList = allFilmsSection.querySelector('.films-list__container');

for (let i = 0; i < NumberFilms.STEP; i++) {
  renderViewComponent(allFilmsList, filmCardComponent());
}

renderViewComponent(allFilmsList, showMoreButtonComponent(), InsertPlace.AFTEREND);

renderViewComponent(mainContent, topRatedFilmsComponent());
const topRatedFilmsSection = mainContent.querySelector('#top-rated-films');
const topRatedFilmsList = topRatedFilmsSection.querySelector('.films-list__container');

for (let i = 0; i < NumberFilms.EXTRA; i++) {
  renderViewComponent(topRatedFilmsList, filmCardComponent());
}

renderViewComponent(mainContent, mostCommentedFilmsComponent());
const mostCommentedFilmsSection = mainContent.querySelector('#most-commented-films');
const mostCommentedFilmsList = mostCommentedFilmsSection.querySelector('.films-list__container');

for (let i = 0; i < NumberFilms.EXTRA; i++) {
  renderViewComponent(mostCommentedFilmsList, filmCardComponent());
}

renderViewComponent(footer, statisticsComponent());
