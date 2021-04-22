// presenter
import ScreenPresenter from './presenter/screen';

//mock
import {Count as DataCount} from './mock/const-data';
import {getFilmData} from './mock/film-data';
import {getCommentData} from './mock/comment-data';

const films = new Array(DataCount.FILM).fill(null).map((_, idx) => getFilmData(idx + 1));
const comments = new Array(DataCount.COMMENT).fill(null).map((_, idx) => getCommentData(idx + 1));

const body = document.querySelector('body');

const screenPresenter = new ScreenPresenter(body);
screenPresenter.init(films, comments);
