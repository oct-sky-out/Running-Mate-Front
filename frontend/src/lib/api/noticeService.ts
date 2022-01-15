import axios from './axios';
import { INotice } from '../../modules/types/notice';

type ViewNoticesSetUpType = {
  si: string;
  gu: string;
  dong: string;
  offset: string;
  limit: string;
};

interface INoticeService {
  createNotice(token: string, notice: INotice): void;
  viewChoiceNotices(setUp: ViewNoticesSetUpType): void;
  deleteNotice(noticeId: number, token: string): void;
}

class NoticeService implements INoticeService {
  createNotice = async (token: string, notice: INotice) => {
    try {
      console.log('notice = ', notice);
      console.log('token =', token);
      const boardId = await axios.post(
        '/run',
        {
          ...notice,
        },
        {
          headers: {
            'x-auth-token': token,
          },
        }
      );
      return boardId;
    } catch {
      return false;
    }
  };

  viewChoiceNotices = async (query: ViewNoticesSetUpType) => {
    try {
      const { data } = await axios.get(
        `/runs?si=${query.si}&gu=${query.gu}&dong=${query.dong}&offset=${query.offset}&limit=${query.limit}`
      );
      console.log(data);
      return data;
    } catch {
      return false;
    }
  };

  viewAllNotices = async () => {
    try {
      const { data } = await axios.get(`/runs?offset=0&limit=12`);
      console.log(data);
      return data;
    } catch {
      return false;
    }
  };

  deleteNotice = async (noticeId: number, token: string) => {
    try {
      const data = await axios.delete(`/run/${noticeId}`, {
        headers: {
          'x-auth-token': token,
        },
      });
      return true;
    } catch {
      return false;
    }
  };

  getNotice = async (noticeId: number, token: string) => {
    try {
      const { data } = await axios.get(`/run/${noticeId}`, {
        headers: {
          'x-auth-token': token,
        },
      });
      return data;
    } catch {
      return false;
    }
  };
}

export default NoticeService;
