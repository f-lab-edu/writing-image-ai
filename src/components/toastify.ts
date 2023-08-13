import Toastify from 'toastify-js';

const showToast = (text: string, background: string) => {
  Toastify({
    text,
    duration: 3000,
    style: {
      background,
    },
  }).showToast();
};

export const successToastify = (text: string) => {
  showToast(text, 'linear-gradient(to right, rgb(219 234 254), rgb(37 99 235))');
};

export const failToastify = (text: string) => {
  showToast(text, 'linear-gradient(to right, rgb(254 226 226), rgb(239 68 68))');
};
