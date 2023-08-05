import Button from '../components/button';
import NoImageContent from '../components/no-image';
import { $app } from '../constants/element';
import controller from '../main';
import { upscaleIamgeByKarlo } from '../services/karlo.api';
import { clickListener } from '../utils/click';

export default (): HTMLElement => {
  const state = controller.model.getState();
  $app.innerHTML = `
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

  clickListener({
    seletor: '#go-scale-up',
    callback: async () => {
      controller.model.setLoading(true);
      try {
        const data = await upscaleIamgeByKarlo({
          images: state.images.map((image) => image.image),
          return_type: 'base64_string',
        });
        console.log({ data });

        if (data.images) {
          controller.model.setScaleUpImages(data.images);
          controller.render('/scale-up');
        }
      } catch (err) {
        console.error(err);
      } finally {
        controller.model.setLoading(false);
      }
    },
  });

  return $app;
};
