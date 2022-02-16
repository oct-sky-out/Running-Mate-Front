import { useHistory } from 'react-router-dom';
import UserService from '../../lib/api/userService';
import useSwalerts from './useSwalerts';

export type CheckTokenResultType = { tokenState: boolean; message: string };

const useValidToken = () => {
  const history = useHistory();
  const { errorToast } = useSwalerts();
  //* 로컬 스토리지의 token을 가져와 토큰이 살아있는지 확인. 토큰없거나 만료면 로그인페이지로 리다이렉팅
  const checkTokenApi = async (token: string | null) => {
    const result = await new UserService().tokenValid(token);
    return result;
  };

  const tokenNotValidCallback = () => {
    errorToast(
      '사용자 정보 오류',
      '사용자 정보가 만료되었거나 존재하지않습니다. 다시 로그인해주세요.😰'
    );
    history.push('/guest');
  };

  const tokenValidCallback = async (result: CheckTokenResultType) => {
    if (!result.tokenState) tokenNotValidCallback();
  };

  const checkTokenAvailable = async (token: string | null) => {
    try {
      const result = await checkTokenApi(token);
      tokenValidCallback(result);
    } catch {
      tokenNotValidCallback();
    }
  };

  return checkTokenAvailable;
};

export default useValidToken;
