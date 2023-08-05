import View from './View';
import Model from './Model';
import Controller from './MainController';

const model = new Model();
const view = new View();
const controller = new Controller(model, view);

export default controller;
