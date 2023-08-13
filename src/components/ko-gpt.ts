import { $KoGPT } from '../constants/element';
import { kogptController } from '../main';
import { generationByKoGPT } from '../services/kogpt.api';

const KoGptComponent = () => {
  const { isOpen } = kogptController.model.getState();

  $KoGPT.innerHTML = `
    <button id="KoGPT-toggle" style="display: ${!isOpen ? 'flex' : 'none'}";>
      <p>KoGPT</p>
    </button>
    <div id="KoGPT-wrapper" style="display: ${isOpen ? 'flex' : 'none'};">
      <div style="width:100%; position:relative;">
        <p style="width:100%; padding-bottom: 12px; text-align: center; border-bottom: solid 1px black;">KoGPT</p>
        <button id="KoGPT-close-btn" style="width: 25px; height: 25px; position: absolute; top: 8px; right: 8px;">X</button>
      </div>
      <div id="KoGPT-chat" style="padding: 12px; width:276px; height: 100%; overflow-y: scroll;">
      </div>
      <form style="width: 100%; display:flex" id="KoGPT-input-form">
        <div style="width:100%; padding-right: 8px;">
          <input id="KoGPT-textarea" style="width: 100%; padding: 0px;" />
        </div>
        <button style="width:50px;">전송</button>
      </form>
    </div>
  `;

  $KoGPT.querySelector('#KoGPT-toggle')?.addEventListener('click', () => {
    kogptController.model.toggleOpen();
  });
  $KoGPT.querySelector('#KoGPT-close-btn')?.addEventListener('click', () => {
    kogptController.model.toggleOpen();
  });

  $KoGPT.querySelector('#KoGPT-input-form')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const $textarea = $KoGPT.querySelector('#KoGPT-textarea') as HTMLTextAreaElement;
    const $chat = $KoGPT.querySelector('#KoGPT-chat') as HTMLDivElement;
    const prompt = $textarea.value;
    $chat.innerHTML += `<p>user : ${$textarea.value}</p>`;
    $textarea.value = '';
    $chat.scrollTop = $chat.scrollHeight;

    try {
      const data = await generationByKoGPT({
        prompt: prompt,
        max_tokens: 120,
        n: 1,
      });

      $chat.innerHTML += `<p>KoGPT : ${data.generations[0].text}</p>`;
    } catch (err) {
      $chat.innerHTML += `<p>KoGPT : 에러가 발생하였습니다. 다시 시도해주시기 바랍니다.</p>`;
    } finally {
      $chat.scrollTop = $chat.scrollHeight;
    }
  });

  return $KoGPT;
};

export default KoGptComponent;
