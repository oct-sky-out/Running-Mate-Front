import React from 'react';
import { BiTime } from 'react-icons/bi';
import remainDateParser from '../../common/functions/remainDateParser';

interface IProps {
  end: string;
}

const RemainDate: React.FC<IProps> = ({ end }) => {
  const remainDate = remainDateParser(+end);

  return (
    <span className="flex items-center ">
      <BiTime className="mr-1" />
      <span className="pb-0.5">{remainDate}</span>
    </span>
  );
};

export default RemainDate;
