import Button from '../components/button';
import NoImageContent from '../components/no-image';
import { $app } from '../constants/element';
import { controller } from '../main';
import { addClickEventListener } from '../utils/click';
import Toastify from 'toastify-js';

export default (): HTMLElement => {
  const { storedImages: images } = controller.getState();
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
                <div style="width: 100%; display: flex; justify-content: center;" >
                  ${Button({ id: `delete-${id}`, text: 'Delete', className: 'delete-button' })}
                </div>
            `
              )
              .join('')}          
          `
      }
    </section>
  `;

  images.forEach((image) => {
    addClickEventListener({
      selector: `#go-variations-${image.id}`,
      callback: () => {
        controller.render(`/variations?image=${image.id}`);
      },
    });
    addClickEventListener({
      selector: `#delete-${image.id}`,
      callback: () => {
        controller.deleteStoreImage(image);
        Toastify({
          text: 'Succes Delete',
          duration: 3000,
        }).showToast();
      },
    });
  });

  return $app;
};
