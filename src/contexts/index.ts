import modelFactory from '../model';
import { Image } from '../types/model.type';

export const modelContext = modelFactory();

export const eventContext = {
  setImages: (images: Image[]) => {
    modelContext.setImages(images);
  },
  addImage: (image: Image) => {
    modelContext.addImage(image);
  },
  deleteImage: (image: Image) => {
    modelContext.deleteImage(image);
  },
  updateImage: (image: Image) => {
    modelContext.updateImage(image);
  },
};
