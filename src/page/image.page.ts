import Button from '../components/button';
import NoImageContent from '../components/no-image';
import { failToastify, successToastify } from '../components/toastify';
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
                <div style="width: 100%; display: flex; justify-content: center;" class="space-x-1">
                  ${Button({ id: `go-variations-${image.id}`, text: 'Variation', className: 'job-button' })}
                  ${Button({ id: `store-${image.id}`, text: 'Store', className: 'store-button' })}
                </div>
                ${Button({ id: 'go-scale-up', text: 'Scale Up', className: 'job-button' })}

            `
            )}
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

  images.forEach((image) => {
    clickListener({
      seletor: `#go-variations-${image.id}`,
      callback: () => {
        controller.view.render(`/variations?image=${image.id}`);
      },
    });
    clickListener({
      seletor: `#store-${image.id}`,
      callback: () => {
        const result = controller.model.addStoreImages(image);
        if (result) {
          successToastify('Succeed Save');
        } else {
          failToastify('Failed Save');
        }
      },
    });
  });

  return $app;
};
