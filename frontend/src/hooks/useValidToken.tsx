import UserService from '../lib/api/userService';

type CheckTokenResultType = { tokenState: boolean; message: string };

const useValidToken = () => {
  //* 로컬 스토리지의 token을 가져와 토큰이 살아있는지 확인. 토큰없거나 만료면 로그인페이지로 리다이렉팅
  const checkToekenApi = async (token: string | null) => {
    const result = await new UserService().tokenValid(token || '');
    return result;
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

export default useValidToken;
