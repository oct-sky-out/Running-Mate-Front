import { useHistory } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { v4 } from 'uuid';
import { Avatar } from '@nextui-org/react';
import * as url from '../../../../assets/default_profile.png';
import CommentEditDeleteButton from './CommentEditDeleteButton';
import { useSelector } from '../../../../modules';
import { noticeActions } from '../../../../modules/notice';
import CommentService from '../../../../lib/api/commentService';
import dateParser from '../../../../common/functions/dateParser';
import CommentEdit from './CommentEdit';
import useSwalerts from '../../../../common/hooks/useSwalerts';

interface IProps {
  boardId: string;
}

const ListComments: React.FC<IProps> = ({ boardId }) => {
  const history = useHistory();

  const { commentList, userNickName, token } = useSelector((state) => ({
    commentList: state.viewNotice.comments,
    userNickName: state.signIn.userData.nickName,
    token: state.signIn.token,
  }));
  const dispatch = useDispatch();
  const { errorToast } = useSwalerts();

  const [editCommentIndex, setEditCommentIndex] = useState<null | number>(null);
  const goCommenterUserDetail = (author: string) =>
    history.push(`/user/${author}`);

  useEffect(() => {
    new CommentService()
      .getComments(token, boardId)
      .then((comments) => dispatch(noticeActions.setComments(comments)))
      .catch(() => {
        errorToast('댓글 불러오기 실패', '댓글을 불러오는데 실패하였습니다.');
      });
  }, [boardId]);

  return (
    <ul>
      {commentList.map((comment) => {
        return (
          <li className="border-purple border-b my-3 space-y-4 p-3" key={v4()}>
            <div className="flex items-center">
              <div className="mr-2 float-left">
                <Avatar
                  src={url.default}
                  onClick={() => goCommenterUserDetail(comment.author)}
                />
              </div>
              <div>
                <span
                  className="w-32 font-bold mr-4 block cursor-pointer"
                  onClick={() => goCommenterUserDetail(comment.author)}
                >
                  {comment.author}
                </span>
                <span className="text-gray-400 block pointer-events-none">
                  {dateParser(new Date(comment.regDate))}
                </span>
              </div>
              {userNickName === comment.author && (
                <CommentEditDeleteButton
                  commentId={comment.id}
                  editCommentIndex={editCommentIndex}
                  setEditCommentIndex={setEditCommentIndex}
                  commentList={commentList}
                />
              )}
            </div>
            {editCommentIndex === comment.id &&
            userNickName === comment.author ? (
              <CommentEdit
                commentId={comment.id}
                content={comment.content}
                setEditCommentIndex={setEditCommentIndex}
                commentList={commentList}
              />
            ) : (
              <p className="text-lg pb-4">{comment.content}</p>
            )}
          </li>
        );
      })}
    </ul>
  );
};

export default ListComments;
