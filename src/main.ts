import View from './View';
import Model from './Model';
import Controller from './MainController';
import 'toastify-js/src/toastify.css';

const model = new Model();
const view = new View();
export const controller = new Controller(model, view);
controller.initialize();
