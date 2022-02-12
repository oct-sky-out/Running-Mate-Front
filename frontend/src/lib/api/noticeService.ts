import axios from './axios';
import {
  INotice,
  GetNoticesType,
  GetMyNoticeType,
} from '../../modules/types/notice';
import BoardData from '../../excuteData/BoardMock/BoardMock';

type ViewNoticesSetUpType = {
  dou: string;
  si: string;
  gu: string;
  offset: number;
  limit: number;
};

interface INoticeService {
  createNotice(token: string, notice: INotice): Promise<GetNoticesType>;
  viewChoiceNotices(setUp: ViewNoticesSetUpType): Promise<GetNoticesType[]>;
  viewAllNotices(offset: number, limit: number): Promise<GetNoticesType[]>;
  deleteNotice(noticeId: number, token: string): void;
  getMyNotices(
    userNickName: string,
    token: string,
    offset: number,
    limit: number
  ): Promise<GetMyNoticeType[]>;
}

class NoticeService implements INoticeService {
  createNotice = async (
    token: string,
    notice: INotice & { author: string }
  ) => {
    try {
      const { data } = await axios.post(
        '/boards',
        {
          ...notice,
          boardCategory: 'RUN',
        },
        {
          headers: {
            'x-auth-token': token,
          },
        }
      );
      return data;
    } catch (error) {
      throw new Error('게시판 생성 실패');
    }
  };

  viewChoiceNotices = async (query: ViewNoticesSetUpType) => {
    try {
      const { data } = await axios.get<GetNoticesType[]>(
        `/boards?dou=${query.dou}&si=${query.si}&gu=${query.gu}&offset=${query.offset}&limit=${query.limit}`
      );
      return data;
    } catch (error) {
      throw new Error('게시판 불러오기 실패');
    }
  };

  viewAllNotices = async (
    offset: number,
    limit: number
  ): Promise<GetNoticesType[]> => {
    try {
      const { data } = await axios.get<GetNoticesType[]>(
        `/boards?offset=${offset}&limit=${limit}`
      );
      return data;
    } catch (error) {
      throw new Error('게시판 불러오기 실패');
    }
  };

  deleteNotice = async (boardId: number, token: string) => {
    try {
      const data = await axios.delete(`/boards/${boardId}`, {
        headers: {
          'x-auth-token': token,
        },
      });
      return data;
    } catch {
      throw new Error('게시판 삭제 실패');
    }
  };

  editNotice = async (
    boardId: number,
    token: string,
    changedData: INotice & { author: string }
  ) => {
    try {
      const { data } = await axios.post<GetNoticesType>(
        `boards/${boardId}`,
        {
          ...changedData,
        },
        {
          headers: {
            'x-auth-token': token,
          },
        }
      );
      return data;
    } catch {
      throw new Error('수정에 실패하였습니다.');
    }
  };

  getNotice = async (boardId: string, token: string) => {
    try {
      const { data } = await axios.get<GetNoticesType>(`/boards/${boardId}`, {
        headers: {
          'x-auth-token': token,
        },
      });
      return data;
    } catch {
      throw new Error('게시판 불러오기 실패');
    }
  };

  setNoticeClosed = async (boardId: string, token: string) => {
    try {
      const { data } = await axios.patch(`/boards/${boardId}`, {
        headers: {
          'x-auth-token': token,
        },
      });
      return data;
    } catch {
      throw new Error('마감 변경 실패');
    }
  };

  getMyNotices = async (
    userNickName: string,
    token: string,
    offset: number,
    limit: number
  ) => {
    try {
      const { data } = await axios.get<GetMyNoticeType[]>(
        `/users/${userNickName}/boards?offset=${offset}&limit=${limit}`,
        {
          headers: {
            'x-auth-token': token,
          },
        }
      );
      return data;
    } catch {
      throw Error('내 작성글 조회 실패.');
    }
  };
}

export default NoticeService;
