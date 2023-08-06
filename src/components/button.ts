interface ButtonParam {
  id?: string;
  text?: string;
  className?: string;
  style?: string;
  disabled?: boolean;
  type?: string;
}

const Button = ({ id, text, className, style, disabled, type = 'button' }: ButtonParam) => {
  const propertyId = id ? `id="${id}"` : '';
  const propertyClass = `class="${className ?? ''}"`;
  const propertystyle = style ? `style="${style}"` : '';

  return ` <button type="${type}" ${propertyId} ${propertyClass} ${propertystyle} ${disabled && 'disabled'}>${text ?? ''}</button>`;
};

export default Button;
