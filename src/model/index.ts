import { Image, State } from '../types/model.type';

const INITIAL_STATE: State = {
  images: [],
};

const cloneDeep = (state: State): State => {
  return JSON.parse(JSON.stringify(state));
};

const getInitialState = (initalState: State) => {
  const state = sessionStorage.getItem('state');
  if (state) {
    return JSON.parse(state);
  }
  return initalState;
};

const setImageOnStorage = (state: State) => {
  sessionStorage.setItem('state', JSON.stringify(state));
};

export default (initalState = INITIAL_STATE) => {
  const state = cloneDeep(getInitialState(initalState));

  const observers: Array<() => void> = [];

  const getState = () => {
    return Object.freeze(cloneDeep(state));
  };

  const setImages = (images: Image[]) => {
    state.images = images;
    notifyHandler();
  };

  const addImage = (image: Image) => {
    if (!image) {
      return;
    }
    state.images.push(image);
    notifyHandler();
  };

  const deleteImage = (image: Image) => {
    if (!image) {
      return;
    }
    state.images = state.images.filter((item) => item.id !== image.id);
    notifyHandler();
  };

  const updateImage = (image: Image) => {
    if (!image) {
      return;
    }
    const filteredImage = state.images.filter((item) => item.id !== image.id);
    state.images = [...filteredImage, image];
    notifyHandler();
  };

  const addObserver = (observer: () => void) => {
    observers.push(observer);
  };

  const notifyObservar = () => {
    observers.forEach((observer) => observer());
  };

  const notifyHandler = () => {
    setImageOnStorage(state);
    notifyObservar();
  };

  return {
    setImages,
    addImage,
    deleteImage,
    updateImage,
    getState,
    addObserver,
  };
};
