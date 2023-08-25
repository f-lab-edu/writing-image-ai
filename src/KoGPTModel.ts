class KoGPTModel {
  #state: {
    isOpen: boolean;
  } = {
    isOpen: false,
  };

  openObservers: (() => void | undefined) | undefined;

  getState() {
    return Object.freeze(structuredClone(this.#state));
  }

  toggle() {
    this.#state.isOpen = !this.#state.isOpen;
    this.notifyOpenHandler();
  }

  registerOpenObserver(observer: () => void) {
    this.openObservers = observer;
  }

  notifyOpenHandler() {
    if (!this.openObservers) return;
    this.openObservers();
  }
}

export default KoGPTModel;
