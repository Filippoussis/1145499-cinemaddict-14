// const
import {UpdateType} from './const';

// utils
import {showDisconnectMessage} from './utils/toast';

// model
import FilmsModel from './model/films';
import CommentsModel from './model/comments';
import FilterModel from './model/filter';
import SortModel from './model/sort';

// presenter
import ScreenPresenter from './presenter/screen';

// api
import Api from './api/api';
import Store from './api/store';
import Provider from './api/provider';

const AUTHORIZATION = 'Basic androsphilippos';
const END_POINT = 'https://14.ecmascript.pages.academy/cinemaddict/';

const STORE_PREFIX = 'cinemaddict-localstorage';
const STORE_VER = 'v14';
const STORE_NAME = `${STORE_PREFIX}-${STORE_VER}`;

const body = document.querySelector('body');

const api = new Api(END_POINT, AUTHORIZATION);

const store = new Store(STORE_NAME, window.localStorage);
const apiWithProvider = new Provider(api, store);

const filmsModel = new FilmsModel();
const commentsModel = new CommentsModel();
const filterModel = new FilterModel();
const sortModel = new SortModel();

const screenPresenter = new ScreenPresenter(body, filmsModel, commentsModel, filterModel, sortModel, apiWithProvider);
screenPresenter.init();

apiWithProvider.getFilms()
  .then((films) => {
    filmsModel.setItems(UpdateType.INIT, films);
  })
  .catch(() => {
    filmsModel.setItems(UpdateType.INIT, []);
  });

window.addEventListener('load', () => {
  navigator.serviceWorker.register('/sw.js');
});

window.addEventListener('online', () => {
  document.title = document.title.replace(' [offline]', '');
  apiWithProvider.sync();
});

window.addEventListener('offline', () => {
  document.title += ' [offline]';
  showDisconnectMessage('Check your internet connection...');
});
