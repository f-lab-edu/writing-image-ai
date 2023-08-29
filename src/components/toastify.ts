import Toastify from 'toastify-js';

export const successToastify = (text: string) => {
  Toastify({
    text,
    duration: 3000,
    style: {
      background: 'linear-gradient(to right, rgb(219 234 254), rgb(37 99 235))',
    },
  }).showToast();
};

export const failToastify = (text: string) => {
  Toastify({
    text,
    duration: 3000,
    style: {
      background: 'linear-gradient(to right, rgb(254 226 226), rgb(239 68 68))',
    },
  }).showToast();
};
