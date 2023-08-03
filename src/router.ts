import { $app } from './constants/element';
import notFoundPage from './page/404.page';
import { Component } from './types/view.type';

const registry: { [path: string]: Component } = {};

const navigate = (path: string) => {
  const component = registry[path] || notFoundPage;

  if (component) {
    while ($app.firstChild) {
      $app.removeChild($app.firstChild);
    }
    component();
  }

  history.pushState(null, '', path);
};

const addRoute = (path: string, component: Component) => {
  registry[path] = component;
};

export default {
  navigate,
  addRoute,
};
