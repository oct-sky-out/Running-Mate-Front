import { Button } from '@nextui-org/react';
import styles from './Home.module.css';
import Address from '../address/Address';

const Home = () => {
  return (
    <div>
      <div>런닝맨 로고 이미지</div>
      <div className="flex">
        <Button>서울</Button>
        <Button>대전</Button>
        <Button>경기</Button>
        <Button>부산</Button>
        <Button>광주</Button>
        <Button>기타</Button>
      </div>
      <div>게시판</div>
    </div>
  );
};

export default Home;
