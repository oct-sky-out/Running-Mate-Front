import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button } from '@nextui-org/react';
import DatePicker from 'react-datepicker';
import { CreateNoticeActions } from '../../../../modules/createNotice';
import { noticeActions } from '../../../../modules/notice';
import 'react-datepicker/dist/react-datepicker.css';

interface IProps {
  formType: 'edit' | 'new';
}

const NoticeEndTime: React.FC<IProps> = ({ formType }) => {
  const dispatch = useDispatch();
  const enoughDeadLine = new Date();
  enoughDeadLine.setDate(enoughDeadLine.getDate() + 3);
  const [seletedDate, setSelectedDate] = useState(enoughDeadLine);
  const [timeOnOff, setTimeOnOff] = useState(true);

  const onChangeDatePickderState = (date: Date) => {
    const dateString = date ? date.toString() : new Date().toString();
    setSelectedDate(date || new Date());
    if (formType === 'new')
      dispatch(CreateNoticeActions.setMeetingTime(dateString));
    if (formType === 'edit') dispatch(noticeActions.setMeetingTime(dateString));
  };

  const onClickTimeSet = () => {
    if (timeOnOff) {
      if (formType === 'new')
        dispatch(CreateNoticeActions.setMeetingTime(enoughDeadLine.toString()));
      if (formType === 'edit')
        dispatch(noticeActions.setMeetingTime(enoughDeadLine.toString()));
      setTimeOnOff(false);
    }
    if (!timeOnOff) {
      if (formType === 'new') dispatch(CreateNoticeActions.setMeetingTime(''));
      if (formType === 'edit') dispatch(noticeActions.setMeetingTime(''));
      setTimeOnOff(true);
    }
  };

  return (
    <div>
      <div className="flex flex-col w-full space-y-3">
        <span className="whitespace-nowrap mr-5 font-bold inline-block">
          모집 마감 시간
        </span>
        <div className="flex flex-col sm:flex-row justify-around items-center space-y-3 sm:space-y-0">
          <div
            className={`w-full sm:w-1/2 py-1 ${
              !timeOnOff && 'pl-4'
            } rounded border-solid border-2 border-indigo-400 flex justify-center`}
          >
            {timeOnOff ? (
              <span>마감 제한 없음</span>
            ) : (
              <DatePicker
                className="w-full"
                selected={seletedDate}
                onChange={onChangeDatePickderState}
                timeInputLabel="Time:"
                dateFormat="yyyy/MM/dd hh:mm aa"
                showTimeInput
              />
            )}
          </div>
          <div className="mr-2">
            <Button type="button" color="#8b8bf5" onClick={onClickTimeSet}>
              {timeOnOff ? '마감 제한 설정하기' : '마감 제한 없애기'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoticeEndTime;
