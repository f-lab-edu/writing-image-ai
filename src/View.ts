import { $app } from "./constants/element";
import notFoundPage from "./page/404.page";
import homePage from "./page/home.page";
import imagePage from "./page/image.page";
import scaleUpPage from "./page/scale-up.page";
import { Component } from "./types/view.type";

class View {
  registry: { [path: string]: Component } = {};

  constructor() {
    this.addRoute('/', homePage);
    this.addRoute('/image', imagePage);
    this.addRoute('/scale-up', scaleUpPage);
  }

  render = (path: string) => {
    const component = this.registry[path] || notFoundPage;

    if (component) {
      history.pushState(null, '', path);
      while ($app.firstChild) {
        $app.removeChild($app.firstChild);
      }
      component();
    }
  };

  addRoute = (path: string, component: Component) => {
    this.registry[path] = component;
  };
}

export default View;
