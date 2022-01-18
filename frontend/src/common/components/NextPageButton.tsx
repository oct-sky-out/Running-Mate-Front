import React from 'react';
import { Link } from 'react-router-dom';
import { GrFormNext } from 'react-icons/gr';

interface IProps extends React.HTMLAttributes<HTMLDivElement> {
  text: string;
  tailwindTextSize?: string;
  iconSizeClassName?: string;
  nextPageURL: string;
  className?: string;
}

const NextPageButton: React.FC<IProps> = ({
  text,
  tailwindTextSize,
  iconSizeClassName,
  nextPageURL,
  className,
  ...props
}) => {
  return (
    <Link to={nextPageURL}>
      <div
        className={`w-32 flex justify-center items-center cursor-pointer ${
          className || null
        }`}
        {...props}
      >
        <span className={tailwindTextSize}>{text}</span>
        <GrFormNext className={iconSizeClassName} />
      </div>
    </Link>
  );
};

export default NextPageButton;
