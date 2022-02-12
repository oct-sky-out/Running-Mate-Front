import { useHistory } from 'react-router-dom';
import { useCallback, useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { Button, Loading } from '@nextui-org/react';
import { v4 } from 'uuid';
import Swal from 'sweetalert2';
import { useSelector } from '../../../modules';
import NoticeService from '../../../lib/api/noticeService';
import { GetMyNoticeType } from '../../../modules/types/notice';
import dateParser from '../../../common/functions/dateParser';

const MyBoards = () => {
  //* react-router-dom
  const history = useHistory();

  //* redux
  const { userNickName, token } = useSelector((state) => ({
    userNickName: state.signIn.userData.nickName,
    token: state.signIn.token,
  }));

  //* extend hook
  const [viewRef, inView] = useInView();

  //* any variables
  const LIMIT = 20;
  const { getMyNotices, deleteNotice } = new NoticeService();

  //* useState
  const [myBoards, setMyBoards] = useState<GetMyNoticeType[]>([]);
  const [offset, setOffset] = useState(0);
  const [isSamePreviousMyBoards, setIsSamePreviousMyBoards] = useState(false);
  const [loading, setLoading] = useState(false);

  //* useCallbacks
  const lookupMyBoards = useCallback(async () => {
    try {
      setLoading(true);
      const boards = await getMyNotices(userNickName, token, offset, LIMIT);
      if (boards.length === 0) setIsSamePreviousMyBoards(true);
      if (boards.length !== 0) {
        setIsSamePreviousMyBoards(true);
        setMyBoards((previousMyBoards) => [...previousMyBoards, ...boards]);
      }
    } catch {
      await Swal.fire({
        toast: true,
        icon: 'error',
        title: '내 작성글 데이터 조회 실패',
        position: 'top-end',
        timer: 5000,
        timerProgressBar: true,
        showConfirmButton: false,
        showCloseButton: true,
      });
    } finally {
      setLoading(false);
    }
  }, [userNickName, token, offset]);

  const observerInView = useCallback(() => {
    if (!loading && inView && !isSamePreviousMyBoards) {
      setOffset(offset + LIMIT);
    }
  }, [inView, loading, offset, isSamePreviousMyBoards]);

  //* useEffects
  useEffect(() => {
    lookupMyBoards();
  }, [lookupMyBoards]);

  useEffect(() => {
    observerInView();
  }, [inView]);

  //* event functuion
  const goToViewMyBoard = (boardId: number) => {
    history.push(`/boards/run/${boardId}`);
  };
  const goToEditMyBoard = (boardId: number) => {
    history.push(`/boards/edit/run/${boardId}`);
  };

  const deleteMyBoard = async (boardId: number) => {
    try {
      await deleteNotice(boardId, token);
      setMyBoards((boards) => boards.filter((board) => board.id !== boardId));
      await Swal.fire({
        toast: true,
        icon: 'error',
        title: '게시글 삭제 성공!',
        text: '게시글 삭제에 성공하였습니다.',
        position: 'top-end',
        timer: 5000,
        timerProgressBar: true,
        showConfirmButton: false,
        showCloseButton: true,
      });
    } catch {
      await Swal.fire({
        toast: true,
        icon: 'error',
        title: '게시물 삭제 실패',
        text: '게시글 삭제에 실패하였습니다.',
        position: 'top-end',
        timer: 5000,
        timerProgressBar: true,
        showConfirmButton: false,
        showCloseButton: true,
      });
    }
  };

  return (
    <>
      <div className="w-full border-2 border-purple py-5 px-3 sapce-y-5 divide-y divide-purple rounded-xl">
        {myBoards.length === 0 && (
          <div className="w-full h-10 col-span-3">
            <span className="text-2xl"> 내가 작성한 글이 없습니다.</span>
          </div>
        )}
        {myBoards.map((myBoard) => {
          return (
            <div key={v4()} className="flex py-5">
              <div className="w-full my-auto mx-0 mr-3 truncate">
                <span
                  className="block h-full cursor-pointer text-lg md:text-xl font-bold"
                  onClick={() => goToViewMyBoard(myBoard.id)}
                >
                  {myBoard.title}asdfasda
                </span>
                <span className="block h-full text-gray-400 text-sm md:text-base s font-bold">
                  {dateParser(new Date(myBoard.regDate))}
                </span>
              </div>
              <div className="w-52 flex space-x-2 md:space-x-0 md:justify-around itmes-center">
                <div className="flex w-full">
                  <div className="w-1/2">
                    <Button
                      auto
                      color="#8b8bf5"
                      onClick={() => goToEditMyBoard(myBoard.id)}
                    >
                      수정
                    </Button>
                  </div>
                </div>
                <div className="flex w-full">
                  <div className="w-1/2">
                    <Button
                      auto
                      color="#8b8bf5"
                      onClick={() => deleteMyBoard(myBoard.id)}
                    >
                      삭제
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
        {loading && (
          <div className="w-full h-10 col-span-3">
            <div className="w-32 h-full mx-auto my-0 flex justify-center">
              <Loading size="large" color="#8b8bf5" type="points" />
            </div>
          </div>
        )}
      </div>
      <div ref={viewRef} />
    </>
  );
};

export default MyBoards;
