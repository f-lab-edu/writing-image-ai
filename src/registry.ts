import { Controller } from "./types/contoller.type";
import { State } from "./types/model.type";
import { Component } from "./types/view.type";

const registry: { [name: string]: Component } = {};

const renderWrapper = (component: Component) => {
  return (targetElement: HTMLElement, state: State, events: Controller) => {
    const element = component(targetElement, state, events);

    const childComponents =
      element.querySelectorAll<HTMLElement>("[data-component]");

    Array.from(childComponents).forEach((target) => {
      const name = target.dataset.component;
      if (name) {
        const child = registry[name];
        if (!child) {
          return;
        }
        target.replaceWith(child(target, state, events));
      }
    });
    return element;
  };
};

const add = (name: string, component: Component) => {
  registry[name] = renderWrapper(component);
};

const renderRoot = (root: HTMLElement, state: State, events: Controller) => {
  const cloneComponent = (root: HTMLElement) => {
    return root.cloneNode(true) as HTMLElement;
  };

  return renderWrapper(cloneComponent)(root, state, events);
};

export default {
  add,
  renderRoot,
};
