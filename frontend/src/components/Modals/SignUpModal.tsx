import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import { SignUpActions } from '../../modules/signUp';
import { useSelector } from '../../modules';
import { ReactComponent as MiniLogo } from '../../assets/logo_mini.svg';
import SignUpForm from './SignUpForm';

interface IProps {
  closeModal: () => void;
}

const SignUpModal: React.FC<IProps> = ({ closeModal }) => {
  //* Redux State
  const dispatch = useDispatch();
  const { fetchState, error } = useSelector((state) => ({
    fetchState: state.signUp.signUpFetchState,
    error: state.signUp.error,
  }));

  useEffect(() => {
    if (fetchState === 'Success') {
      closeModal();
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: '회원가입이 완료되었습니다.',
        text: '로그인하고 서비스를 이용해보세요!',
        showConfirmButton: false,
        timer: 1500,
      }).then(() => {
        dispatch(SignUpActions.setInit());
      });
    }
    if (fetchState === 'Error') {
      Swal.fire({
        icon: 'error',
        title: '에러 발생',
        text: `${error.code}`,
      }).then(() => {
        dispatch(SignUpActions.setSignUpState());
      });
    }
  }, [fetchState, error.code]);

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
