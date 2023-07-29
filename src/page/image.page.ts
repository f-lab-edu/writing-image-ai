import { $app } from '../constants/element';
import { type Controller } from '../types/contoller.type';
import { type State } from '../types/model.type';

export default (state: State, events: Controller): HTMLElement => {
  const section = `
    <section style="display: flex; flex-direction: column; align-items: center; padding-top: 8px">
      ${
        state.images.length === 0
          ? `
              <div>
                <h2> Not Image </h2>
              </div>
              <a href="/"> Plase Go Home </a>
            `
          : `
            ${state.images.map((image) => `<img src="${image.image}" alt="${image.id}" id="${image.id}" />`)}
            <h3>Select Other Job</h3>
          `
      }
    </section>
  `;
  $app.innerHTML = section;
  return $app;
};
