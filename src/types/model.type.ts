export interface Image {
  id: string;
  image: string;
}

export interface State {
  images: Image[];
  scaleUpImages: string[];
  loading: boolean;
}
