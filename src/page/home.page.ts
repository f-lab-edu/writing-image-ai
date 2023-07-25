import { $app } from "../constants/element";
import { createIamgeByKarlo } from "../services/karlo.api";
import { Controller } from "../types/contoller.type";
import { State } from "../types/model.type";

export default (state: State, events: Controller) => {
  $app.innerHTML = `
  <section style="padding-top: 12px;">
    <article style="text-align: center">
      <h2>Kakao의 이미지 생성 Ai Karlo</h2>
      이미지를 만들어주는 Ai 플랫폼입니다.
    </article>
    <div style="padding-top: 20px">
      <label for="create-prompt" style="font-size: 18px;"> 
        <b>Prompt</b> 
        (Wirte Only English)
      </label>
      <input id="create-prompt" style="width: 100%; font-size: 16px; margin-top: 6px" placeholder="A cat with white fur" />
    </div>
  </section>
`;

  if (state.images) {
    state.images.map((image) => {
      $app.innerHTML += `<img src="${image.image}" alt="${image.id}" />`;
    });
  }

  const createImagePromptElement = $app.querySelector(
    "#create-prompt"
  ) as HTMLInputElement;

  createImagePromptElement.addEventListener(
    "keypress",
    async (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        const prompt = createImagePromptElement.value;
        try {
          const response = await createIamgeByKarlo({
            prompt,
          });
          response.data.images.forEach((image) => {
            events.addImage(image);
          });
        } catch (err) {
          console.error(err);
        } finally {
          createImagePromptElement.value = "";
        }
      }
    }
  );

  return $app;
};
