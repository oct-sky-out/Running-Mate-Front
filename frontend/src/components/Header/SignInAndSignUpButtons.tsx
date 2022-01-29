import { useState } from 'react';
import useModalPotal from '../../hooks/useModalPotal';
import SignInModal from '../Modals/SignInModal';
import SignUpModal from '../Modals/SignUpModal';

const SignInAndSignUpButtons = () => {
  const { ModalPotal, openModal, closeModal } = useModalPotal();
  const [signInAndUpModalState, setSignInAndUpModalState] = useState({
    signInModal: false,
    signUpModal: false,
  });

  const clickSignInButton = () => {
    setSignInAndUpModalState({
      signUpModal: false,
      signInModal: true,
    });
    openModal();
  };
  const clickSignUpButton = () => {
    setSignInAndUpModalState({
      signUpModal: true,
      signInModal: false,
    });
    openModal();
  };

  return (
    <>
      <div className="w-64 flex justify-around text-xs md:text-base border-l-2 md:border-none border-purple text-purple font-bold">
        <div className="w-14 md:w-20 flex flex-col justify-center">
          <button
            className="border-2 rounded-full py-1 px-2 border-purple"
            onClick={clickSignInButton}
          >
            로그인
          </button>
        </div>
        <div className="w-15 md:w-20 flex flex-col justify-center font">
          <button
            className="border-2 rounded-full py-1 px-2 border-purple"
            onClick={clickSignUpButton}
          >
            회원가입
          </button>
        </div>
      </div>
      <ModalPotal>
        {signInAndUpModalState.signUpModal && (
          <SignUpModal closeModal={closeModal} />
        )}
        {signInAndUpModalState.signInModal && (
          <SignInModal closeModal={closeModal} />
        )}
      </ModalPotal>
    </>
  );
};

export default SignInAndSignUpButtons;
