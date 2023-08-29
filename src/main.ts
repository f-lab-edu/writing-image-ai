import MainView from './MainView';
import MainModel from './MainModel';
import MainController from './MainController';
import 'toastify-js/src/toastify.css';
import KoGPTModel from './KoGPTModel';
import KoGPTView from './KoGPTView';
import KoGPTController from './KoGPTController';

const model = new MainModel();
const view = new MainView();
export const controller = new MainController(model, view);
controller.initialize();

const kogptModel = new KoGPTModel();
const kogptView = new KoGPTView();
export const kogptController = new KoGPTController(kogptModel, kogptView);
kogptController.initialize();
