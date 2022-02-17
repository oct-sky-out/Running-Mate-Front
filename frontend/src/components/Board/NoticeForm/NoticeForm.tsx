import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Button } from '@nextui-org/react';
import NoticeTitle from './NoticeTitle';
import NoticeInformatin from './NoticeInformatin/NoticeInformatin';
import NoticeText from './NoticeText';
import useSwalerts from '../../../common/hooks/useSwalerts';
import { useSelector } from '../../../modules';
import NoticeService from '../../../lib/api/noticeService';
import { noticeActions } from '../../../modules/notice';
import useCheckNoticeData from './hook/useCheckNoticeData';

interface IProps {
  formType: 'edit' | 'new';
  id?: string;
}

const NoticeForm: React.FC<IProps> = ({ formType, id }) => {
  const history = useHistory();
  const {
    title,
    content,
    address,
    meetingTime,
    openChat,
    image,
    editedNotice,
    token,
    author,
  } = useSelector((state) => ({
    title: state.createNotice.title,
    content: state.createNotice.content,
    address: state.createNotice.address,
    meetingTime: state.createNotice.meetingTime,
    openChat: state.createNotice.openChat,
    image: state.createNotice.image,
    editedNotice: state.viewNotice.viewNoticeData,
    author: state.signIn.userData.nickName,
    token: state.signIn.token,
  }));
  const dispatch = useDispatch();
  const { successAlert, errorAlert } = useSwalerts();
  const checkNoticeData = useCheckNoticeData();
  const noticeService = new NoticeService();

  const createNotice = async () => {
    try {
      const boardId = await noticeService.createNotice(token, {
        title,
        content,
        address,
        meetingTime,
        openChat,
        image,
        author,
      });
      await successAlert('게시글이 저장', '게시글이 저장되었습니다.');
      history.push(`/boards/run/${boardId}`);
    } catch (error) {
      await errorAlert(
        '게시물 생성 실패',
        '게시물 생성에 실패하였습니다. 죄송합니다.😰'
      );
      history.push('/');
    }
  };

  const editNotice = async () => {
    try {
      await noticeService.editNotice(editedNotice.id, token, editedNotice);
      dispatch(noticeActions.setOneViewNotice(editedNotice));
      await successAlert(
        '수정 성공',
        '게시물을 성공적으로 변경하였습니다.',
        '확인'
      );
      history.push(`/boards/run/${id}`);
    } catch (error) {
      await errorAlert('수정 실패', '게시물을 변경을 실패하였습니다.😰');
      history.push(`/boards/run/${id}`);
    }
  };

  const checkData = () => {
    if (formType === 'new')
      return checkNoticeData({ address: address.si, content, openChat, title });
    if (formType === 'edit')
      return checkNoticeData({
        openChat: editedNotice.openChat,
        content: editedNotice.content,
        address: editedNotice.address.si,
        title: editedNotice.title,
      });
    return false;
  };

  const submitNotice = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (checkData()) {
      if (formType === 'new') await createNotice();
      if (formType === 'edit') await editNotice();
    }
  };

  return (
    <div className="mt-10">
      <div className="flex justify-center">
        <form className="w-2/3 " onSubmit={submitNotice}>
          <NoticeTitle formType={formType} />
          <NoticeInformatin
            formType={formType}
            initRegion={editedNotice.address}
          />
          <NoticeText formType={formType} />
          <div className="flex justify-end">
            <div className="w-3/12 flex flex-col mb-10">
              <Button
                auto
                color="#8b8bf5"
                type="submit"
                rounded
                data-testid="submit-button"
              >
                등록
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NoticeForm;
