import Model from './MainModel';
import View from './MainView';
import { $loading } from './constants/element';

class Controller {
  model: Model;
  view: View;

  constructor(model: Model, view: View) {
    this.model = model;
    this.view = view;

    this.model.registerImageObserver(() => this.onImageChange());
    this.model.registerLoadingObserver((loading) => this.onLoadingChange(loading));
  }

  render = (path: string) => {
    this.view.render(path);
  };

  initialize() {
    window.addEventListener('load', () => {
      window.addEventListener('popstate', () => {
        this.render(window.location.pathname);
      });
    });

    this.render(window.location.href.replace(window.location.origin, ''));
  }

  onImageChange = () => {
    this.render(window.location.pathname);
  };

  onLoadingChange = (loading: boolean) => {
    $loading.style.display = loading ? 'flex' : 'none';
  };
}

export default Controller;
