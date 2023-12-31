import { type Image } from './model.type';

export interface Controller {
  addImage: (image: Image) => void;
  deleteImage: (image: Image) => void;
}

export type AddController = (targetElement: HTMLElement, events: Controller) => void;
