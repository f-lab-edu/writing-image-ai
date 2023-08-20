import KoGptComponent from './components/ko-gpt';
import { type Component } from './types/view.type';

class KoGPTView {
  component: Component | undefined;

  constructor() {
    this.component = KoGptComponent;
  }

  render() {
    if (!this.component) return;
    this.component();
  }
}

export default KoGPTView;
