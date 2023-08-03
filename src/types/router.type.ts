export interface Route {
  testRegExp: RegExp;
  callback: RouterCallback;
  params: any[];
}

export type RouterCallback = (param: { [key: string]: string }) => void;

export interface Router {
  addRoute?: (path: string, callback: RouterCallback) => Router;
  navigate?: (path: string) => Router;
  start?: () => Router;
}
