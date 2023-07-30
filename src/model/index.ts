import { Image, State } from '../types/model.type';

const INITIAL_STATE: State = {
  images: [],
  scaleUpImages: [],
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

const setStateOnStorage = (state: State) => {
  sessionStorage.setItem('state', JSON.stringify(state));
};

export default (initalState = INITIAL_STATE) => {
  const state = cloneDeep(getInitialState(initalState));

  let imageObservers: Function;
  let loadingObservers: Function;
  let scaleUpObservers: Function;

  const getState = () => {
    return Object.freeze(cloneDeep(state));
  };

  const setImages = (images: Image[]) => {
    state.images = images;
    notifyImageHandler();
  };

  const addImage = (image: Image) => {
    if (!image) {
      return;
    }
    state.images.push(image);
    notifyImageHandler();
  };

  const deleteImage = (image: Image) => {
    if (!image) {
      return;
    }
    state.images = state.images.filter((item) => item.id !== image.id);
    notifyImageHandler();
  };

  const updateImage = (image: Image) => {
    if (!image) {
      return;
    }
    const filteredImage = state.images.filter((item) => item.id !== image.id);
    state.images = [...filteredImage, image];
    notifyImageHandler();
  };

  const setScaleUpImages = (base64_strings: string[]) => {
    state.scaleUpImages = base64_strings;
    notifyImageHandler();
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

  const notifyImageHandler = () => {
    setStateOnStorage(state);
    if (imageObservers) {
      imageObservers();
    }
  };

  const notifyLoadingHandler = () => {
    if (loadingObservers) {
      loadingObservers(state.loading);
    }
  };

  return {
    // Image
    setImages,
    addImage,
    deleteImage,
    updateImage,
    registerImageObserver,

    // Scale Up Image
    setScaleUpImages,

    // Laoding
    setLoading,
    registerLoadingObserver,
    // Common
    getState,
  };
};
