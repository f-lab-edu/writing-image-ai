import Button from '../components/button';
import NoImageContent from '../components/no-image';
import { $app } from '../constants/element';
import { model, view } from '../main';
import { upscaleIamgeByKarlo } from '../services/karlo.api';

export default (): HTMLElement => {
  const state = model.getState();
  const section = `
    <section style="display: flex; flex-direction: column; align-items: center; padding-top: 8px">
      ${
        state.images.length === 0
          ? NoImageContent()
          : `
            ${state.images.map((image) => `<img src="data:image/png;base64,${image.image}" alt="${image.id}" id="${image.id}" />`)}
            <h3>Select Other Job</h3>
            <div class="group-button space-y-1">
              ${Button({ id: 'go-scale-up', text: 'Scale Up', className: 'job-button' })}
              ${Button({ text: 'Comming Soon', className: 'job-button', disabled: true })}
            </div>
          `
      }
    </section>
  `;

  $app.innerHTML = section;

  $app.querySelector('#go-scale-up')?.addEventListener('click', async (e: Event) => {
    model.setLoading(true);
    try {
      const data = await upscaleIamgeByKarlo({
        images: state.images.map((image) => image.image),
        return_type: 'base64_string',
      });
      console.log({ data });

      if (data.images) {
        model.setScaleUpImages(data.images);
        view.render('/scale-up');
      }
    } catch (err) {
      console.error(err);
    } finally {
      model.setLoading(false);
    }
  });
  return $app;
};
