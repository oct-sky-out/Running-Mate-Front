import Swal from 'sweetalert2';
import CommentService from '../../../../lib/api/commentService';
import { useSelector } from '../../../../modules';
import { CommentType } from '../../../../modules/types/commentType';

interface IProps {
  commentId: number;
  editCommentIndex: null | number;
  setEditCommentIndex: React.Dispatch<React.SetStateAction<null | number>>;
  setCommentList: React.Dispatch<React.SetStateAction<CommentType[]>>;
}

const CommentEditDeleteButton: React.FC<IProps> = ({
  commentId,
  editCommentIndex,
  setEditCommentIndex,
  setCommentList,
}) => {
  const token = useSelector((state) => state.signIn.token);
  const editMyComment = () => {
    if (editCommentIndex) setEditCommentIndex(null);
    if (!editCommentIndex) setEditCommentIndex(commentId);
  };
  const deleteMyComment = async () => {
    try {
      await new CommentService().deleteComment(token, commentId);
      setCommentList((commentList) =>
        commentList.filter((comment) => comment.id !== commentId)
      );
      await Swal.fire({
        toast: true,
        title: '댓글 삭제',
        text: '댓글이 삭제되었습니다!',
        icon: 'success',
        position: 'top-end',
        timer: 5000,
        timerProgressBar: true,
        showConfirmButton: false,
        showCloseButton: true,
      });
    } catch {
      await Swal.fire({
        toast: true,
        title: '댓글 삭제 실패',
        text: '죄송합니다. 댓글 삭제에 실패하였습니다.',
        icon: 'error',
        position: 'top-end',
        timer: 5000,
        timerProgressBar: true,
        showConfirmButton: false,
        showCloseButton: true,
      });
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
