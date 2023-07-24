import { Controller } from "./types/contoller.type";
import { State } from "./types/model.type";
import { Component } from "./types/view.type";

const registry: { [path: string]: Component } = {};
let notFound: Component = (
  targetElement: HTMLElement,
  state: State,
  events: any
) => {
  // Do nothing or return a default HTMLElement, e.g., an empty div
  return document.createElement("div");
};

const renderWrapper = (component: Component) => {
  return (targetElement: HTMLElement, state: State, events: Controller) => {
    const element = component(targetElement, state, events);
    return element;
  };
};

const navigate = (
  path: string,
  targetElement: HTMLElement,
  state: State,
  events: Controller
) => {
  const component = registry[path] || notFound;

  if (component) {
    while (targetElement.firstChild) {
      targetElement.removeChild(targetElement.firstChild);
    }
    component(targetElement, state, events);
    // targetElement.appendChild(element);
  }

  history.pushState(null, "", path);
};

const addRoute = (path: string, component: Component) => {
  registry[path] = renderWrapper(component);
  console.log("registry", registry);
};

const setNotFound = (component: Component) => {
  notFound = renderWrapper(component);
};

export default {
  navigate,
  addRoute,
  setNotFound,
};
