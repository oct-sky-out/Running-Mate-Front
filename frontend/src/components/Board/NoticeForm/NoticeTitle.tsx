import { Input } from '@nextui-org/react';
import { FormElement } from '@nextui-org/react/esm/input/input-props';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from '../../../modules';
import { CreateNoticeActions } from '../../../modules/createNotice';
import { noticeActions } from '../../../modules/notice';

interface IProps {
  formType: 'edit' | 'new';
}

const NoticeTitle: React.FC<IProps> = ({ formType }) => {
  const { title, editTitle } = useSelector((state) => ({
    title: state.createNotice.title,
    editTitle: state.viewNotice.viewNoticeData.title,
  }));
  const dispatch = useDispatch();
  const onChangeTitle = (e: React.ChangeEvent<FormElement>) => {
    if (formType === 'new')
      dispatch(CreateNoticeActions.setTitle(e.currentTarget.value));
    if (formType === 'edit')
      dispatch(noticeActions.setTitle(e.currentTarget.value));
  };
  const getTitle = () => (formType === 'new' ? title : editTitle);

  return (
    <div className="mb-5">
      <Input
        underlined
        bordered
        type="text"
        placeholder="제목을 입력하세요"
        color="secondary"
        width="100%"
        size="xlarge"
        onChange={onChangeTitle}
        value={getTitle()}
        data-testid="title-input"
        className="text-2xl"
      />
    </div>
  );
};

export default NoticeTitle;
