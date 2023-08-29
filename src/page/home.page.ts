import Button from '../components/button';
import { $app } from '../constants/element';
import { controller } from '../main';
import { createIamgeByKarlo } from '../services/karlo.api';
import { submitAsyncListener } from '../utils/click';

export default () => {
  $app.innerHTML = `
    <section style="padding-top: 12px;">
      <article style="text-align: center">
        <h2>Kakao의 이미지 생성 Ai Karlo</h2>
        이미지를 만들어주는 Ai 플랫폼입니다.
      </article>
      <form id="create-image-submit" style="padding-top: 20px">
        <label for="create-image-prompt" style="font-size: 18px;"> 
          <b>Prompt</b> 
          (Wirte Only English)
        </label>
        <div style="display:flex; width: 100%;">
          <div style="width: 100%; padding-right: 12px;">
            <input id="create-image-prompt" style="width: 100%; font-size: 16px; margin-top: 6px" placeholder="A cat with white fur" />
          </div>
          ${Button({ id: 'go-image', text: 'submit', className: 'input-button', type: 'submit' })}
        </div>
      </form>
    </section>
  `;

  submitAsyncListener({
    seletor: '#create-image-submit',
    callback: async () => {
      const createImageInput = $app.querySelector('#create-image-prompt') as HTMLInputElement;
      try {
        const prompt = createImageInput.value;

        const data = await createIamgeByKarlo({
          prompt,
          return_type: 'base64_string',
        });

        if (data.images) {
          controller.model.setImages(data.images);
        }
        controller.view.render('/image');
      } catch (err) {
        console.error(err);
      } finally {
        createImageInput.value = '';
      }
    },
  });

  return $app;
};
