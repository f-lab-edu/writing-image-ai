import { $app } from '../constants/element';
import { model, view } from '../main';
import { createIamgeByKarlo } from '../services/karlo.api';

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
        <input id="create-image-prompt" style="width: 100%; font-size: 16px; margin-top: 6px" placeholder="A cat with white fur" />
      </form>
    </section>
  `;

  const createImageForm = $app.querySelector('#create-image-submit');
  const createImageInput = $app.querySelector('#create-image-prompt') as HTMLInputElement;

  if (createImageForm && createImageInput) {
    createImageForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const prompt = createImageInput.value;
      try {
        model.setLoading(true);
        const data = await createIamgeByKarlo({
          prompt,
          return_type: 'base64_string',
        });

        if (data.images) {
          model.setImages(data.images);
        }

        view.render('/image');
      } catch (err) {
        console.error(err);
      } finally {
        createImageInput.value = '';
        model.setLoading(false);
      }
    });
  }

  return $app;
};
