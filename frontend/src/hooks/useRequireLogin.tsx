import axios from '../lib/api/axios';

type CheckTokenResultType = { tokenState: boolean; message: string };
type CheckTokenAliveType = (
  token: string | null
) => Promise<CheckTokenResultType>;

const useRequireLogin = () => {
  //* 로컬 스토리지의 token을 가져와 토큰이 살아있는지 확인. 토큰없거나 만료면 로그인페이지로 리다이렉팅
  const checkToekenApi: CheckTokenAliveType = async (token: string | null) => {
    if (!token) {
      return {
        tokenState: false,
        message: 'token is not find please check token',
      };
    }
    if (token) {
      try {
        await axios.get('/mypage', {
          headers: { 'x-auth-token': token },
        });
      } catch (error: any) {
        return {
          tokenState: false,
          message: 'token have been expired please check token',
        };
      }
    }
    return {
      tokenState: true,
      message: 'token is alive',
    };
  };

  const checkToekenAvailable =
    (token: string) => (callback: (result: CheckTokenResultType) => any) =>
      checkToekenApi(token).then(callback);

  return { checkToekenAvailable };
};

export default useRequireLogin;
