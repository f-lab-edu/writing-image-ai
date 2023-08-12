import KoGptComponent from './components/ko-gpt';
import { Component } from './types/view.type';

class KoGPTView {
  component: Component | undefined;

  constructor() {
    this.component = KoGptComponent;
  }

  render = () => {
    if (this.component) {
      this.component();
    }
  };
}

export default KoGPTView;
