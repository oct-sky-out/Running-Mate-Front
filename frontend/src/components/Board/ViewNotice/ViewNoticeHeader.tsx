import { Link, useHistory } from 'react-router-dom';
import { Avatar } from '@nextui-org/react';
import { useSelector } from '../../../modules';
import * as defaultProfile from '../../../assets/default_profile.png';
import dateParser from '../../../common/functions/dateParser';
import useSwalerts from '../../../common/hooks/useSwalerts';
import useImageDelete from '../../../common/hooks/useImageDelete';
import NoticeService from '../../../lib/api/noticeService';

const ViewNoticeHeader = () => {
  const history = useHistory();

  const { count, id, image, regDate, title, author, token, nickName } =
    useSelector((state) => ({
      count: state.viewNotice.viewNoticeData.count,
      id: state.viewNotice.viewNoticeData.id,
      image: state.viewNotice.viewNoticeData.image,
      regDate: state.viewNotice.viewNoticeData.regDate,
      title: state.viewNotice.viewNoticeData.title,
      author: state.viewNotice.viewNoticeData.author,
      token: state.signIn.token,
      nickName: state.signIn.userData.nickName,
    }));

  const imageDelete = useImageDelete();
  const { customAlert, successToast, errorAlert } = useSwalerts();

  const deleteNotice = async () => {
    try {
      const swalResult = await customAlert({
        title: '게시물 삭제',
        text: '게시물을 삭제하시겠습니까?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: '삭제하기',
      });
      if (swalResult.isConfirmed) {
        await new NoticeService().deleteNotice(id, token);
        const imageURLArr = image.split('/');
        const fileName = `${imageURLArr[imageURLArr.length - 2]}/${
          imageURLArr[imageURLArr.length - 1]
        }`;
        imageDelete(fileName);
        successToast('삭제 성공', '게시물을 성공적으로 삭제하였습니다.');
        history.push('/');
      }
    } catch {
      errorAlert(
        '게시물 삭제 실패',
        '게시물 삭제에 실패하였습니다. 다시 시도해주세요.😰'
      );
    }
  };

  return (
    <div className="flex flex-col mb-20 pb-5 border-b-2 px-4 sm:px-0">
      <h1 className="text-xl md:text-4xl mb-10 font-bold text-center">
        {title}
      </h1>
      <div className="flex items-center justify-between mb-4">
        <div className="w-32 flex justify-start items-center cursor-pointer">
          <Avatar
            size="small"
            src={defaultProfile.default}
            className="border-2 rounded-full border-purple cursor-pointer w-6 h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 ml-3"
          />
          <span className="ml-2 font-bold">
            <Link to={`/user/${author}`}>{author}</Link>
          </span>
        </div>
        <span className="align-bottom mr-3 text-gray-500">
          {dateParser(new Date(regDate)).split(' ')[0]}
        </span>
      </div>
      <div className="text-right mr-4 flex justify-between ml-2">
        <div>
          <span>조회수 {count}</span>
        </div>
        <div>
          {author === nickName && (
            <>
              <Link to={`/boards/edit/run/${id}`}>
                <button
                  type="button"
                  className="cursor-pointer mr-5 hover:font-bold"
                >
                  수정
                </button>
              </Link>
              <button
                type="button"
                className="cursor-pointer"
                onClick={deleteNotice}
              >
                삭제
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewNoticeHeader;
