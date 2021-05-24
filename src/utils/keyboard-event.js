// const
import {KeyboardName} from '../const';

export const isEscapeEvent = (evt) => evt.key === KeyboardName.ESCAPE;
export const isControlEnterEvent = (evt) => evt.key === KeyboardName.ENTER && (evt.ctrlKey || evt.metaKey);

