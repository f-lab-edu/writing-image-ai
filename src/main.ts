import router from './router';
import modelFactory from './model';
import { type Controller } from './types/contoller.type';
import { type Image } from './types/model.type';
import homePage from './page/home.page';
import imagePage from './page/image.page';

const model = modelFactory();

const events: Controller = {
  addImage: (image: Image) => {
    model.addImage(image);
    router.navigate('/image', model.getState(), events);
  },
  deleteImage: (image: Image) => {
    model.deleteImage(image);
  },
  updateImage: (image: Image) => {
    model.updateImage(image);
  },
};

// Add routes
router.addRoute('/', homePage);
router.addRoute('/image', imagePage);
// router.setNotFound(notFoundComponent);

// Navigate to a route
router.navigate(window.location.pathname, model.getState(), events);

model.addObserver(() => {
  const { pathname } = window.location;
  router.navigate(pathname, model.getState(), events);
});

window.addEventListener('load', () => {
  window.addEventListener('popstate', (event) => {
    const path = window.location.pathname;
    router.navigate(path, event.state, events);
  });
});
