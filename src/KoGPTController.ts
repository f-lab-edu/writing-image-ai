import type KoGPTModel from './KoGPTModel';
import type KoGPTView from './KoGPTView';

class KoGPTController {
  #model: KoGPTModel;
  #view: KoGPTView;

  constructor(model: KoGPTModel, view: KoGPTView) {
    this.#model = model;
    this.#view = view;

    this.#model.registerOpenObserver(() => {
      this.render();
    });
  }

  render() {
    this.#view.render();
  }

  toggle() {
    this.#model.toggle();
  }

  getState() {
    return this.#model.getState();
  }

  initialize() {
    this.render();
  }
}

export default KoGPTController;
