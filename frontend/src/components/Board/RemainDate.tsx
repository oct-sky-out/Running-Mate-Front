import React from 'react';
import remainDateParser from '../../common/functions/remainDateParser';

interface IProps {
  end: string;
  setFinished: React.Dispatch<React.SetStateAction<boolean>>;
}

const RemainDate: React.FC<IProps> = ({ end, setFinished }) => {
  const remainDate = remainDateParser(Date.parse(end));

  if (remainDate === '기간만료') {
    setFinished(true);
  }
  return (
    <span className="flex items-center ">
      <span className="pb-0.5">{remainDate}</span>
    </span>
  );
};

export default RemainDate;
