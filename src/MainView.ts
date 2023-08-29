import navigator from './components/navigator';
import notFoundPage from './page/404.page';
import homePage from './page/home.page';
import imagePage from './page/image.page';
import scaleUpPage from './page/scale-up.page';
import storedPage from './page/stored.page';
import variationsPage from './page/variations.page';
import { type Component } from './types/view.type';

class View {
  #registry: Record<string, Component> = {};

  constructor() {
    this.addRoute('/', homePage);
    this.addRoute('/image', imagePage);
    this.addRoute('/scale-up', scaleUpPage);
    this.addRoute('/variations', variationsPage);
    this.addRoute('/stored', storedPage);
  }

  render(path: string) {
    history.pushState(null, '', path);
    this.routeRender(path);
  }

  routeRender(path: string) {
    let route = path;

    if (path.includes('?')) {
      route = route.split('?')[0];
    }

    const component = this.#registry[route] || notFoundPage;

    if (component) {
      navigator();
      component();
    }
  }

  addRoute(path: string, component: Component) {
    this.#registry[path] = component;
  }
}

export default View;
