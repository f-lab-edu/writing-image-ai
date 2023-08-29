import { $app } from '../constants/element';
import { controller } from '../main';

export const clickListener = ({ seletor, callback }: { seletor: string; callback: () => void }) => {
  $app.querySelector(seletor)?.addEventListener('click', callback);
};

export const submitAsyncListener = ({ seletor, callback }: { seletor: string; callback: () => void }) => {
  $app.querySelector(seletor)?.addEventListener('submit', async (e) => {
    e.preventDefault();
    try {
      controller.model.setLoading(true);
      await callback();
    } catch (err) {
      console.error(err);
    } finally {
      controller.model.setLoading(false);
    }
  });
};
