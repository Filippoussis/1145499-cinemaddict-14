// model
import FilmsModel from './model/films';
import CommentsModel from './model/comments';
import FilterModel from './model/filter';
import SortModel from './model/sort';

// presenter
import ScreenPresenter from './presenter/screen';

//mock
import {FILM_COUNT} from './mock/const-data';
import {getFilmData, comments} from './mock/film-data';

const body = document.querySelector('body');

const films = new Array(FILM_COUNT).fill(null).map((_, idx) => getFilmData(idx + 1));

const filmsModel = new FilmsModel();
filmsModel.setFilms(films);

const commentsModel = new CommentsModel();
commentsModel.setComments(comments);

const filterModel = new FilterModel();
const sortModel = new SortModel();

const screenPresenter = new ScreenPresenter(body, filmsModel, commentsModel, filterModel, sortModel);
screenPresenter.init();
