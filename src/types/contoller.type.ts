import { Image, State } from './model.type';

export interface Controller {
  addImage: (image: Image) => void;
  deleteImage: (image: Image) => void;
  updateImage: (image: Image) => void;
}

export type AddController = (targetElement: HTMLElement, events: Controller) => void;
