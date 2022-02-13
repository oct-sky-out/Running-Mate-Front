import { useHistory } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { v4 } from 'uuid';
import { Avatar } from '@nextui-org/react';
import * as url from '../../../../assets/default_profile.png';
import CommentEditDeleteButton from './CommentEditDeleteButton';
import { useSelector } from '../../../../modules';
import CommentService from '../../../../lib/api/commentService';
import { CommentType } from '../../../../modules/types/commentType';
import dateParser from '../../../../common/functions/dateParser';
import CommentEdit from './CommentEdit';

interface IProps {
  boardId: string;
}

const ListComments: React.FC<IProps> = ({ boardId }) => {
  const history = useHistory();

  const { userNickName, token } = useSelector((state) => ({
    userNickName: state.signIn.userData.nickName,
    token: state.signIn.token,
  }));

  const [editCommentIndex, setEditCommentIndex] = useState<null | number>(null);
  const [commentList, setCommentList] = useState<CommentType[]>([]);
  const goCommenterUserDetail = (author: string) =>
    history.push(`/user/${author}`);

  useEffect(() => {
    new CommentService()
      .getComments(token, boardId)
      .then((comments) => setCommentList(comments));
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
                  setCommentList={setCommentList}
                />
              )}
            </div>
            {editCommentIndex === comment.id &&
            userNickName === comment.author ? (
              <CommentEdit
                commentId={comment.id}
                content={comment.content}
                setEditCommentIndex={setEditCommentIndex}
                setCommentList={setCommentList}
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
