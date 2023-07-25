import { $app } from "./constants/element";
import { Controller } from "./types/contoller.type";
import { State } from "./types/model.type";
import { Component } from "./types/view.type";

const registry: { [name: string]: Component } = {};

const renderWrapper = (component: Component) => {
  return (state: State, events: Controller) => {
    const element = component(state, events);

    const childComponents =
      element.querySelectorAll<HTMLElement>("[data-component]");

    Array.from(childComponents).forEach((target) => {
      const name = target.dataset.component;
      if (name) {
        const child = registry[name];
        if (!child) {
          return;
        }
        target.replaceWith(child(state, events));
      }
    });
    return element;
  };
};

const add = (name: string, component: Component) => {
  registry[name] = renderWrapper(component);
};

const renderRoot = (state: State, events: Controller) => {
  const cloneComponent = () => {
    return $app.cloneNode(true) as HTMLElement;
  };

  return renderWrapper(cloneComponent)(state, events);
};

export default {
  add,
  renderRoot,
};
