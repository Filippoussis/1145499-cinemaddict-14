import {InsertPlace} from '../const';

export const renderViewComponent = (container, component, place = InsertPlace.BEFORE_END) => {
  return container.insertAdjacentHTML(place, component);
};
