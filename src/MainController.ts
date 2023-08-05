import Model from './Model';
import View from './View';
import { $loading } from './constants/element';

class Controller {
  model: Model;
  view: View;

  constructor(model: Model, view: View) {
    this.model = model;
    this.view = view;

    this.model.registerImageObserver(() => this.onImageChange());
    this.model.registerLoadingObserver((loading) => this.onLoadingChange(loading));

    this.initialize();
  }

  initialize() {
    window.addEventListener('load', () => {
      window.addEventListener('popstate', () => {
        console.log('popstate');
        const path = window.location.pathname;
        this.view.render(path);
      });
    });

    this.view.render(window.location.pathname);
  }

  onImageChange() {
    const { pathname } = window.location;
    this.view.render(pathname);
  }

  onLoadingChange(loading: boolean) {
    if (loading) {
      $loading.style.display = 'flex';
    } else {
      $loading.style.display = 'none';
    }
  }
}

export default Controller;
