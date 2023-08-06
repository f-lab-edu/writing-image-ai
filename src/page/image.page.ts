import Button from '../components/button';
import NoImageContent from '../components/no-image';
import { $app } from '../constants/element';
import { controller } from '../main';
import { upscaleIamgeByKarlo } from '../services/karlo.api';
import { clickListener } from '../utils/click';

export default (): HTMLElement => {
  const { images } = controller.model.getState();
  $app.innerHTML = `
    <section class="space-y-1" style="display: flex; flex-direction: column; align-items: center; padding-top: 8px;">
      ${
        images.length === 0
          ? NoImageContent()
          : `
            ${images.map(
              (image) => `
                <img src="data:image/png;base64,${image.image}" alt="${image.id}" id="${image.id}" />
                ${Button({ id: `go-variations-${image.id}`, text: 'Variation', className: 'job-button' })}
            `
            )}
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
          images: images.map((image) => image.image),
          return_type: 'base64_string',
        });

        if (data.images) {
          controller.model.setScaleUpImages(data.images);
          controller.view.render('/scale-up');
        }
      } catch (err) {
        console.error(err);
      } finally {
        controller.model.setLoading(false);
      }
    },
  });

  images.forEach((image) =>
    clickListener({
      seletor: `#go-variations-${image.id}`,
      callback: () => {
        controller.view.render(`/variations?image=${image.id}`);
      },
    })
  );

  return $app;
};
