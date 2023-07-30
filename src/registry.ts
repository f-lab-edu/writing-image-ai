import { $app } from './constants/element';
import { Component } from './types/view.type';

const registry: { [name: string]: Component } = {};

const renderWrapper = (component: Component) => {
  return () => {
    const element = component();
    const childComponents = element.querySelectorAll<HTMLElement>('[data-component]');

    Array.from(childComponents).forEach((target) => {
      const name = target.dataset.component;
      if (name) {
        const child = registry[name];
        if (!child) {
          return;
        }
        target.replaceWith(child());
      }
    });
    return element;
  };
};

const add = (name: string, component: Component) => {
  registry[name] = renderWrapper(component);
};

const renderRoot = () => {
  const cloneComponent = () => {
    return $app.cloneNode(true) as HTMLElement;
  };

  return renderWrapper(cloneComponent)();
};

export default {
  add,
  renderRoot,
};
