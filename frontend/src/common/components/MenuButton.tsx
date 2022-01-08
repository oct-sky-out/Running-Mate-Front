import React from 'react';

type ButtonType = JSX.IntrinsicElements['button']['type'];

interface IProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  type?: ButtonType;
  className?: string;
}

const MenuButton: React.FC<IProps> = ({
  children,
  className,
  type,
  ...props
}) => {
  const buttonType = type;
  return (
    <button
      type={buttonType}
      className={`border-b-4 border-transparent hover:border-purple hover:border-solid ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default MenuButton;
