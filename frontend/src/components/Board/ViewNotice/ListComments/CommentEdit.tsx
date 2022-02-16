import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button } from '@nextui-org/react';
import CommentService from '../../../../lib/api/commentService';
import { useSelector } from '../../../../modules';
import { noticeActions } from '../../../../modules/notice';
import { CommentType } from '../../../../modules/types/commentType';
import useSwalerts from '../../../../common/hooks/useSwalerts';

interface IProps {
  commentId: number;
  content: string;
  setEditCommentIndex: React.Dispatch<React.SetStateAction<number | null>>;
  commentList: CommentType[];
}

const CommentEdit: React.FC<IProps> = ({
  commentId,
  content,
  setEditCommentIndex,
  commentList,
}) => {
  const token = useSelector((state) => state.signIn.token);
  const dispatch = useDispatch();

  const [editedComment, setEditedComment] = useState<string>(content);

  const { successToast, errorToast } = useSwalerts();

  const changeComment = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEditedComment(e.target.value);
  };

  const editMyComment = async () => {
    try {
      await new CommentService().editComment(token, commentId, editedComment);
      setEditCommentIndex(null);
      dispatch(
        noticeActions.setComments([
          ...commentList.map((comment) => {
            if (comment.id === commentId) {
              return { ...comment, content: editedComment };
            }
            return comment;
          }),
        ])
      );
      await successToast('댓글 변경', '댓글이 변경되었습니다!');
    } catch {
      await errorToast(
        '댓글 변경실패',
        '죄송합니다. 댓글 변경에 실패하였습니다.😰'
      );
    }
  };

  return (
    <div className="flex flex-col space-y-2">
      <textarea
        cols={10}
        rows={5}
        className="w-full border border-purple rounded-lg resize-none"
        value={editedComment}
        onChange={changeComment}
      />
      <div className="flex justify-end">
        <div className="w-30">
          <Button auto color="#8b8bf5" onClick={editMyComment}>
            수정하기
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CommentEdit;
