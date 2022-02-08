import React, { useEffect, useRef } from 'react';
import {
  useHistory,
  withRouter,
  RouteComponentProps,
  Link,
} from 'react-router-dom';
import Swal from 'sweetalert2';
import { useDispatch } from 'react-redux';
import { BiUser } from 'react-icons/bi';
import { noticeActions } from '../../../modules/notice';
import DetailBaseBorder from '../../../common/components/DetailBaseBorder';
import dateParser from '../../../common/functions/dateParser';
import PreviousPageButton from '../../../common/components/PreviousPageButton';
import { useSelector } from '../../../modules/index';
import NoticeService from '../../../lib/api/noticeService';
// import { ImageDelete } from '../../../lib/api/imageUploader';

interface MatchParam {
  runId: string;
}

const ViewNotice: React.FC<RouteComponentProps<MatchParam>> = ({ match }) => {
  //* History
  const history = useHistory();

  const dispatch = useDispatch();

  const noticeService = new NoticeService();

  const {
    address,
    closed,
    content,
    count,
    id,
    image,
    meetingTime,
    openChat,
    regDate,
    title,
    author,
    token,
    nickName,
  } = useSelector((state) => ({
    address: state.viewNotice.viewNoticeData.address,
    closed: state.viewNotice.viewNoticeData.closed,
    content: state.viewNotice.viewNoticeData.content,
    count: state.viewNotice.viewNoticeData.count,
    id: state.viewNotice.viewNoticeData.id,
    image: state.viewNotice.viewNoticeData.image,
    meetingTime: state.viewNotice.viewNoticeData.meetingTime,
    openChat: state.viewNotice.viewNoticeData.openChat,
    regDate: state.viewNotice.viewNoticeData.regDate,
    title: state.viewNotice.viewNoticeData.title,
    author: state.viewNotice.viewNoticeData.author,
    token: state.signIn.token,
    nickName: state.signIn.userData.nickName,
  }));

  const endDate = meetingTime ? new Date(meetingTime) : '';

  const deleteNotice = async () => {
    try {
      const result = await Swal.fire({
        title: '게시물 삭제',
        text: '게시물을 삭제하시겠습니까?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: '삭제하기',
      });
      if (result.isConfirmed) {
        const data = await noticeService.deleteNotice(id, token);
        await Swal.fire(
          '삭제 성공',
          '게시물을 성공적으로 삭제하였습니다.',
          'success'
        );
        const imageURLArr = image.split('/');
        const fileName = `${imageURLArr[imageURLArr.length - 2]}/${
          imageURLArr[imageURLArr.length - 1]
        }`;
        await ImageDelete(fileName);
        history.push('/');
      }
    } catch (error) {
      await Swal.fire({
        title: '게시물 삭제 실패',
        text: '게시물 삭제에 실패하였습니다. 다시 시도해주세요.',
        icon: 'error',
        confirmButtonText: '확인',
      });
      console.error(error);
    }
  };

  const getBoardDate = async () => {
    try {
      const data = await noticeService.getNotice(match.params.runId, token);
      dispatch(noticeActions.setOneViewNotice(data));
      console.log(data);
    } catch (error) {
      const swalWithBootstrapButtons = await Swal.mixin({
        buttonsStyling: true,
      });
      const result = await swalWithBootstrapButtons.fire({
        title: '로그인이 필요합니다.',
        text: '로그인 창으로 이동하시겠습니까?',
        icon: 'info',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#EF8791',
        confirmButtonText: '이동',
        cancelButtonText: '취소',
      });
      if (result.isConfirmed) {
        history.push('/guest');
      }
      console.error(error);
    }
  };

  useEffect(() => {
    getBoardDate(); // MOCK DATA 사용시 주석 처리할것.
    if (!title || !match.params.runId) {
      history.push('/');
    }
  }, [content, match.params.runId]);

  return (
    <DetailBaseBorder>
      <PreviousPageButton
        text="뒤로가기"
        className="w-24 md:w-32 lg:w-40 py-4 flex justify-start items-start"
        iconSizeClassName="text-2xl md:text-3xl lg:text-4xl"
        tailwindTextSize="text-sm md:text-2xl"
        data-cy="back"
        onClick={() => {
          history.goBack();
        }}
      />
      <div className="flex flex-col mb-20 pb-5 border-b-2 px-4 sm:px-0">
        <h1 className="text-xl md:text-4xl mb-10 font-bold text-center">
          {title}
        </h1>
        <div className="flex items-center justify-between mb-4">
          <div className="w-32 flex justify-start items-center cursor-pointer">
            <BiUser
              size="32"
              color="#8b8bf5"
              className="border-2 rounded-full border-purple cursor-pointer w-6 h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 ml-3"
            />
            <span className="ml-2 font-bold">
              <Link to={`/userInfo/${author}`}>{author}</Link>
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
      <div className="px-4 sm:px-0">
        <div className="grid grid-cols-1 gap-10 mb-20">
          <div className="flex justify-center mb-4">
            {image && <img src={image} alt="map" className="w-2/5" />}
          </div>
          <p
            className="w-full text-base md:text-xl break-words px-10"
            dangerouslySetInnerHTML={{ __html: content }}
          >
            {}
          </p>
        </div>
        <div className="w-full space-y-3">
          <div>
            <span className="block font-bold text-xl">장소</span>
            <span className="w-full break-words">{`${address.dou} ${address.si} ${address.gu}`}</span>
          </div>
          <div>
            <span className="block font-bold text-xl">마감 시간</span>
            <span className="w-full break-words">
              {endDate ? dateParser(endDate) : '마감 기간 없음'}
            </span>
          </div>
          <div>
            <span className="block font-bold text-xl">오픈 채팅방 링크</span>
            <a
              target="_blank"
              rel="noopener noreferrer"
              className="w-full break-words"
              href="https://open.kakao.com/o/gI8chtEddssfsd"
            >
              {openChat}
            </a>
          </div>
        </div>
      </div>
    </DetailBaseBorder>
  );
};

export default withRouter(ViewNotice);
