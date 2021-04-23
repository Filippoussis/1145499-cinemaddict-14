import {InsertPlace} from '../const';
import Abstract from '../view/abstract';

export const render = (container, child, place = InsertPlace.BEFORE_END) => {

  if (container instanceof Abstract) {
    container = container.getElement();
  }

  if (child instanceof Abstract) {
    child = child.getElement();
  }

  switch (place) {
    case InsertPlace.BEFORE_END:
      container.append(child);
      break;
    case InsertPlace.AFTER_END:
      container.after(child);
      break;
    case InsertPlace.BEFORE_BEGIN:
      container.before(child);
      break;
    default:
      throw new Error(`Unknown render position: ${place}. Possible values: ${Object.values(InsertPlace).join(', ')}`);
  }
};

export const createElement = (template) => {
  const wrapper = document.createElement('div');
  wrapper.innerHTML = template;

  return wrapper.firstChild;
};

export const remove = (component) => {
  if (!(component instanceof Abstract)) {
    throw new Error('Can remove only components');
  }

  component.getElement().remove();
  component.removeElement();
};

export const replace = (newChild, oldChild) => {

  if (oldChild === null || newChild === null) {
    throw new Error('Can\'t replace unexisting elements');
  }

  if (oldChild instanceof Abstract) {
    oldChild = oldChild.getElement();
  }

  if (newChild instanceof Abstract) {
    newChild = newChild.getElement();
  }

  const parent = oldChild.parentElement;

  if (parent === null) {
    throw new Error('Missing parent for elements');
  }

  parent.replaceChild(newChild, oldChild);
};
