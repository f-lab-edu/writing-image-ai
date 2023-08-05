import Button from '../components/button';
import NoImageContent from '../components/no-image';
import { $app } from '../constants/element';
import { model, view } from '../main';

export default (): HTMLElement => {
  const state = model.getState();
  const section = `
    <section style="display: flex; flex-direction: column; align-items: center; padding-top: 8px">
      ${
        state.scaleUpImages.length === 0
          ? NoImageContent()
          : `
            ${state.scaleUpImages.map(
              (image, index) => `<img src="data:image/png;base64,${image}" alt="${index}-scale-up-image" id="${index}-scale-up-image" />`
            )} 
            <h3>Select Other Job</h3>
            <div class="group-button space-y-1">
              ${Button({ id: 'go-image', text: 'Image', className: 'job-button' })}
              ${Button({ id: 'go-home', text: 'Home', className: 'job-button' })}
            </div>

          `
      }
    </section>
  `;

  $app.innerHTML = section;

  $app.querySelector('#go-image')?.addEventListener('click', async () => {
    view.render('/image');
  });

  $app.querySelector('#go-home')?.addEventListener('click', async () => {
    view.render('/');
  });
  return $app;
};
