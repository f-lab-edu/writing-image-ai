import router from './router';
import homePage from './page/home.page';
import imagePage from './page/image.page';
import { eventContext } from './contexts';
import { $loading } from './constants/element';

router.addRoute('/', homePage);
router.addRoute('/image', imagePage);

eventContext.registerImageObserver(() => {
  const { pathname } = window.location;
  router.navigate(pathname);
});

eventContext.registerLoadingObserver((loading: boolean) => {
  if (loading) {
    $loading.style.display = 'flex';
  } else {
    $loading.style.display = 'none';
  }
});

window.addEventListener('load', () => {
  window.addEventListener('popstate', () => {
    console.log('popstate');
    const path = window.location.pathname;
    router.navigate(path);
  });
});

router.navigate(window.location.pathname);
