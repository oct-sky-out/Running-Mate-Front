import styles from './Home.module.css';

const Home = () => {
  return (
    <div className={`${styles.home}`}>
      <div className="justify-center text-center font-bold py-16 text-3xl">
        <span>Notices</span>
      </div>
      <div className={`flex justify-center w-full ${styles.nav}`}>
        <div className={styles.filler}> </div>
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
        <div className={styles.filler}> </div>
      </div>
    </div>
  );
};

export default Home;
