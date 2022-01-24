import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';
import { v4 } from 'uuid';
import { Button, Loading } from '@nextui-org/react';
import { useSelector } from '../../modules';
import CrewService from '../../lib/api/crewService';
import CrewImageSlider from './CrewImageSlider';
import CrewCard from './CrewCard';
import { ICrewsData } from '../../modules/types/crewTypes';

const Crew = () => {
  //* Redux
  const { crewName, id, nickName } = useSelector((state) => ({
    crewName: state.signIn.userData.crewName,
    id: state.signIn.userData.id,
    nickName: state.signIn.userData.nickName,
  }));

  //* customHook (무한스크롤 hook)
  const [inViewRef, inView] = useInView();

  //* useState
  const [offset, setOffset] = useState(0);
  const [crewCards, setCrewCards] = useState<ICrewsData[]>([]);
  const [loading, setLoading] = useState(false);
  const [isSamePreviousData, setIsSamePreviousData] = useState(true);

  //* useRef
  const crewBoardTop = useRef<undefined | number>(undefined);

  const getCrews = useCallback(async () => {
    setLoading(true);
    try {
      const crewsData = await new CrewService().getCrewRange(offset, 10);

      if (crewsData.length === 0) setIsSamePreviousData(true);
      if (crewsData.length !== 0) {
        setIsSamePreviousData(false);
        setCrewCards((previousCrewCards) => [
          ...previousCrewCards,
          ...crewsData,
        ]);
      }
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  }, [offset]);

  const observerInView = useCallback(() => {
    if (!loading && inView && !isSamePreviousData) {
      setOffset(offset + 10);
    }
  }, [inView, loading, offset, isSamePreviousData]);

  //* useEffects
  useEffect(() => {
    getCrews();
  }, [getCrews]);

  useEffect(() => {
    //* 여기가 페이지 가장 마지막 요소를 인식하여 다음 ajax요청하는 구간
    observerInView();
  }, [inView]);

  const scrollDown = () => {
    window.scrollTo({ top: crewBoardTop.current, behavior: 'smooth' });
  };

  return (
    <div className="relative h-screen" style={{ height: '100vh' }}>
      <div className="w-full h-1/3">
        <CrewImageSlider />
        <div className="absolute w-full h-1/3 inset-y-0">
          {crewName && (
            <div>
              <div className="absolute right-1/2 bottom-40">
                <h1 className="text-3xl">
                  {nickName}안녕님의 크루는 {crewName}오르고 달리기 입니다!
                </h1>
              </div>
              <div className="block w-10 absolute right-1/3 bottom-20 ">
                <Link to={`/crew/${id}`}>
                  <Button size="xlarge">크루로 가기 ▹</Button>
                </Link>
              </div>
            </div>
          )}
          {crewName || (
            <div className="">
              <div className="w-full absolute top-12 lg:top-1/3 lg:right-1/4 lg:bottom-40 flex flex-col items-center">
                <h1 className="text-2xl lg:text-4xl">
                  현재 가입된 크루가 없습니다.
                </h1>
                <h1 className="text-xl lg:text-3xl">
                  크루에 들어가서 같이 뛰실래요?
                </h1>
              </div>
              <div className="w-full pb-4 lg:pb-0 justify-center items-center lg:w-10 absolute right:1/2 bottom-0 lg:right-1/4 lg:bottom-1/4 flex flex-col items-center space-y-5">
                <div className="w-full flex items-center justify-center md:w-200 lg:w-300">
                  <div className="w-40 md:w-full lg:h-32 ">
                    <Link
                      to="/crew/new"
                      data-cy="create-new-crew"
                      className="block w-full flex flex-col md:justify-center lg:h-1/2"
                    >
                      <Button auto color="#8b8bf5">
                        크루 생성하기 ▹
                      </Button>
                    </Link>
                    <div className="w-full flex flex-col md:justify-center lg:h-1/2">
                      <Button
                        auto
                        onClick={scrollDown}
                        data-cy="join-crew"
                        color="#3579EC"
                        className="mt-2"
                      >
                        크루 가입하기 ▹
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        <div
          ref={(divRef: any) => {
            crewBoardTop.current = divRef?.offsetTop;
          }}
          className="w-full"
        >
          <div className="my-20 flex justify-center">
            <h1 className="text-3xl ">크루 목록</h1>
          </div>
          <div className="w-3/4 mx-auto my-0 pb-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-10 justify-items-center">
            {crewCards.map((crewInformation) => (
              <CrewCard
                key={v4()}
                crewArea={crewInformation.crewRegion}
                crewName={crewInformation.crewName}
                imageUrl=""
              />
            ))}
            {crewCards.length === 0 && (
              <div className="w-full h-10 col-span-3">
                <span className="text-2xl"> 크루 데이터가 비어있습니다.</span>
              </div>
            )}
            {loading && (
              <div className="w-full h-10 col-span-3">
                <div className="w-32 h-full mx-auto my-0 flex justify-center">
                  <Loading size="large" color="#8b8bf5" type="points" />
                </div>
              </div>
            )}
            <div className="w-full h-10" ref={inViewRef} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(Crew);
