import { $app } from "./constants/element";
import { Controller } from "./types/contoller.type";
import { State } from "./types/model.type";
import { Component } from "./types/view.type";

const registry: { [path: string]: Component } = {};
let notFound: Component = (state: State, events: any) => {
  // Do nothing or return a default HTMLElement, e.g., an empty div
  return document.createElement("div");
};

const renderWrapper = (component: Component) => {
  return (state: State, events: Controller) => {
    const element = component(state, events);
    return element;
  };
};

const navigate = (path: string, state: State, events: Controller) => {
  const component = registry[path] || notFound;

  if (component) {
    while ($app.firstChild) {
      $app.removeChild($app.firstChild);
    }
    component(state, events);
  }

  history.pushState(null, "", path);
};

const addRoute = (path: string, component: Component) => {
  registry[path] = renderWrapper(component);
};

const setNotFound = (component: Component) => {
  notFound = renderWrapper(component);
};

export default {
  navigate,
  addRoute,
  setNotFound,
};
