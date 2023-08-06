import { $menu } from '../constants/element';
import { controller } from '../main';
import Button from './button';

const navigator = () => {
  const { images, storedImages } = controller.model.getState();

  const navItems = [
    { key: 'home', text: 'Home', disabled: false },
    { key: 'image', text: 'Image', disabled: !images?.length },
    { key: 'stored', text: 'Stored', disabled: !storedImages?.length },
  ];

  let innerNav = '';

  navItems.forEach((item) => {
    innerNav += Button({ id: `nav-${item.key}`, text: item.text, className: 'nav-itme', disabled: item.disabled });
  });

  $menu.innerHTML = `
    ${innerNav}
  `;

  navItems.forEach(
    (item) =>
      $menu.querySelector(`#nav-${item.key}`)?.addEventListener('click', () => {
        controller.render(`/${item.key === 'home' ? '' : item.key}`);
      })
  );

  return $menu;
};

export default navigator;
