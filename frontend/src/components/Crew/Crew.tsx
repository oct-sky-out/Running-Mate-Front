import { useEffect, useRef, useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { v4 } from 'uuid';
import { Button } from '@nextui-org/react';
import { useSelector } from '../../modules';
import imageURL from '../../lib/URL/Image';
import CrewMock from '../../excuteData/CrewMock/CrewMock';

const Crew = () => {
  //* Redux
  //! 로그인 상태로 가정했습니다.
  const { crew, crewId, nickname } = useSelector((state) => ({
    crew: state.signIn.userData.crew,
    crewId: state.signIn.userData.crewId,
    nickname: state.signIn.userData.nickname,
  }));

  //* useState
  const [imageOrder, setImageOrder] = useState(0);

  //* useRef
  const crewBoardTop = useRef<undefined | number>(undefined);

  //* useEffect
  useEffect(() => {
    const changeImage = setInterval(() => {
      setImageOrder(imageOrder === 2 ? 0 : imageOrder + 1);
    }, 5000);

    return () => clearInterval(changeImage);
  }, [imageOrder]);

  const scrollDown = () => {
    window.scrollTo({ top: crewBoardTop.current, behavior: 'smooth' });
  };

  return (
    <div className="relative h-screen" style={{ height: '100vh' }}>
      <div className="w-full h-1/3">
        <div className="h-full flex justify-center align-center">
          {imageURL.map((url, index) => {
            return (
              imageOrder === index && (
                <div key={v4()} className="w-full h-full bg-white opacity-50">
                  <div
                    className="w-full h-full transition-opacity bg-fixed bg-cover bg-center bg-no-repeat"
                    style={{ backgroundImage: `url(${url})` }}
                  />
                </div>
              )
            );
          })}
        </div>
        <div className="absolute w-full h-1/3 inset-y-0">
          {crew && (
            <div>
              <div className="absolute right-1/2 bottom-40">
                <h1 className="text-3xl">
                  {nickname}안녕님의 크루는 {crew}오르고 달리기 입니다!
                </h1>
              </div>
              <div className="block w-10 absolute right-1/3 bottom-20 ">
                <Link to={`/crew/${crewId}`}>
                  <Button size="xlarge">크루로 가기 ▹</Button>
                </Link>
              </div>
            </div>
          )}
          {crew || (
            <div className="">
              <div className="absolute right-1/2 bottom-40 ">
                <h1 className="text-4xl">현재 가입된 크루가 없습니다.</h1>
                <h1 className="text-3xl">크루에 들어가서 같이 뛰실래요?</h1>
              </div>
              <div className="w-10 absolute right-1/3 bottom-20 flex flex-col space-y-5">
                <Link to="/crew/new" data-cy="create-new-crew">
                  <Button size="xlarge" onClick={scrollDown} color="#8b8bf5">
                    크루 생성하기 ▹
                  </Button>
                </Link>
                <Button
                  size="xlarge"
                  onClick={scrollDown}
                  data-cy="join-crew"
                  color="#3579EC"
                >
                  크루 가입하기 ▹
                </Button>
              </div>
            </div>
          )}
        </div>
        <div
          ref={(ref: any) => {
            crewBoardTop.current = ref?.offsetTop;
          }}
          className="w-full"
          style={{ height: '600px' }}
        >
          <div className="my-20 flex justify-center">
            <h1 className="text-3xl ">크루 목록</h1>
          </div>
          <div className="w-3/4 mx-auto my-0 pb-20 grid grid-cols-3 gap-y-10 justify-items-center">
            {CrewMock.crew.map((crewInformation, index) => (
              <Link
                className="w-60 h-60 relative shadow-2xl transition ease-in-out duration-300 transform hover:scale-105 mx-3 rounded-2xl bg-white border-2"
                to={`/crew/${crewInformation.crewName}`}
                key={v4()}
                data-cy={`${index}-crew-link`}
              >
                <div className="">
                  <img
                    src={crewInformation.imageUrl}
                    alt={`${crewInformation.crewName}_image`}
                    className="w-full h-full rounded-2xl object-cover"
                  />
                </div>
                <div className="opacity-0 hover:block absolute inset-y-0 w-full rounded-2xl border-2 border-purple hover:bg-white hover:opacity-80">
                  <div className="h-full flex flex-col justify-center items-center">
                    <span className="flex items-center justify-shirink inline-block font-bold">
                      크루이름 : {crewInformation.crewName}
                    </span>
                    <span className="flex items-center inline-block font-bold">
                      리더 : {crewInformation.crewLeader}
                    </span>
                    <span className="flex items-center inline-block font-bold">
                      지역 : {crewInformation.crewArea}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default withRouter(Crew);
