import { Image, State } from './types/model.type';

class Model {
  state: State = {
    images: [],
    scaleUpImages: [],
    variationImage: null,
    loading: false,
    storeImages: [],
  };
  imageObservers: (() => void | undefined) | undefined;
  loadingObservers: ((loading: boolean) => void | undefined) | undefined;
  scaleUpObservers: (() => void | undefined) | undefined;

  constructor() {
    this.state = this.getInitialState(this.state);
  }

  cloneDeep = (state: State): State => {
    return structuredClone(state);
  };

  getInitialState = (initalState: State) => {
    const state = sessionStorage.getItem('state');
    if (state) {
      return JSON.parse(state);
    }
    return initalState;
  };

  setStateOnStorage = (state: State) => {
    sessionStorage.setItem('state', JSON.stringify(state));
  };

  getState = () => {
    return Object.freeze(this.cloneDeep(this.state));
  };

  setImages = (images: Image[]) => {
    this.state.images = images;
    this.notifyImageHandler();
  };

  addImage = (image?: Image) => {
    if (!image) {
      return;
    }
    this.state.images = [...this.state.images, image];
    this.notifyImageHandler();
  };

  deleteImage = (image?: Image) => {
    if (!image) {
      return;
    }
    this.state.images = this.state.images.filter((item) => item.id !== image.id);
    this.notifyImageHandler();
  };

  updateImage = (image?: Image) => {
    if (!image) {
      return;
    }
    const filteredImage = this.state.images.filter((item) => item.id !== image.id);
    this.state.images = [...filteredImage, image];
    this.notifyImageHandler();
  };

  setVariationImage = (image: Image) => {
    this.state.variationImage = image;
  };

  setScaleUpImages = (scaleUpImages: string[]) => {
    this.state.scaleUpImages = scaleUpImages;
    this.notifyImageHandler();
  };

  addStoreImages = (image: Image) => {
    this.state.storeImages = [...this.state.storeImages, image];
  };

  resetStoreImages = () => {
    this.state.storeImages = [];
  };

  setLoading = (loading: boolean) => {
    this.state.loading = loading;
    this.notifyLoadingHandler();
  };

  registerImageObserver = (observer: () => void) => {
    this.imageObservers = observer;
  };

  registerLoadingObserver = (observer: (loading: boolean) => void) => {
    this.loadingObservers = observer;
  };

  notifyImageHandler = () => {
    this.setStateOnStorage(this.state);
    if (this.imageObservers) {
      this.imageObservers();
    }
  };

  notifyLoadingHandler = () => {
    if (this.loadingObservers) {
      this.loadingObservers(this.state.loading);
    }
  };
}

export default Model;
