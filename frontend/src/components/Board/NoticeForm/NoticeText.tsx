import ReactQuill from 'react-quill';
import { useDispatch } from 'react-redux';
import { useSelector } from '../../../modules';
import { CreateNoticeActions } from '../../../modules/createNotice';
import { noticeActions } from '../../../modules/notice';
import 'react-quill/dist/quill.snow.css';

interface IProps {
  formType: 'edit' | 'new';
}

const NoticeText: React.FC<IProps> = ({ formType }) => {
  const dispatch = useDispatch();
  const { content, editContent } = useSelector((state) => ({
    content: state.createNotice.content,
    editContent: state.viewNotice.viewNoticeData.content,
  }));

  const changeContent = (writedcontent: string) => {
    if (formType === 'new')
      dispatch(CreateNoticeActions.setContent(writedcontent));
    if (formType === 'edit') dispatch(noticeActions.setContent(writedcontent));
  };
  const getContentValue = () => (formType === 'new' ? content : editContent);

  return (
    <div className="mb-20 md:mb-16">
      <ReactQuill
        theme="snow"
        defaultValue={getContentValue()}
        onChange={changeContent}
        style={{ height: '300px' }}
        data-testid="explain-input"
        placeholder="공지 설명글을 작성해주세요 : )"
      />
    </div>
  );
};

export default NoticeText;
