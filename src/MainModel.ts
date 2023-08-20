import { type Image, type State } from './types/model.type';

class Model {
  #state: State = {
    images: [],
    scaleUpImages: [],
    variationImage: null,
    loading: false,
    storedImages: [],
  };

  imageObservers: (() => void | undefined) | undefined;
  loadingObservers: ((loading: boolean) => void | undefined) | undefined;
  scaleUpObservers: (() => void | undefined) | undefined;

  constructor() {
    this.#state = this.getInitialState(this.#state);
  }

  getInitialState(initalState: State) {
    const state = sessionStorage.getItem('state');
    return state ? JSON.parse(state) : initalState;
  }

  setStateOnStorage(state: State) {
    sessionStorage.setItem('state', JSON.stringify(state));
  }

  getState() {
    return Object.freeze(structuredClone(this.#state));
  }

  setImages(images: Image[]) {
    this.#state.images = images;
    this.notifyImageHandler();
  }

  addImage(image?: Image) {
    if (image == null) return;

    this.#state.images = [...this.#state.images, image];
    this.notifyImageHandler();
  }

  deleteImage(image?: Image) {
    if (image == null) return;

    this.#state.images = this.#state.images.filter((item) => item.id !== image.id);
    this.notifyImageHandler();
  }

  setVariationImage(image: Image) {
    this.#state.variationImage = image;
  }

  setScaleUpImages(scaleUpImages: string[]) {
    this.#state.scaleUpImages = scaleUpImages;
    this.notifyImageHandler();
  }

  addStoreImages(image: Image): boolean {
    const isStored = this.#state.storedImages.map(({ id }) => id).find((item) => item === image.id);
    if (isStored) return false;

    this.#state.storedImages = [...this.#state.storedImages, image];
    this.notifyImageHandler();
    return true;
  }

  deleteStoreImage(image: Image) {
    this.#state.storedImages = this.#state.storedImages.filter((item) => item.id !== image.id);
    this.notifyImageHandler();
  }

  resetStoreImages() {
    this.#state.storedImages = [];
  }

  setLoading(loading: boolean) {
    this.#state.loading = loading;
    this.notifyLoadingHandler();
  }

  registerImageObserver(observer: () => void) {
    this.imageObservers = observer;
  }

  registerLoadingObserver(observer: (loading: boolean) => void) {
    this.loadingObservers = observer;
  }

  notifyImageHandler() {
    if (this.imageObservers == null) return;

    this.setStateOnStorage(this.#state);
    this.imageObservers();
  }

  notifyLoadingHandler() {
    if (this.loadingObservers == null) return;

    this.loadingObservers(this.#state.loading);
  }
}

export default Model;
