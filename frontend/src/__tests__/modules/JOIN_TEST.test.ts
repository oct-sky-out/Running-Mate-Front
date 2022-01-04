/**
 * @jest-environment node
 */
import axios from 'axios';

describe('', () => {
  test('서버 로그인 테스트', async () => {
    const { data } = await axios.post('http://15.164.164.99:8080/join', {});
    console.log(data);
  });
});
