import type Model from './MainModel';
import type View from './MainView';
import { $loading } from './constants/element';
import { type Image } from './types/model.type';

class Controller {
  #model: Model;
  #view: View;

  constructor(model: Model, view: View) {
    this.#model = model;
    this.#view = view;

    this.#model.registerImageObserver(() => {
      this.onImageChange();
    });
    this.#model.registerLoadingObserver((loading) => {
      this.onLoadingChange(loading);
    });
  }

  initialize() {
    window.addEventListener('popstate', () => {
      this.routeRender(window.location.pathname);
    });

    this.render(window.location.href.replace(window.location.origin, ''));
  }

  render(path: string) {
    this.#view.render(path);
  }

  routeRender(path: string) {
    this.#view.routeRender(path);
  }

  getState() {
    return this.#model.getState();
  }

  setImages(images: Image[]) {
    this.#model.setImages(images);
  }

  setLoading(loading: boolean) {
    this.#model.setLoading(loading);
  }

  setScaleUpImages(images: string[]) {
    this.#model.setScaleUpImages(images);
  }

  addStoreImages(image: Image) {
    return this.#model.addStoreImages(image);
  }

  deleteStoreImage(image: Image) {
    this.#model.deleteImage(image);
  }

  onImageChange() {
    this.render(window.location.pathname);
  }

  onLoadingChange(loading: boolean) {
    $loading.style.display = loading ? 'flex' : 'none';
  }
}

export default Controller;
