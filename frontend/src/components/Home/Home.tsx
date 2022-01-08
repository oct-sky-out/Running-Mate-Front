import { Link } from 'react-router-dom';
import { v4 } from 'uuid';
import { HiOutlinePlusCircle } from 'react-icons/hi';
import Board from '../Board/Board';
import BoardData from '../../excuteData/BoardMock/BoardMock';
import MenuButton from '../../common/components/MenuButton';

interface INavRegion {
  [key: string]: string;
  seoul: string;
  gyeonggi: string;
  deajeon: string;
  busan: string;
  gwangju: string;
  else: string;
}
const Home = () => {
  const navRegion: INavRegion = {
    seoul: '서울',
    gyeonggi: '경기',
    deajeon: '대전',
    busan: '부산',
    gwangju: '광주',
    else: '기타',
  };
  return (
    <div>
      <div className="shadow-md">
        <div className="justify-center text-center font-bold py-16 text-3xl">
          <span>뛰 어 요</span>
        </div>
        <div className="flex justify-center w-full">
          {Object.keys(navRegion).map((region) => {
            return (
              <MenuButton
                key={v4()}
                type="button"
                className="text-sm px-3 py-3 md:px-5 md:py-4 lg:px-8"
              >
                {navRegion[region]}
              </MenuButton>
            );
          })}
        </div>
      </div>
      <div className="pt-7 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mx-auto my-0 mb-5 w-2/3 gap-x-20 gap-y-10 grid-template-rows">
        {BoardData.notice.map((data) => {
          return <Board key={v4()} data={data} />;
        })}
      </div>
      <button
        type="button"
        className="bg-white rounded-full fixed right-2 bottom-2 md:right-6 md:bottom-8 md:right-16 md:bottom-16  transform hover:scale-110 transition ease-in-out duration-300"
      >
        <Link to="/notice-create">
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

export default Home;
