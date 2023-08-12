class KoGPTModel {
  state: {
    isOpen: boolean;
  } = {
    isOpen: false,
  };

  openObservers: (() => void | undefined) | undefined;

  constructor() {
    this.state = this.getInitialState(this.state);
  }

  cloneDeep = (state: typeof this.state): typeof this.state => {
    return structuredClone(state);
  };

  getInitialState = (initalState: typeof this.state) => {
    const state = sessionStorage.getItem('ko-gpt');
    if (state) {
      return JSON.parse(state);
    }
    return initalState;
  };

  setStateOnStorage = (state: typeof this.state) => {
    sessionStorage.setItem('ko-gpt', JSON.stringify(state));
  };

  getState = () => {
    return Object.freeze(this.cloneDeep(this.state));
  };

  toggleOpen = () => {
    this.state.isOpen = !this.state.isOpen;
    this.notifyOpenHandler();
    return;
  };

  registerOpenObserver = (observer: () => void) => {
    this.openObservers = observer;
  };

  notifyOpenHandler = () => {
    if (!this.openObservers) return;
    this.openObservers();
  };
}

export default KoGPTModel;
