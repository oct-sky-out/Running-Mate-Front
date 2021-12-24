import { v4 } from 'uuid';
import Board from '../Board/Board';
import styles from './Home.module.css';
import BoardData from '../../excuteData/BoardMock/BoardMock';

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
      <div className={`${styles.home}`}>
        <div className="justify-center text-center font-bold py-16 text-3xl">
          <span>뛰 어 요</span>
        </div>
        <div className={`flex justify-center w-full ${styles.nav}`}>
          {Object.keys(navRegion).map((region) => {
            return (
              <button type="button" className={styles.nav__region}>
                {navRegion[region]}
              </button>
            );
          })}
        </div>
      </div>
      <div className="pt-7 grid grid-cols-3 mx-auto my-0 w-2/3 gap-y-10 grid-template-rows">
        {BoardData.notice.map((data) => {
          return <Board key={v4()} data={data} />;
        })}
      </div>
    </div>
  );
};

export default Home;
