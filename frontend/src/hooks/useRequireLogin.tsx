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
        const { data } = await axios.get<'ok' | '토큰 만료'>(
          '/user/token/validate',
          {
            headers: { 'x-auth-token': token },
          }
        );
        if (data === '토큰 만료')
          throw Error('token have been expired please check token');
      } catch (error: any) {
        return {
          tokenState: false,
          message: error.message,
        };
      }
    }
    return {
      tokenState: true,
      message: 'token is alive',
    };
  };

  const checkToekenAvailable =
    (token: string) =>
    (
      successCallback: (result: CheckTokenResultType) => any,
      failureCallback?: (reason: any) => any
    ) =>
      checkToekenApi(token)
        .then(successCallback)
        .catch(failureCallback || null);

  return { checkToekenAvailable };
};

export default useRequireLogin;
