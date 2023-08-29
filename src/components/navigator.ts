import { $menu } from '../constants/element';
import { controller } from '../main';
import Button from './button';

const navigator = () => {
  const { images, storedImages } = controller.getState();

  const navItems = [
    { key: 'home', text: 'Home', disabled: false },
    { key: 'image', text: 'Image', disabled: !images?.length },
    { key: 'stored', text: 'Stored', disabled: !storedImages?.length },
  ];

  let innerNav = '';

  navItems.forEach(({ key, text, disabled }) => {
    innerNav += Button({ id: `nav-${key}`, text, className: 'nav-itme', disabled });
  });

  $menu.innerHTML = `
    ${innerNav}
  `;

  navItems.forEach(
    ({ key }) =>
      $menu.querySelector(`#nav-${key}`)?.addEventListener('click', () => {
        controller.render(`/${key === 'home' ? '' : key}`);
      })
  );

  return $menu;
};

export default navigator;
