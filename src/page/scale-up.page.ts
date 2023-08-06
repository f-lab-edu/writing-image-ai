import NoImageContent from '../components/no-image';
import { $app } from '../constants/element';
import { controller } from '../main';

export default (): HTMLElement => {
  const { scaleUpImages } = controller.model.getState();
  $app.innerHTML = `
    <section style="display: flex; flex-direction: column; align-items: center; padding-top: 8px">
      ${
        scaleUpImages.length === 0
          ? NoImageContent()
          : `
            ${scaleUpImages.map((image, index) => `<img src="data:image/png;base64,${image}" alt="${index}-scale-up-image" id="${index}-scale-up-image" />`)} 
          `
      }
    </section>
  `;

  return $app;
};
