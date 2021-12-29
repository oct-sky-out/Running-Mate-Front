import React from 'react';
import { GrFormPrevious } from 'react-icons/gr';

interface IProps extends React.HTMLAttributes<HTMLDivElement> {
  text: string;
  tailwindTextSize?: string;
  iconSize: string;
  className?: string;
}

const PreviousPageButton: React.FC<IProps> = ({
  text,
  tailwindTextSize,
  iconSize = '32',
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
      <GrFormPrevious size={iconSize} />
      <span className={tailwindTextSize}>{text}</span>
    </div>
  );
};

export default PreviousPageButton;
