import Button from '../components/button';
import NoImageContent from '../components/no-image';
import { $app } from '../constants/element';
import { controller } from '../main';
import { clickListener } from '../utils/click';
import Toastify from 'toastify-js';

export default (): HTMLElement => {
  const { storedImages: images } = controller.model.getState();
  $app.innerHTML = `
    <section class="space-y-1" style="display: flex; flex-direction: column; align-items: center; padding-top: 8px;">
      ${
        images.length === 0
          ? NoImageContent()
          : `
            ${images.map(
              (image) => `
                <img src="data:image/png;base64,${image.image}" alt="${image.id}" id="${image.id}" />
                <div style="width: 100%; display: flex; justify-content: center;" >
                  ${Button({ id: `delete-${image.id}`, text: 'Delete', className: 'delete-button' })}
                </div>
            `
            )}          
          `
      }
    </section>
  `;

  images.forEach((image) => {
    clickListener({
      seletor: `#go-variations-${image.id}`,
      callback: () => {
        controller.view.render(`/variations?image=${image.id}`);
      },
    });
    clickListener({
      seletor: `#delete-${image.id}`,
      callback: () => {
        controller.model.deleteStoreImage(image);
        Toastify({
          text: 'Succes Delete',
          duration: 3000,
        }).showToast();
      },
    });
  });

  return $app;
};
