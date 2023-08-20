import Button from '../components/button';
import { $app } from '../constants/element';
import { controller } from '../main';
import { createIamgeByKarlo } from '../services/karlo.api';
import { type KarloSamples } from '../types/karlo.type';
import { addSubmitEventListener } from '../utils/click';

export default () => {
  $app.innerHTML = `
    <section style="padding-top: 12px;">
      <article style="text-align: center">
        <h2>Kakao의 이미지 생성 Ai Karlo</h2>
        이미지를 만들어주는 Ai 플랫폼입니다.
      </article>
      <form id="create-image-submit" style="padding-top: 20px" class="space-y-1">
        <label for="create-image-prompt" style="font-size: 18px;"> 
          <b>Prompt</b> 
          (Wirte Only English)
        </label>
        <div style="display:flex;">
          <input id="create-image-prompt" style="width: 100%; font-size: 16px; margin-top: 6px" placeholder="A cat with white fur" />
        </div>
        <div>
          <label for="create-image-samples" style="font-size: 18px;"> 
            <b>samples</b> 
          </label>
          <select name="create-image-samples" id="create-image-samples" style="width: 100%; font-size: 16px; margin-top: 6px;">
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
          </select>
        </div>
        <div style="padding-top:20px">
          ${Button({ id: 'go-image', text: 'submit', className: 'input-button', type: 'submit' })}
        </div>
        </form>
    </section>
  `;

  addSubmitEventListener({
    selector: '#create-image-submit',
    callback: async () => {
      const createImageInput = $app.querySelector('#create-image-prompt') as HTMLInputElement;
      const createImageSample = $app.querySelector('#create-image-samples') as HTMLSelectElement;
      try {
        const prompt = createImageInput.value;
        const samples = (+createImageSample.value as KarloSamples) ?? 1;

        const data = await createIamgeByKarlo({
          prompt,
          samples,
          return_type: 'base64_string',
        });

        controller.setImages(data.images);
        controller.render('/image');
      } catch (err) {
        console.error(err);
      } finally {
        createImageInput.value = '';
      }
    },
  });

  return $app;
};
