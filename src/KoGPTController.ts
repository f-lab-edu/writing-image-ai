import KoGPTModel from './KoGPTModel';
import KoGPTView from './KoGPTView';

class KoGPTController {
  model: KoGPTModel;
  view: KoGPTView;

  constructor(model: KoGPTModel, view: KoGPTView) {
    this.model = model;
    this.view = view;

    this.model.registerOpenObserver(() => this.render());
  }

  render = () => {
    this.view.render();
  };

  initialize() {
    this.render();
  }
}

export default KoGPTController;
