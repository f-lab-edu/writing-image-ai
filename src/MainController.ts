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
  }

  render = (path: string) => {
    this.view.render(path);
  };

  initialize() {
    window.addEventListener('load', () => {
      window.addEventListener('popstate', () => {
        console.log('popstate');
        const path = window.location.pathname;
        this.render(path);
      });
    });

    this.render(window.location.pathname);
  }

  onImageChange = () => {
    const { pathname } = window.location;
    this.render(pathname);
  };

  onLoadingChange = (loading: boolean) => {
    if (loading) {
      $loading.style.display = 'flex';
    } else {
      $loading.style.display = 'none';
    }
  };
}

export default Controller;
