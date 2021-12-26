import React from 'react';
import { Link, withRouter, RouteComponentProps } from 'react-router-dom';
import { IoAccessibilityOutline } from 'react-icons/io5';
import RemainDate from './RemainDate';

interface IProps {
  data: {
    imageUrl: string;
    title: string;
    number: string;
    end: string;
    writer: string;
    noticeId: string;
  };
}

const Board: React.FC<IProps & RouteComponentProps> = ({ data }) => {
  const { imageUrl, title, number, end, writer, noticeId } = data;

  return (
    <div className="w-60 h-80 shadow-2xl transition ease-in-out duration-300 transform hover:scale-105 mx-3 rounded-2xl bg-white border-2">
      <Link to={`/notice/${noticeId}`}>
        <div className="h-2/4 border-b-2 rounded-t-2xl flex-grow">
          <img
            src={imageUrl}
            alt="img"
            className="w-full rounded-t-2xl h-full object-cover"
          />
        </div>
        <div className="h-2/4 flex flex-col justify-around">
          <div className="p-3">
            <span className="block text-sm">{writer}</span>
            <span className="block font-bold truncate" title={title}>
              {title}
            </span>
          </div>
          <div className="flex justify-around">
            <span className="flex justify-start items-center font-bold">
              <IoAccessibilityOutline className="mr-1" />
              {number}
            </span>
            <RemainDate end={end} />
          </div>
        </div>
      </Link>
    </div>
  );
};

export default withRouter(Board);
