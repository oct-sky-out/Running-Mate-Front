import React, { useState } from 'react';
import { Button } from '@nextui-org/react';
import Swal from 'sweetalert2';
import { useSelector } from '../../../../modules';
import axios from '../../../../lib/api/axios';
import { CommentType } from '../../../../modules/types/commentType';
import CommentService from '../../../../lib/api/commentService';

interface IProps {
  boardId: string;
}

const WriteComment: React.FC<IProps> = ({ boardId }) => {
  const token = useSelector((state) => state.signIn.token);
  const [comment, setComment] = useState('');

  const changeComment = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
  };

  const registComment = async () => {
    try {
      if (comment === '') {
        Swal.fire({
          toast: true,
          title: '댓글을 입력해주세요.',
          text: '댓글이 비어있습니다. 댓글을 입력 후 등록해주세요.',
          icon: 'info',
          position: 'top-end',
          timer: 5000,
          timerProgressBar: true,
          showConfirmButton: false,
          showCloseButton: true,
        });
        return;
      }
      await new CommentService().registComment(token, comment, boardId);
      Swal.fire({
        toast: true,
        title: '댓글등록 성공.',
        text: '댓글등록에 성공하였습니다.',
        icon: 'success',
        position: 'top-end',
        timer: 5000,
        timerProgressBar: true,
        showConfirmButton: false,
        showCloseButton: true,
      });
    } catch {
      Swal.fire({
        toast: true,
        title: '댓글등록 실패.',
        text: '댓글등록에 실패하였습니다.',
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
    <div className="my-20 px-3 md:px-0 space-y-5 w-full">
      <div className="text-2xl md:text-3xl font-bold">
        <span>댓글 {1}개</span>
      </div>
      <div className="w-full">
        <textarea
          className="block w-full border-2 border-purple rounded-xl p-2 text-xl resize-none	"
          name="comment"
          cols={10}
          rows={5}
          value={comment}
          onChange={changeComment}
        />
      </div>
      <div className="text-2xl md:text-3xl font-bold flex justify-end">
        <div className="w-36 md:w-48 flex flex-col">
          <Button auto color="#8b8bf5" onClick={registComment}>
            <span className="text-base md:text-lg">등록</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default WriteComment;
