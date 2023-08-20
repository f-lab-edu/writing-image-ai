import GoHomeComponent from '../components/go-home';
import { $app } from '../constants/element';
import { type Component } from '../types/view.type';

const notFoundPage: Component = () => {
  // Do nothing or return a default HTMLElement, e.g., an empty div
  $app.innerHTML = `
    <div style="text-align: center">
      <h1>해당 페이지를 찾을 수 없습니다.</h1>
      ${GoHomeComponent()}
    </div>
  `;

  return $app;
};

export default notFoundPage;
