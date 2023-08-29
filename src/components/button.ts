interface ButtonParam {
  id?: string;
  text?: string;
  className?: string;
  style?: string;
  disabled?: boolean;
}

const Button = ({ id, text, className, style, disabled }: ButtonParam) => {
  const propertyId = id ? `id="${id}"` : '';
  const propertyClass = disabled ? '' : `class="${className ?? ''}"`;
  const propertystyle = style ? `style="${style}"` : '';

  return ` <button ${propertyId} ${propertyClass} ${propertystyle} ${disabled && 'disabled'}>${text ?? ''}</button>`;
};

export default Button;
