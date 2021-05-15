// const
import {UpdateType} from './const';

// model
import FilmsModel from './model/films';
import CommentsModel from './model/comments';
import FilterModel from './model/filter';
import SortModel from './model/sort';

// presenter
import ScreenPresenter from './presenter/screen';

// api
import Api from './api.js';

const AUTHORIZATION = 'Basic androsphilippos';
const END_POINT = 'https://14.ecmascript.pages.academy/cinemaddict/';

const body = document.querySelector('body');

const api = new Api(END_POINT, AUTHORIZATION);

const filmsModel = new FilmsModel();
const commentsModel = new CommentsModel();
const filterModel = new FilterModel();
const sortModel = new SortModel();

const screenPresenter = new ScreenPresenter(body, filmsModel, commentsModel, filterModel, sortModel, api);
screenPresenter.init();

api.getFilms()
  .then((films) => {
    filmsModel.setItems(UpdateType.INIT, films);
  })
  .catch(() => {
    filmsModel.setItems(UpdateType.INIT, []);
  });
