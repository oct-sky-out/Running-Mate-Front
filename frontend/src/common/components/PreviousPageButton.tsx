import React from 'react';
import { GrFormPrevious } from 'react-icons/gr';

interface IProps extends React.HTMLAttributes<HTMLDivElement> {
  text: string;
  tailwindTextSize?: string;
  iconSizeClassName?: string;
  className?: string;
}

const PreviousPageButton: React.FC<IProps> = ({
  text,
  tailwindTextSize,
  iconSizeClassName = 'text-base',
  className,
  ...props
}) => {
  return (
    <div
      className={`flex justify-center items-center cursor-pointer ${
        className || null
      }`}
      {...props}
    >
      <GrFormPrevious className={iconSizeClassName} />
      <span className={tailwindTextSize}>{text}</span>
    </div>
  );
};

export default PreviousPageButton;
