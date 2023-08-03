import { Image, State } from '../types/model.type';

const INITIAL_STATE: State = {
  images: [],
  loading: false,
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

  let imageObservers: Function;
  let loadingObservers: Function;

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

  const setLoading = (loading: boolean) => {
    state.loading = loading;
    notifyLoadingHandler();
  };

  const registerImageObserver = (observer: () => void) => {
    imageObservers = observer;
  };

  const registerLoadingObserver = (observer: (loading: boolean) => void) => {
    loadingObservers = observer;
  };

  const notifyObservar = () => {
    imageObservers();
  };

  const notifyHandler = () => {
    setImageOnStorage(state);
    notifyObservar();
  };

  const notifyLoadingHandler = () => {
    loadingObservers(state.loading);
  };

  return {
    // Image
    setImages,
    addImage,
    deleteImage,
    updateImage,
    registerImageObserver,
    // Laoding
    setLoading,
    registerLoadingObserver,
    // Common
    getState,
  };
};
