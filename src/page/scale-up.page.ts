import Button from '../components/button';
import NoImageContent from '../components/no-image';
import { $app } from '../constants/element';
import { controller } from '../main';
import { clickListener } from '../utils/click';

export default (): HTMLElement => {
  const { scaleUpImages } = controller.model.getState();
  const section = `
    <section style="display: flex; flex-direction: column; align-items: center; padding-top: 8px">
      ${
        scaleUpImages.length === 0
          ? NoImageContent()
          : `
            ${scaleUpImages.map((image, index) => `<img src="data:image/png;base64,${image}" alt="${index}-scale-up-image" id="${index}-scale-up-image" />`)} 
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

  clickListener({
    seletor: '#go-image',
    callback: () => {
      controller.view.render('/image');
    },
  });

  clickListener({
    seletor: '#go-home',
    callback: () => {
      controller.view.render('/');
    },
  });

  return $app;
};
