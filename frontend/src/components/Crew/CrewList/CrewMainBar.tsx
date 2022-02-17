import { Button } from '@nextui-org/react';
import { Link } from 'react-router-dom';
import { useSelector } from '../../../modules';

interface IProps {
  crewBoardTopRef: React.MutableRefObject<number | undefined>;
}

const CrewMainBar: React.FC<IProps> = ({ crewBoardTopRef }) => {
  const { crewName, nickName } = useSelector((state) => ({
    crewName: state.signIn.userData.crewName,
    nickName: state.signIn.userData.nickName,
  }));

  const scrollDown = () => {
    window.scrollTo({ top: crewBoardTopRef.current, behavior: 'smooth' });
  };

  return (
    <div className="absolute w-full h-1/3 inset-y-0">
      {crewName && (
        <div>
          <div className="absolute right-1/2 bottom-40">
            <h1 className="text-3xl">
              {nickName}님의 크루는 {crewName}입니다!
            </h1>
          </div>
          <div className="block w-10 absolute right-1/3 bottom-20 ">
            <Link to={`/crewList/${crewName}`}>
              <Button size="xlarge">크루로 가기 ▹</Button>
            </Link>
          </div>
        </div>
      )}
      {!crewName && (
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
  );
};

export default CrewMainBar;
