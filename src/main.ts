import router from './router';
import homePage from './page/home.page';
import imagePage from './page/image.page';
import { modelContext } from './contexts';

router.addRoute('/', homePage);
router.addRoute('/image', imagePage);

modelContext.addObserver(() => {
  const { pathname } = window.location;
  console.log('addObserver');
  router.navigate(pathname);
});

window.addEventListener('load', () => {
  window.addEventListener('popstate', () => {
    console.log('popstate');
    const path = window.location.pathname;
    router.navigate(path);
  });
});

router.navigate(window.location.pathname);
