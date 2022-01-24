import { useEffect, useState, memo } from 'react';
import { Link } from 'react-router-dom';
import { v4 } from 'uuid';
import { isEmpty } from 'lodash';
import { HiOutlinePlusCircle } from 'react-icons/hi';
import { useInView } from 'react-intersection-observer';
import NoticeService from '../../lib/api/noticeService';
import Board from '../Board/Board';
import SelcetRegion from '../SelectRegion/SelcetRegion';
import { GetNoticesType, AddressType } from '../../modules/types/notice';
// import LoadingModal from '../../common/components/LoadingModal';

const Home = () => {
  //* CONST
  const PAGING_LIMIT_NOTICES: number = 6;

  //* API
  const noticeService = new NoticeService();

  //* useState
  const [offset, setOffset] = useState(0);
  const [region, setRegion] = useState<AddressType>({
    dou: '',
    si: '',
    gu: '',
  });
  const [infiniteFetchStop, setInfiniteFetchStop] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [notices, setNotices] = useState<{
    [key: string]: GetNoticesType;
  }>();

  //* usuInView
  const [viewRef, InView] = useInView();

  //* functions
  const searchRegionNotices = () => {
    noticeService
      .viewChoiceNotices({
        ...region,
        limit: '5',
        offset: '0',
      })
      .then((data) => {
        setNotices(data);
        setInfiniteFetchStop(false);
      });
  };

  //* 실제 api 사용
  const fetchAllRegionNoticeDataAndUpdate = async () => {
    // wait의 역할: 과도한 API 요청을 방지해준다.
    const wait = (delay: number) =>
      new Promise((resolve) => setTimeout(resolve, delay * 1000));
    await wait(0.5);
    await noticeService
      .viewAllNotices(offset, PAGING_LIMIT_NOTICES)
      .then((data) => {
        console.log(data);
        if (!isEmpty(data)) {
          setNotices({ ...notices, ...data });
          setOffset(offset + PAGING_LIMIT_NOTICES);
        } else {
          setInfiniteFetchStop(true);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  //* 무한 스크롤 테스트 가상 api
  const fetchTestAllRegionNoticeDataAndUpdate = async () => {
    const updateAllRegionBoards = noticeService.getTestNotices(
      offset,
      PAGING_LIMIT_NOTICES
    );
    const wait = (delay: number) =>
      new Promise((resolve) => setTimeout(resolve, delay * 1000));
    await wait(1);
    if (!isEmpty(updateAllRegionBoards)) {
      setNotices({ ...notices, ...updateAllRegionBoards });
      setOffset(offset + PAGING_LIMIT_NOTICES);
    } else {
      setInfiniteFetchStop(true);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (!infiniteFetchStop && InView && !isLoading) {
      console.log('실행횟수');
      setIsLoading(true);
      fetchAllRegionNoticeDataAndUpdate();
      // fetchTestAllRegionNoticeDataAndUpdate(); // TEST API
    }
  }, [
    infiniteFetchStop,
    InView,
    setIsLoading,
    isLoading,
    fetchAllRegionNoticeDataAndUpdate,
  ]);

  useEffect(() => {
    console.log('region = ', region);
  }, [region]);

  return (
    <div>
      <div className="shadow-md">
        <div className="justify-center text-center font-bold py-14 text-3xl">
          <span>뛰 어 요</span>
        </div>
        <div className="flex w-full justify-center items-center">
          <SelcetRegion submit={setRegion} className="p-2 m-2" />
          <button
            disabled={!region.si}
            className={`text-white w-16 h-10 md:w-20 md:w-25 rounded-xl hover:opacity-80 transition ease-in-out delay-100 ml-4 mb-2 outline-none ${
              region.si
                ? 'bg-indigo-400 cursor-pointer'
                : 'bg-gray-400 cursor-not-allowed'
            }`}
            onClick={searchRegionNotices}
          >
            검색
          </button>
        </div>
      </div>
      <div className="pt-7 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mx-auto my-0 mb-5 w-2/3 gap-x-20 gap-y-10 grid-template-rows">
        {notices &&
          Object.keys(notices).map((key) => {
            return <Board key={v4()} data={notices[key]} />;
          })}
      </div>
      <div ref={viewRef} />
      <button
        type="button"
        className="bg-white rounded-full fixed right-2 bottom-2 md:right-6 md:bottom-8 md:right-16 md:bottom-16  transform hover:scale-110 transition ease-in-out duration-300"
      >
        <Link to="/boards/create/run">
          <HiOutlinePlusCircle
            className="text-5xl"
            color="#8b8bf5"
            title="게시글 생성"
          />
        </Link>
      </button>
    </div>
  );
};

export default memo(Home);
