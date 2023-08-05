import View from './View';
import Model from './Model';
import Controller from './MainController';

export const model = new Model();
export const view = new View();

export default () => {
  new Controller(model, view);
};
