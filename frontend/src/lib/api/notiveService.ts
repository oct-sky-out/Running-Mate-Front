import axios from './axios';
import { INotice } from '../../modules/types/createNotice';

// type viewNoticesSetUpType = {
//   region1: string;
//   region2: string;
//   region3: string;
//   offset: string;
//   limit: string;
// };

interface INoticeService {
  createNotice(token: string, notice: INotice): void;
  // viewNotices(setUp: viewNoticesSetUpType): void;
}

class NoticeService implements INoticeService {
  createNotice = async (token: string, notice: INotice) => {
    try {
      console.log('notice = ', notice);
      console.log('token =', token);
      const boardId = await axios.post(
        '/run',
        { notice },
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

  // viewNotices = async (setUp: viewNoticesSetUpType) => {
  //   try {
  //     const notices = await axios.get(
  //       `/runs?region1=${setUp.region1}&region2=${setUp.region2}&offset=${setUp.offset}&limit=${setUp.limit}`
  //     );
  //     return notices;
  //   } catch {}
  // };
}

export default NoticeService;
