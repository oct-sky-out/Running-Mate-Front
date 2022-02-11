import axios from './axios';

interface ICommentService {
  // return type은 API 테스트 후 정할 것임
  registComment(token: string, content: string, boardId: string): void;
  getComments(token: string, boardId: string): void;
  editComment(token: string, commentId: number, content: string): void;
  deleteComment(token: string, commentId: number): void;
}

class commentService implements ICommentService {
  registComment = async (token: string, content: string, boardId: string) => {
    try {
      const { data } = await axios.post(
        `/boards/${boardId}/comments`,
        { content },
        {
          headers: { 'x-auth-token': token },
        }
      );
    } catch (error) {
      throw new Error('댓글 생성 실패');
    }
  };
  getComments = async (token: string, boardId: string) => {
    try {
      const { data } = await axios.get(`/boards/${boardId}/comments`, {
        headers: { 'x-auth-token': token },
      });
      return data;
    } catch {
      throw new Error('댓글 불러오기 실패');
    }
  };
  editComment = async (token: string, commentId: number, content: string) => {
    try {
      const { data } = await axios.post(
        `/boards/comments/${commentId}`,
        { content },
        { headers: { 'x-auth-token': token } }
      );
      return data;
    } catch {
      throw new Error('댓글 수정 실패');
    }
  };
  deleteComment = async (token: string, commentId: number) => {
    try {
      const { data } = await axios.delete(`/boards/comments/${commentId}`, {
        headers: { 'x-auth-token': token },
      });
      return data;
    } catch {
      throw new Error('댓글 삭제 실패');
    }
  };
}
