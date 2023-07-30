import { $app } from '../constants/element';
import { eventContext } from '../contexts';
import router from '../router';
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
        eventContext.setLoading(true);
        const response = await createIamgeByKarlo({
          prompt,
        });

        if (response?.data?.images) {
          eventContext.setImages(response.data.images);
        }

        router.navigate('/image');
      } catch (err) {
        console.error(err);
      } finally {
        createImageInput.value = '';
        eventContext.setLoading(false);
      }
    });
  }

  return $app;
};
