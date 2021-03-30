import {InsertPlace} from './const';

export const renderViewComponent = (container, component, place = InsertPlace.BEFOREEND) => {
  return container.insertAdjacentHTML(place, component);
};
