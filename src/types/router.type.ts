export interface Route {
  testRegExp: RegExp;
  callback: RouterCallback;
  params: any[];
}

export type RouterCallback = (param: Record<string, string>) => void;

export interface Router {
  addRoute?: (path: string, callback: RouterCallback) => Router;
  render?: (path: string) => Router;
  start?: () => Router;
}
