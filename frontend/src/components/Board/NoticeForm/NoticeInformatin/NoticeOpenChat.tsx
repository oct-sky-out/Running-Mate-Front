import React from 'react';
import { useDispatch } from 'react-redux';
import { Input } from '@nextui-org/react';
import { FormElement } from '@nextui-org/react/esm/input/input-props';
import { useSelector } from '../../../../modules';
import { CreateNoticeActions } from '../../../../modules/createNotice';
import { noticeActions } from '../../../../modules/notice';

interface IProps {
  formType: 'edit' | 'new';
}

const NoticeOpenChat: React.FC<IProps> = ({ formType }) => {
  const dispatch = useDispatch();
  const { createOpenChat, editOpenChat } = useSelector((state) => ({
    createOpenChat: state.createNotice.openChat,
    editOpenChat: state.viewNotice.viewNoticeData.openChat,
  }));

  const onChangeOpenchat = (e: React.ChangeEvent<FormElement>) => {
    if (formType === 'new')
      dispatch(CreateNoticeActions.setOpenChat(e.target.value));
    if (formType === 'edit')
      dispatch(noticeActions.setOpenChat(e.target.value));
  };

  const getOpenChatValue = () =>
    formType === 'new' ? createOpenChat : editOpenChat;

  return (
    <div>
      <span className="mr-5 w-full font-bold">오픈 채팅 링크</span>
      <Input
        underlined
        bordered
        type="text"
        width="100%"
        placeholder="오픈 채팅 링크"
        color="secondary"
        onChange={onChangeOpenchat}
        value={getOpenChatValue()}
        style={{ fontSize: '1rem' }}
        data-testid="openChatLink-input"
      />
    </div>
  );
};

export default NoticeOpenChat;
