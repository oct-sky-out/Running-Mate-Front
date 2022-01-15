import React from 'react';
import remainDateParser from '../../common/functions/remainDateParser';

interface IProps {
  end: string;
}

const RemainDate: React.FC<IProps> = ({ end }) => {
  const remainDate = remainDateParser(Date.parse(end));

  return (
    <span className="flex items-center ">
      <span className="pb-0.5">{remainDate}</span>
    </span>
  );
};

export default RemainDate;
