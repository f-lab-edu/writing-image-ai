class KoGPTModel {
  state: {
    isOpen: boolean;
  } = {
    isOpen: false,
  };

  openObservers: (() => void | undefined) | undefined;

  cloneDeep = (state: typeof this.state): typeof this.state => {
    return structuredClone(state);
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
