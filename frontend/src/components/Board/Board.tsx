import React from 'react';
import { Link, withRouter, RouteComponentProps } from 'react-router-dom';
import { BiTime } from 'react-icons/bi';
import RemainDate from './RemainDate';
import { GetNoticesType } from '../../modules/types/notice';
import { ReactComponent as Logo } from '../../assets/logo_mini.svg';

interface IProps {
  data: GetNoticesType;
}

const Board: React.FC<IProps & RouteComponentProps> = ({ data }) => {
  const {
    address,
    closed,
    content,
    count,
    id,
    image,
    meetingTime,
    openChat,
    regDate,
    title,
  } = data;

  return (
    <div className="w-60 h-80 shadow-2xl transition ease-in-out duration-300 transform hover:scale-105 mx-auto my-0 rounded-2xl bg-white border-2">
      <Link to={`/notice/${id}`}>
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
        <div className="h-2/4 flex flex-col justify-around bg-indigo-100 rounded-b-xl">
          <div className="px-2">
            <span className="block text-sm mb-2">작성자</span>
            <span className="block font-bold truncate" title={title || ''}>
              {title || '제목없음'}
            </span>
          </div>
          <div>
            <div className="flex justify-center mb-2">
              <span className="text-sm font-bold">
                {address &&
                  address.si.concat(' ', address.gu, ' ', address.dong)}
              </span>
            </div>
            <div className="flex justify-around">
              <div className="flex items-center">
                <BiTime className="mr-1" />
                {closed ? (
                  '마감 완료'
                ) : (
                  <span className="flex justify-start items-center">
                    남은 모집 시간
                  </span>
                )}
              </div>
              {!closed && (
                <RemainDate end={meetingTime || new Date().toString()} />
              )}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default withRouter(Board);
