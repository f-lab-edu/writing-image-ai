import router from "./router";
import modelFactory from "./model";
import { Controller } from "./types/contoller.type";
import { Image, State } from "./types/model.type";
import homePage from "./page/home.page";
import imagePage from "./page/image.page";

const model = modelFactory();

const events: Controller = {
  addImage: (image: Image) => {
    model.addImage(image);
    router.navigate("/image", model.getState(), events);
  },
  deleteImage: (image: Image) => {
    model.deleteImage(image);
  },
  updateImage: (image: Image) => {
    model.updateImage(image);
  },
};

// Add routes
router.addRoute("/", homePage);
router.addRoute("/image", imagePage);
// router.setNotFound(notFoundComponent);

// Navigate to a route
router.navigate(window.location.pathname, model.getState(), events);

model.addObserver(() => {
  const { pathname } = window.location;
  console.log("addObserver");
  router.navigate(pathname, model.getState(), events);
});

window.addEventListener("load", () => {
  window.addEventListener("popstate", (event) => {
    console.log("popstate");
    const path = window.location.pathname;
    const root: HTMLElement = document.querySelector<HTMLElement>("#root")!;
    router.navigate(path, event.state, events);
  });
});
