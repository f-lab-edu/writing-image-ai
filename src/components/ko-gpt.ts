import { $KoGPT } from '../constants/element';
import { kogptController } from '../main';
import { generationByKoGPT } from '../services/kogpt.api';

const KoGptComponent = () => {
  const { isOpen } = kogptController.model.getState();

  $KoGPT.innerHTML = `
    <div id="KoGPT-toggle" style="display: ${!isOpen ? 'flex' : 'none'}";>
      <p>KoGPT</p>
    </div>
    <div id="KoGPT-wrapper" style="display: ${isOpen ? 'flex' : 'none'};">
      <p style="width:100%; padding-bottom: 12px; text-align: center; border-bottom: solid 1px black;">KoGPT</p>
      <div id="KoGPT-chat" style="padding: 12px; width:276px; height: 100%; overflow-y: scroll;">
      </div>
      <form style="width: 100%;" id="KoGPT-input-form">
        <input id="KoGPT-textarea" style="width: 299px; padding: 0px;" />
      </form>
    </div>
  `;

  $KoGPT.querySelector('#KoGPT-toggle')?.addEventListener('click', () => {
    kogptController.model.toggleOpen();
  });

  $KoGPT.querySelector('#KoGPT-input-form')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const prompt = ($KoGPT.querySelector('#KoGPT-textarea') as HTMLTextAreaElement).value;
    const $chat = $KoGPT.querySelector('#KoGPT-chat') as HTMLDivElement;
    $chat.innerHTML += `<p>user : ${prompt}</p>`;

    try {
      const data = await generationByKoGPT({
        prompt,
        max_tokens: 120,
        n: 1,
      });

      $chat.innerHTML += `<p>KoGPT : ${data.generations[0].text}</p>`;
    } catch (err) {
      $chat.innerHTML += `<p>KoGPT : 에러가 발생하였습니다. 다시 시도해주시기 바랍니다.</p>`;
    }
  });

  return $KoGPT;
};

export default KoGptComponent;
