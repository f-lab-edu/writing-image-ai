import goHomeComponent from '../components/go-home';
import { $app } from '../constants/element';
import { modelContext } from '../contexts';

export default (): HTMLElement => {
  const state = modelContext.getState();
  const section = `
    <section style="display: flex; flex-direction: column; align-items: center; padding-top: 8px">
      ${
        state.images.length === 0
          ? `
              <div>
                <h2> Not Image </h2>
              </div>
              ${goHomeComponent()}
            `
          : `
            ${state.images.map((image) => `<img src="${image.image}" alt="${image.id}" id="${image.id}" />`)}
            <h3>Select Other Job</h3>
            <button style="width: 100%; height: 52px"></button>
          `
      }
    </section>
  `;
  $app.innerHTML = section;
  return $app;
};
