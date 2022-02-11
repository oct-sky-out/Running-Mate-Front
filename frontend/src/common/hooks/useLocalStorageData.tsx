import { useDispatch } from 'react-redux';
import { SignInActions } from '../../modules/signIn';
import { IUserData } from '../../modules/types/signInTypes';

const useLocalStroeageData = () => {
  const dispatch = useDispatch();
  const getUserData = () => {
    const userData = localStorage.getItem('userData');
    if (userData) {
      const userDataObj = JSON.parse(userData);
      dispatch(SignInActions.signInSuccess(userDataObj));
    }
  };

  const getToken = () => {
    const token = localStorage.getItem('token');
    if (token) {
      const userToken = token;
      dispatch(SignInActions.setToken(userToken));
    }
  };

  const setUserData = (userData: IUserData) =>
    localStorage.setItem('userData', JSON.stringify(userData));

  const setToken = (token: string) => localStorage.setItem('token', token);

  return { getUserData, getToken, setUserData, setToken };
};

export default useLocalStroeageData;
