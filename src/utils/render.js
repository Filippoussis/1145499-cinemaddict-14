import {InsertPlace} from '../const';

export const render = (container, element, place = InsertPlace.BEFORE_END) => {
  switch (place) {
    case InsertPlace.BEFORE_END:
      container.append(element);
      break;
    case InsertPlace.AFTER_END:
      container.after(element);
      break;
    default: throw new Error('place должен быть InsertPlace.BEFORE_END или InsertPlace.AFTER_END');
  }
};

export const createElement = (template) => {
  const wrapper = document.createElement('div');
  wrapper.innerHTML = template;

  return wrapper.firstChild;
};
