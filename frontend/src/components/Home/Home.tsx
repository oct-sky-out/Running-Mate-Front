import { v4 } from 'uuid';
import Board from '../Board/Board';
import styles from './Home.module.css';
import BoardData from '../../excuteData/BoardMock/BoardMock';

const Home = () => {
  return (
    <div>
      <div className={`${styles.home}`}>
        <div className="justify-center text-center font-bold py-16 text-3xl">
          <span>뛰 어 요</span>
        </div>
        <div className={`flex justify-center w-full ${styles.nav}`}>
          <button type="button" className={styles.nav__region}>
            서울
          </button>
          <button type="button" className={styles.nav__region}>
            경기
          </button>
          <button type="button" className={styles.nav__region}>
            대전
          </button>
          <button type="button" className={styles.nav__region}>
            부산
          </button>
          <button type="button" className={styles.nav__region}>
            광주
          </button>
          <button type="button" className={styles.nav__region}>
            기타
          </button>
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
