import { useDispatch } from 'react-redux';
import { SignInActions } from '../modules/signIn';

const useLocalStroeageData = () => {
  const dispatch = useDispatch();
  const getUserData = () => {
    const userData = localStorage.getItem('userData');
    if (userData) {
      const userDataObj = JSON.parse(userData);
      dispatch(SignInActions.signInSuccess(userDataObj));
    }
  };

  return { getUserData };
};

export default useLocalStroeageData;
