import { useEffect, useState, memo, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { v4 } from 'uuid';
import { isEmpty } from 'lodash';
import { HiOutlinePlusCircle } from 'react-icons/hi';
import { useInView } from 'react-intersection-observer';
import NoticeService from '../../lib/api/noticeService';
import Board from '../Board/Boards';
import SelcetRegion from '../../common/components/SelcetRegion';
import {
  GetNoticesType,
  SearchAddressType,
  AddressType,
} from '../../modules/types/notice';
// import LoadingModal from '../../common/components/LoadingModal';

const Home = () => {
  //* CONST
  const PAGING_LIMIT_NOTICES: number = 6;

  //* API
  const noticeService = new NoticeService();

  //* useState
  const [offset, setOffset] = useState(0);
  const [region, setRegion] = useState<SearchAddressType>({
    gwon: '',
    dou: '',
    si: '',
    gu: '',
  });
  const [infiniteFetchStop, setInfiniteFetchStop] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  /* 
  searchSwitch = true : 검색이 없는 전지역 상태
  searchSwitch = false : 검색으로 특정 지역 상태
  */

  const [notices, setNotices] = useState<GetNoticesType[]>([]);

  //* usuInView
  const [viewRef, InView] = useInView();

  //* functions
  const clickSearchBtn = () => {
    setOffset(0);
    setNotices([]);
    setInfiniteFetchStop(false);
  };

  const searchRegionNotices = useCallback(
    async (offset_: number, limit_: number, region_: AddressType) => {
      try {
        const data = await noticeService.viewChoiceNotices({
          ...region_,
          limit: limit_,
          offset: offset_,
        });
        if (!isEmpty(data)) {
          setNotices((previousNotices) => [...previousNotices, ...data]);
          setOffset(offset_ + limit_);
        } else {
          setInfiniteFetchStop(true);
        }
      } catch (error) {
        setInfiniteFetchStop(true);
        console.error(error);
      }
    },
    []
  );

  const searchAllRegionNotices = useCallback(
    async (offset_: number, limit_: number) => {
      try {
        const data = await noticeService.viewAllNotices(offset_, limit_);
        if (!isEmpty(data)) {
          setNotices((previousNotices) => [...previousNotices, ...data]);
          setOffset(offset_ + limit_);
        } else {
          setInfiniteFetchStop(true);
        }
      } catch (error) {
        setInfiniteFetchStop(true);
        console.error(error);
      }
    },
    []
  );

  //* 실제 api 사용
  const fetchAllRegionNoticeDataAndUpdate = async () => {
    setIsLoading(true);
    if (region.si) {
      await searchRegionNotices(offset, PAGING_LIMIT_NOTICES, {
        dou: region.dou,
        si: region.si,
        gu: region.gu,
      });
    }
    if (!region.si || region.gwon === '전체') {
      await searchAllRegionNotices(offset, PAGING_LIMIT_NOTICES);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (!infiniteFetchStop && InView && !isLoading) {
      fetchAllRegionNoticeDataAndUpdate();
    }
  }, [infiniteFetchStop, InView, isLoading]);

  const changeButtonCSS = () => {
    if (region.gwon === '전체') {
      return 'bg-indigo-400 cursor-pointer';
    }
    if (region.si) {
      return 'bg-indigo-400 cursor-pointer';
    }
    return 'bg-gray-400 cursor-not-allowed';
  };

  return (
    <div>
      <div className="shadow-md">
        <div className="justify-center text-center font-bold py-14 text-3xl">
          <span>뛰 어 요</span>
        </div>
        <div className="flex w-full justify-center items-center">
          <SelcetRegion submit={setRegion} className="p-2 m-2" />
          <button
            disabled={region.gwon === '전체' ? false : !region.si}
            className={`text-white w-16 h-10 md:w-20 md:w-25 rounded-xl hover:opacity-80 transition ease-in-out delay-100 ml-4 mb-2 outline-none
            ${changeButtonCSS()}`}
            onClick={clickSearchBtn}
          >
            검색
          </button>
        </div>
      </div>
      <div className="pt-7 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mx-auto my-0 mb-5 w-2/3 gap-x-20 gap-y-10 grid-template-rows">
        {notices.length === 0 && (
          <>
            <h1 className="text-2xl">게시글 목록이 비어있습니다.</h1>
            <h3 className="text-xl">첫 게시글을 등록해보세요!!</h3>
          </>
        )}
        {notices &&
          notices.map((notice) => {
            return <Board key={v4()} data={notice} />;
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
      {/* {!isLoading && <LoadingModal />} */}
    </div>
  );
};

export default memo(Home);
