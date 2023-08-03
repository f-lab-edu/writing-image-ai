export interface Image {
  id: string;
  image: string;
}

export interface State {
  images: Image[];
  loading: boolean;
}
