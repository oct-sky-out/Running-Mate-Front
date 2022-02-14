import { useDispatch } from 'react-redux';
import useSwalerts from '../../../../common/hooks/useSwalerts';
import CommentService from '../../../../lib/api/commentService';
import { useSelector } from '../../../../modules';
import { noticeActions } from '../../../../modules/notice';
import { CommentType } from '../../../../modules/types/commentType';

interface IProps {
  commentId: number;
  editCommentIndex: null | number;
  setEditCommentIndex: React.Dispatch<React.SetStateAction<null | number>>;
  commentList: CommentType[];
}

const CommentEditDeleteButton: React.FC<IProps> = ({
  commentId,
  editCommentIndex,
  setEditCommentIndex,
  commentList,
}) => {
  const token = useSelector((state) => state.signIn.token);
  const dispatch = useDispatch();
  const { successToast, errorToast } = useSwalerts();
  const editMyComment = () => {
    if (editCommentIndex) setEditCommentIndex(null);
    if (!editCommentIndex) setEditCommentIndex(commentId);
  };
  const deleteMyComment = async () => {
    try {
      await new CommentService().deleteComment(token, commentId);
      dispatch(
        noticeActions.setComments(
          commentList.filter((comment) => comment.id !== commentId)
        )
      );
      await successToast('댓글 삭제', '댓글이 삭제되었습니다!');
    } catch {
      await errorToast(
        '댓글 삭제 실패',
        '죄송합니다. 댓글 삭제에 실패하였습니다.'
      );
    }
  };
  return (
    <div className="flex-none flex divide-x">
      <div className="px-1 cursor-pointer" onClick={editMyComment}>
        <span>수정</span>
      </div>
      <div className="px-1 cursor-pointer" onClick={deleteMyComment}>
        <span>삭제</span>
      </div>
    </div>
  );
};

export default CommentEditDeleteButton;
