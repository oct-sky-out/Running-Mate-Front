import { useCallback, useState } from 'react';
import { Button } from '@nextui-org/react';
import { useDispatch } from 'react-redux';
import { SignUpActions } from '../../modules/signUp';
import { SignInActions } from '../../modules/signIn';
import useModalPotal from '../../hooks/useModalPotal';
import styles from './GuestPage.module.css';
import { ReactComponent as Logo } from '../../logo.svg';
import SignInModal from '../Modals/SignInModal';
import SignUpModal from '../Modals/SignUpModal';

export default function GuestPage() {
  //* Redux
  const dispatch = useDispatch();
  //* Modal
  const { ModalPotal, openModal, closeModal } = useModalPotal();
  //* hooks States
  const [signInAndUpModalState, setSignInAndUpModalState] = useState({
    signInModal: false,
    signUpModal: false,
  });
  //* DomEvent
  const signInButtonClicked = useCallback(() => {
    setSignInAndUpModalState({ signInModal: true, signUpModal: false });
    openModal();
    dispatch(SignInActions.setInit());
  }, [signInAndUpModalState]);
  const signUpButtonClicked = useCallback(() => {
    setSignInAndUpModalState({ signInModal: false, signUpModal: true });
    openModal();
    dispatch(SignUpActions.setInit());
  }, [signInAndUpModalState]);

  return (
    <>
      <div className={`h-screen ${styles.wrapper} grid grid-rows-3 grid-col-3`}>
        <Logo className="mt-6" width="200px" />
        <div className="col-start-0 col-start-1 row-start-2 row-end-3 ml-14">
          <span className="block text-7xl font-bold mb-4">
            크루와 함께 달리고,
          </span>
          <span className="block text-8xl font-bold mb-4">공유하세요.</span>
          <span className="block text-4xl mb-4">Show Your Passion!</span>
        </div>
        <div className="flex col-start-3 col-start-4 row-start-3 row-end-4">
          <Button
            auto
            className="z-0"
            color="gradient"
            id={`${styles.btn}`}
            onClick={signUpButtonClicked}
          >
            <span className="text-3xl font-bold">회원가입</span>
          </Button>
          <Button
            color="gradient"
            id={`${styles.btn}`}
            className="m-1 z-0"
            onClick={signInButtonClicked}
            auto
          >
            <span className="text-3xl font-bold">로그인</span>
          </Button>
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
}
