import View from './View';
import Model from './Model';
import Controller from './MainController';

const model = new Model();
const view = new View();
export const controller = new Controller(model, view);
controller.initialize();
