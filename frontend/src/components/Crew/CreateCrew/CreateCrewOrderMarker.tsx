import React from 'react';
import { v4 } from 'uuid';
import useCreateCrew from './hooks/useCreateCrew';

interface IProps {
  questionOrder: number;
}

const CreateCrewOrderMarker: React.FC<IProps> = ({ questionOrder }) => {
  //* any variables
  const orders: string[] = ['이름', '지역', '소개', '채팅방'];
  const { QUESTION_COUNT } = useCreateCrew();

  return (
    <div className="w-11/12 md:w-full flex items-center justify-center mb-20 text-xs">
      {orders.map((order, index) => {
        return (
          <React.Fragment key={v4()}>
            <div
              className={`w-12 h-11 md:w-16 md:h-14 lg:w-20 lg:h-20 rounded-full flex items-center justify-center ${
                index > questionOrder
                  ? 'transition ease-in-out delay-150 bg-gray-300'
                  : 'transition ease-in-out delay-150 bg-purple-400'
              }`}
            >
              <span className="text-gray-600">{order}</span>
            </div>
            <div
              className={`w-10 md:w-20 h-1 ${
                index > questionOrder
                  ? 'transition ease-in-out delay-150 duration-200 bg-gray-300'
                  : 'transition ease-in-out delay-200 duration-200 bg-purple-400'
              }`}
            />
          </React.Fragment>
        );
      })}
      <div
        className={`w-12 h-11 md:w-16 md:h-14 lg:w-20 lg:h-20 text-gray-600 rounded-full flex items-center justify-center ${
          questionOrder !== QUESTION_COUNT
            ? 'transition ease-in-out delay-150 bg-gray-300'
            : 'transition ease-in-out delay-150 bg-purple-400'
        }`}
      >
        완료
      </div>
    </div>
  );
};

export default React.memo(CreateCrewOrderMarker);
