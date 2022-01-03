/**
 * @jest-environment node
 */
import axios from 'axios';

describe('', () => {
  test('서버 로그인 테스트', async () => {
    const { data, headers } = await axios.post(
      'http://15.164.164.99:8080/login',
      {
        email: '',
        password: '',
      }
    );
    console.log(data);
    console.log(headers);
  });
});
