import React, { useState } from 'react';
import { Link, withRouter, RouteComponentProps } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { BiTime } from 'react-icons/bi';
import { FaRegEye } from 'react-icons/fa';
import RemainDate from './RemainDate';
import { GetNoticesType } from '../../modules/types/notice';
import { ReactComponent as Logo } from '../../assets/logo_mini.svg';
import { noticeActions } from '../../modules/notice';

interface IProps {
  data: GetNoticesType;
}

const Board: React.FC<IProps & RouteComponentProps> = ({ data }) => {
  const dispatch = useDispatch();

  const [finished, setFinished] = useState(false);

  const { address, closed, count, id, image, meetingTime, title } = data;

  const dispatchViewNoticeData = () => {
    dispatch(noticeActions.setInitViewNoticeData());
  };
  return (
    <Link to={{ pathname: `/boards/run/${id}`, state: { data } }}>
      <div
        className={`relation w-60 h-80 shadow-2xl transition ease-in-out duration-300 transform hover:scale-105 mx-auto my-0 rounded-2xl bg-white border-2 ${
          finished && 'opacity-70'
        }`}
        onClick={dispatchViewNoticeData}
      >
        <div className="h-2/4 border-b-2 rounded-t-xl flex-grow bg-indigo-200">
          {image ? (
            <img
              src={image}
              alt="img"
              className="w-full rounded-t-2xl h-full object-cover"
            />
          ) : (
            <Logo className="w-full h-full" />
          )}
        </div>
        <div
          className={`h-2/4 flex flex-col justify-around bg-indigo-100 rounded-b-xl ${
            finished && 'opacity-70'
          }`}
        >
          <div className="px-2">
            <span className="block text-sm mb-2">작성자</span>
            <span className="block font-bold truncate" title={title || ''}>
              {title || '제목없음'}
            </span>
          </div>
          <div>
            <div className="flex justify-center mb-2">
              <span className="text-sm font-bold">
                {address && address.si.concat(' ', address.si, ' ', address.gu)}
              </span>
            </div>
            <div className="flex items-center justify-around text-gray-600">
              <div className="flex items-center">
                <FaRegEye className="mr-1" />
                <span className="pb-1">{count}</span>
              </div>
              <div className="flex items-center">
                <BiTime className="mr-1" />
                {!closed && (
                  <RemainDate
                    end={meetingTime || new Date().toString()}
                    setFinished={setFinished}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default withRouter(Board);
