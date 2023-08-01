import { Image, State } from "../types/model.type";

const cloneDeep = (x: Object): State => {
  return JSON.parse(JSON.stringify(x));
};

const INITIAL_STATE: State = {
  images: [],
};

export default (initalState = INITIAL_STATE) => {
  const state = cloneDeep(initalState);

  const observers: Array<() => void> = [];

  const getState = () => {
    return Object.freeze(cloneDeep(state));
  };

  const addImage = (image: Image) => {
    if (!image) {
      return;
    }
    state.images.push(image);
    notifyObservers();
  };

  const deleteImage = (image: Image) => {
    if (!image) {
      return;
    }
    state.images = state.images.filter((item) => item.id !== image.id);
    notifyObservers();
  };

  const updateImage = (image: Image) => {
    if (!image) {
      return;
    }
    const filteredImage = state.images.filter((item) => item.id !== image.id);
    state.images = [...filteredImage, image];
    notifyObservers();
  };

  const addObserver = (observer: () => void) => {
    observers.push(observer);
  };

  const notifyObservers = () => {
    observers.forEach((observer) => observer());
  };

  return {
    addImage,
    deleteImage,
    updateImage,
    getState,
    addObserver,
  };
};
