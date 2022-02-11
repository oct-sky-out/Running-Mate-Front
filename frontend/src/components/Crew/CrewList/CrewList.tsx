import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';
import { v4 } from 'uuid';
import { Button, Loading } from '@nextui-org/react';
import Swal from 'sweetalert2';
import { useSelector } from '../../../modules';
import CrewService from '../../../lib/api/crewService';
import CrewImageSlider from '../CrewImageSlider';
import CrewCard from '../CrewCard';
import { ICrewsData } from '../../../modules/types/crewTypes';
import CrewMainBar from './CrewMainBar';

const CrewList = () => {
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
    try {
      setLoading(true);
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
      Swal.fire({
        toast: true,
        icon: 'error',
        title: '데이터 조회 실패',
        position: 'top-end',
        timer: 5000,
        timerProgressBar: true,
        showConfirmButton: false,
        showCloseButton: true,
      });
    } finally {
      setLoading(false);
    }
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
    observerInView();
  }, [inView]);

  return (
    <div className="relative h-screen" style={{ height: '100vh' }}>
      <div className="w-full h-1/3">
        <CrewImageSlider />
        <CrewMainBar crewBoardTopRef={crewBoardTop} />
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

export default React.memo(CrewList);
