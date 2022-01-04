/**
 * @jest-environment node
 */
import axios from 'axios';

describe('', () => {
  test('서버 로그인 테스트', async () => {
    axios.defaults.headers.common = {
      'X-AUTH-TOKEN':
        'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJxMTIzQG5hdmVyLmNvbSIsInJvbGVzIjpbIlJPTEVfVVNFUiJdLCJpYXQiOjE2NDEyMjUyMDIsImV4cCI6MTY0MTIyNzAwMn0.32jTBLRajkbHb8hVyv8beHqgD7hniOeIXeLn4pIYjAM',
    };

    const { data, headers } = await axios.get(
      'http://15.164.164.99:8080/mypage'
    );
    console.log(data);
    console.log(headers);
  });
});
