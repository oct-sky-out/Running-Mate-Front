import { Input, Button } from '@nextui-org/react';
import { FormElement } from '@nextui-org/react/esm/input/input-props';
import { RiEyeCloseLine, RiEyeLine } from 'react-icons/ri';

import React, { useState, useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { SignUpActions } from '../../modules/signUp';
import { useSelector } from '../../modules';
import Address from '../address/Address';

import styles from './SignUpModal.module.css';
import { ReactComponent as KoreanLogo } from '../../assets/logo_korean.svg';
import { ISignUp, ISignUpForm } from '../../modules/types/signUpTypes';

interface IProps {
  closeModal: () => void;
}
type SignUpActionType =
  | 'setEmail'
  | 'setNickname'
  | 'setName'
  | 'setPassword'
  | 'setCheckPassword'
  | 'setPostCode'
  | 'setAddress'
  | 'setOptionAddress';

const SignUpModal: React.FC<IProps> = ({ closeModal }) => {
  //* Redux State
  const dispatch = useDispatch();
  const signUpState = useSelector((state) => {
    return state.signUp;
  });

  //* useStates
  const [disabled, setDisabled] = useState<boolean>(true);
  const [passwordComment, setPasswordComment] = useState<string>(
    '8자리 이상, 영어와 숫자, 특수기호(~!@#$%^&*)를 섞은 문자'
  );
  const [checkPasswordComment, setCheckPasswordComment] =
    useState<string>('비밀번호가 다릅니다.');
  const [successPassword, setSuccessPassword] = useState<boolean>(false);
  const [openAddressModal, setOpenAddressModal] = useState(false);

  //* any functions
  const signUpExecuting = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      console.log(successPassword);
      if (successPassword === true) {
        dispatch(
          SignUpActions.signUpFetch({
            ...signUpState,
            signUpFetchState: 'Fetch',
          })
        );
        closeModal();
      }
    },
    [successPassword]
  );
  const checkSignUpState = (state: ISignUp): boolean => {
    let check: boolean = true;

    Object.keys(state).forEach((key) => {
      if (
        state[key as keyof ISignUp] === '' &&
        key !== 'signUpFetchState' &&
        key !== 'optionAddress'
      ) {
        check = false;
      }
    });
    return check;
  };

  //* useCallbacks
  const changedInputs = useCallback(
    (
      { target: { value } }: React.ChangeEvent<FormElement>,
      actionName: SignUpActionType
    ) => {
      dispatch(SignUpActions[actionName](value));
    },
    [signUpState]
  );

  const onChangePasswordConfirm = useCallback(
    (e: React.ChangeEvent<FormElement>) => {
      changedInputs(e, 'setPassword');
      const passwordRegex =
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/;
      const passwordConfirmCurrent = e.target.value;

      if (!passwordRegex.test(passwordConfirmCurrent)) {
        setPasswordComment(
          '8자리 이상, 영어와 숫자, 특수기호(~!@#$%^&*)를 섞은 문자'
        );
        setSuccessPassword(false);
      }
      if (passwordRegex.test(passwordConfirmCurrent)) {
        setPasswordComment('안전한 비밀번호입니다 :)');
        if (checkPasswordComment === '비밀번호가 일치합니다') {
          setSuccessPassword(true);
        }
      }
    },
    [
      signUpState.password,
      signUpState.checkPassword,
      checkPasswordComment,
      passwordComment,
      successPassword,
    ]
  );

  const onChangeCheckPasswordConfirm = useCallback(
    (e: React.ChangeEvent<FormElement>) => {
      changedInputs(e, 'setCheckPassword');
      const checkPassword = e.target.value;
      // const regExp = new RegExp(checkPassword, 'g');

      if (signUpState.password === checkPassword) {
        setCheckPasswordComment('비밀번호가 일치합니다');
        if (passwordComment === '안전한 비밀번호입니다 :)') {
          setSuccessPassword(true);
        }
      }
      if (signUpState.password !== checkPassword) {
        setCheckPasswordComment('비밀번호가 다릅니다.');
        setSuccessPassword(false);
      }
    },
    [
      signUpState.password,
      signUpState.checkPassword,
      checkPasswordComment,
      setCheckPasswordComment,
    ]
  );

  useEffect(() => {
    if (checkSignUpState(signUpState) === true) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [signUpState]);

  return (
    <>
      <div
        className={`relative p-5 rounded-md flex items-center z-20 bg-white ${styles.signIn_wrapper}`}
      >
        <div className="flex w-full ustify-center items-center flex-col">
          <div className="mb-5 border-b-2">
            <KoreanLogo />
          </div>
          <div className="mb-5">
            <span className="text-2xl">회원가입</span>
          </div>
          <form onSubmit={signUpExecuting}>
            <Input
              width="100%"
              className={`mb-5 z-0 ${styles.signIn_form}`}
              placeholder="이메일"
              type="email"
              onChange={(e) => {
                changedInputs(e, 'setEmail');
                console.log(signUpState.password);
                console.log(signUpState.checkPassword);
              }}
            />
            <Input
              width="100%"
              className={`mb-5 z-0 ${styles.signIn_form}`}
              placeholder="이름"
              onChange={(e) => {
                changedInputs(e, 'setNickname');
              }}
            />
            <Input
              width="100%"
              className={`mb-5 z-0 ${styles.signIn_form}`}
              placeholder="별명"
              onChange={(e) => {
                changedInputs(e, 'setName');
              }}
            />
            <div className="flex space-x-4">
              <Input
                disabled
                width="30%"
                className={`mb-5 z-0 mr-3 ${styles.signIn_form}`}
                placeholder="우편번호"
                value={signUpState.postCode}
                onChange={(e) => {
                  changedInputs(e, 'setPostCode');
                }}
              />
              <Button
                onClick={() => {
                  setOpenAddressModal(true);
                }}
              >
                주소 검색
              </Button>
            </div>
            <Input
              disabled
              width="100%"
              className={`mb-5 z-0 ${styles.signIn_form}`}
              placeholder="주소"
              value={signUpState.address}
              onChange={(e) => {
                changedInputs(e, 'setAddress');
              }}
            />
            <Input
              width="100%"
              className={`mb-5 z-0 ${styles.signIn_form}`}
              placeholder="상세주소"
              onChange={(e) => {
                changedInputs(e, 'setOptionAddress');
              }}
            />
            <div className={styles.password}>
              <Input.Password
                width="100%"
                className={`mb-2 z-0 ${styles.signIn_form}`}
                placeholder="비밀번호"
                visibleIcon={<RiEyeLine fill="currentColor" />}
                hiddenIcon={<RiEyeCloseLine fill="currentColor" />}
                onChange={(e) => {
                  onChangePasswordConfirm(e);
                }}
              />
              <span className={`mb-2 pl-2 text-xs ${styles.password_alert}`}>
                {passwordComment}
              </span>
            </div>
            <div className={styles.password}>
              <Input.Password
                width="100%"
                className={`mb-5 z-0 ${styles.signIn_form}`}
                placeholder="비밀번호 확인"
                visibleIcon={<RiEyeLine fill="currentColor" />}
                hiddenIcon={<RiEyeCloseLine fill="currentColor" />}
                onChange={(e) => {
                  onChangeCheckPasswordConfirm(e);
                }}
              />
              <span className={`mb-2 pl-2 text-xs ${styles.password_alert}`}>
                {checkPasswordComment}
              </span>
            </div>
            <div className="h-full flex justify-center align-center">
              <Button
                type="submit"
                id={`${styles.signIn_btn}`}
                className="z-0 important"
                disabled={disabled}
              >
                가입하기
              </Button>
            </div>
          </form>
        </div>
        {openAddressModal && (
          <div className="z-10 w-full h-full absolute top-0 left-0">
            <Address setOpenAddressModal={setOpenAddressModal} />
          </div>
        )}
      </div>
    </>
  );
};

export default SignUpModal;
