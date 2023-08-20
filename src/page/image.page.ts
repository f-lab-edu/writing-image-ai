import Button from '../components/button';
import NoImageContent from '../components/no-image';
import { failToastify, successToastify } from '../components/toastify';
import { $app } from '../constants/element';
import { controller } from '../main';
import { upscaleIamgeByKarlo } from '../services/karlo.api';
import { addClickEventListener } from '../utils/click';

export default (): HTMLElement => {
  const { images } = controller.getState();
  $app.innerHTML = `
    <section class="space-y-1" style="display: flex; flex-direction: column; align-items: center; padding-top: 8px;">
      ${
        images.length === 0
          ? NoImageContent()
          : `
            ${images
              .map(
                ({ image, id }) => `
                <img src="data:image/png;base64,${image}" alt="${id}" id="${id}" />
                <div style="width: 100%; display: flex; justify-content: center;" class="space-x-1">
                  ${Button({ id: `go-variations-${id}`, text: 'Variation', className: 'job-button' })}
                  ${Button({ id: `store-${id}`, text: 'Store', className: 'store-button' })}
                </div>
            `
              )
              .join('')}
          `
      }
      <br />
      ${Button({ id: 'go-scale-up', text: 'Scale Up', className: 'job-button' })}
    </section>
  `;

  addClickEventListener({
    selector: '#go-scale-up',
    callback: async () => {
      controller.setLoading(true);
      try {
        const data = await upscaleIamgeByKarlo({
          images: images.map(({ image }) => image),
          return_type: 'base64_string',
        });

        if (data.images) {
          controller.setScaleUpImages(data.images);
          controller.render('/scale-up');
        }
      } catch (err) {
        console.error(err);
      } finally {
        controller.setLoading(false);
      }
    },
  });

  images.forEach((image) => {
    addClickEventListener({
      selector: `#go-variations-${image.id}`,
      callback: () => {
        controller.render(`/variations?image=${image.id}`);
      },
    });
    addClickEventListener({
      selector: `#store-${image.id}`,
      callback: () => {
        const result = controller.addStoreImages(image);
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
