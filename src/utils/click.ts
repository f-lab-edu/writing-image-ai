import { $app } from '../constants/element';
import { controller } from '../main';

export const addClickEventListener = ({ selector, callback }: { selector: string; callback: () => void }) => {
  $app.querySelector(selector)?.addEventListener('click', callback);
};

export const addSubmitEventListener = ({ selector, callback }: { selector: string; callback: () => void }) => {
  $app.querySelector(selector)?.addEventListener('submit', async (e) => {
    e.preventDefault();
    try {
      controller.setLoading(true);
      await callback();
    } catch (err) {
      console.error(err);
    } finally {
      controller.setLoading(false);
    }
  });
};
