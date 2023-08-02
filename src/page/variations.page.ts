import Button from '../components/button';
import NoImageContent from '../components/no-image';
import { $app } from '../constants/element';
import { eventContext, modelContext } from '../contexts';
import router from '../router';
import { variationsIamgeByKarlo } from '../services/karlo.api';
import { Image } from '../types/model.type';
import { clickListener, submitAsyncListener } from '../utils/clickHandler';

export default (): HTMLElement => {
  const { images } = modelContext.getState();
  let params = new URLSearchParams(window.location.search);
  let findImage = images.find((image) => image.id === params.get('image'));
  let newImages: Image[] = [];

  $app.innerHTML = `
    <section style="display: flex; flex-direction: column; align-items: center; padding-top: 8px">
      ${
        !findImage
          ? NoImageContent()
          : `
            <img src="data:image/png;base64,${findImage.image}" alt="${findImage.id}-scale-up-image" id="${findImage.id}" />
            <form id="variation-image-submit">
              <input id="variation-image-prompt" />
            </form>
            
            <div id="variation-images"></div>
           
            <h3>Select Other Job</h3>
            <div class="group-button space-y-1">
              ${Button({ id: 'go-image', text: 'Image', className: 'job-button' })}
              ${Button({ id: 'go-home', text: 'Home', className: 'job-button' })}
            </div>

          `
      }
    </section>
  `;

  if (findImage) {
    submitAsyncListener({
      seletor: '#variation-image-submit',
      callback: async () => {
        const variationImageInput = $app.querySelector('#variation-image-prompt') as HTMLInputElement;
        const prompt = variationImageInput.value;
        if (findImage) {
          const data = await variationsIamgeByKarlo({
            image: findImage.image,
            prompt,
            return_type: 'base64_string',
          });
          const $variationImages = $app.querySelector('#variation-images');
          if ($variationImages) {
            $variationImages.innerHTML = `
            ${data.images.map(
              (image) => `
                <img src="data:image/png;base64,${image.image}" alt="${image.id}-scale-up-image" id="${image.id}" />
                `
            )}
          `;
          }
        }
      },
    });
  }

  clickListener({
    seletor: '#go-image',
    callback: () => {
      router.navigate('/image');
    },
  });

  clickListener({
    seletor: '#go-home',
    callback: () => {
      router.navigate('/');
    },
  });

  return $app;
};
