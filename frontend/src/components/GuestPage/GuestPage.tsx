import { useCallback, useState } from 'react';
import { Button } from '@nextui-org/react';
import { useDispatch } from 'react-redux';
import { SignUpActions } from '../../modules/signUp';
import { SignInActions } from '../../modules/signIn';
import useModalPotal from '../../common/hooks/useModalPotal';
import styles from './GuestPage.module.css';
import { ReactComponent as Logo } from '../../assets/logo_big.svg';
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
      <div
        className={`h-screen ${styles.wrapper} grid grid-rows-4 grid-col-1 md:grid-rows-4 md:grid-col-3`}
      >
        <div className="p-5 md:p-10 col-start-0 col-start-1 row-start-0 row-end-1">
          <Logo className="w-200 lg:w-300 h-32 lg:h-300" />
        </div>
        <div className="md:col-start-0 md:col-end-2 row-start-1 ml-5 md:ml-14 md:space-y-4">
          <span className="block text-2xl md:text-7xl font-bold ">
            크루와 함께 달리고,
          </span>
          <span className="block text-4xl md:text-8xl font-bold ">
            공유하세요.
          </span>
          <span className="block text-2xl md:text-4xl">Show Your Passion!</span>
        </div>
        <div className="md:flex lg:justify-end md:col-start-1 md:col-end-2 row-start-3 md:mx-0 md:my-auto row-end-4 space-y-5 md:space-y-0">
          <div className="w-full flex flex-col lg:w-1/3">
            <Button
              auto
              className="z-0"
              color="gradient"
              id={`${styles.btn}`}
              onClick={signUpButtonClicked}
            >
              <span className="text-3xl font-bold">회원가입</span>
            </Button>
          </div>
          <div className="w-full flex flex-col lg:w-1/3">
            <Button
              color="gradient"
              id={`${styles.btn}`}
              className="m-1 z-0"
              onClick={signInButtonClicked}
              auto
              data-cy="move-signIn"
            >
              <span className="text-3xl font-bold">로그인</span>
            </Button>
          </div>
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
