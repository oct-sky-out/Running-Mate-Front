import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { SignUpActions } from '../../modules/signUp';
import { useSelector } from '../../modules';
import { ReactComponent as MiniLogo } from '../../assets/logo_mini.svg';
import SignUpForm from './SignUpForm';
import useSwalerts from '../../common/hooks/useSwalerts';

interface IProps {
  closeModal: () => void;
}

const SignUpModal: React.FC<IProps> = ({ closeModal }) => {
  //* Redux State
  const dispatch = useDispatch();
  const fetchState = useSelector((state) => state.signUp.signUpFetchState);
  const { successAlert, errorAlert } = useSwalerts();

  useEffect(() => {
    if (fetchState === 'Success') {
      closeModal();
      successAlert(
        '회원가입이 완료되었습니다.',
        '로그인하고 서비스를 이용해보세요!'
      ).then(() => {
        dispatch(SignUpActions.setInit());
      });
    }
    if (fetchState === 'Error') {
      errorAlert('회원가입 실패', '죄송합니다 회원가입에 실패하였습니다.').then(
        () => {
          dispatch(SignUpActions.setSignUpState());
        }
      );
    }
  }, [fetchState]);

  return (
    <>
      <div className="w-500 h-500 md:h-700 relative p-5 mx-3 rounded-md z-20 bg-white overflow-y-scroll">
        <div className="my-auto md:h-600">
          <div className="w-3/4 mx-auto border-b-2 flex justify-center">
            <MiniLogo className="w-10 h-10 md:w-24 md:h-24" />
          </div>
          <div>
            <span className="w-24 block text-2xl mx-auto">회원가입</span>
          </div>
          <SignUpForm />
        </div>
      </div>
    </>
  );
};

export default SignUpModal;
