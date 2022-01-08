import React from 'react';
import { Link } from 'react-router-dom';
import { GrFormNext } from 'react-icons/gr';

interface IProps extends React.HTMLAttributes<HTMLDivElement> {
  text: string;
  tailwindTextSize?: string;
  nextPageURL: string;
  iconSize?: string;
  className?: string;
}

const NextPageButton: React.FC<IProps> = ({
  text,
  tailwindTextSize,
  nextPageURL,
  iconSize = '32',
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
        <GrFormNext size={iconSize} />
      </div>
    </Link>
  );
};

export default NextPageButton;
