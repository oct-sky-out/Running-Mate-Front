import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Input, Button } from '@nextui-org/react';
import { FormElement } from '@nextui-org/react/esm/input/input-props';
import { RiEyeCloseLine, RiEyeLine } from 'react-icons/ri';
import { ToastContainer, toast } from 'react-toastify';
import Swal from 'sweetalert2';
import { SignUpActions } from '../../modules/signUp';
import { useSelector } from '../../modules';
import Address from '../address/Address';
import styles from './SignInAndUpModal.module.css';
import { ReactComponent as KoreanLogo } from '../../assets/logo_korean.svg';
import 'react-toastify/dist/ReactToastify.css';

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
  const {
    email,
    nickname,
    name,
    password,
    checkPassword,
    address,
    postCode,
    optionAddress,
    success,
    error,
  } = useSelector((state) => ({
    email: state.signUp.email,
    nickname: state.signUp.nickname,
    name: state.signUp.name,
    password: state.signUp.password,
    checkPassword: state.signUp.checkPassword,
    address: state.signUp.address,
    postCode: state.signUp.postCode,
    optionAddress: state.signUp.optionAddress,
    success: state.signUp.success,
    error: state.signUp.error,
  }));

  //* useStates
  const [isPasswordSafe, setIsPasswordSafe] = useState(false);
  const [isPasswordSame, setIsPasswordSame] = useState(false);
  const [openAddressModal, setOpenAddressModal] = useState(false);

  //* useCallbacks
  const signUpExecuting = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      dispatch(
        SignUpActions.signUpFetch({
          email,
          nickname,
          name,
          password,
          postCode,
          address,
          optionAddress,
          signUpFetchState: 'Fetch',
        })
      );
    },
    [
      email,
      nickname,
      name,
      password,
      checkPassword,
      address,
      postCode,
      optionAddress,
    ]
  );

  const changedInputs = useCallback(
    (
      { target: { value } }: React.ChangeEvent<FormElement>,
      actionName: SignUpActionType
    ) => {
      dispatch(SignUpActions[actionName](value));
    },
    [
      email,
      nickname,
      name,
      password,
      checkPassword,
      address,
      postCode,
      optionAddress,
    ]
  );

  //* useMemoes
  const displayedSafePasswordComment = useMemo(() => {
    const passwordRegex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/;

    if (!passwordRegex.test(password)) setIsPasswordSafe(false);
    if (passwordRegex.test(password)) setIsPasswordSafe(true);

    return (
      <span className="mb-2 pl-2 text-xs text-gray-500">
        {isPasswordSafe
          ? '안전한 비밀번호입니다 :)'
          : '8자리 이상, 영어와 숫자, 특수기호(~!@#$%^&*)를 섞은 문자'}
      </span>
    );
  }, [password, checkPassword, isPasswordSafe]);

  const displayedSamePasswordComment = useMemo(() => {
    if (password === checkPassword) setIsPasswordSame(true);
    if (password !== checkPassword) setIsPasswordSame(false);
    return (
      <span className="mb-2 pl-2 text-xs text-gray-500">
        {isPasswordSame ? '비밀번호가 일치합니다.' : '비밀번호가 다릅니다.'}
      </span>
    );
  }, [password, checkPassword, isPasswordSame]);

  useEffect(() => {
    if (success.nickName !== '') {
      closeModal();
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: '회원가입 완료되었습니다.',
        showConfirmButton: false,
        timer: 1500,
      });
    }
    if (error.code !== '') {
      Swal.fire({
        icon: 'error',
        title: '에러 발생',
        text: `${error.code}`,
      });
    }
  }, [success.nickName, error.code]);

  return (
    <>
      <div
        className={`relative p-5 rounded-md flex items-center z-20 bg-white ${styles.signUp_wrapper}`}
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
                value={postCode}
                onChange={(e) => {
                  changedInputs(e, 'setPostCode');
                }}
              />
              <Button
                onClick={() => {
                  toast('Wow so easy!');
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
              value={address}
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
            <div className="flex flex-col justify-center">
              <Input.Password
                width="100%"
                className={`mb-2 z-0 ${styles.signIn_form}`}
                placeholder="비밀번호"
                visibleIcon={<RiEyeLine fill="currentColor" />}
                hiddenIcon={<RiEyeCloseLine fill="currentColor" />}
                onChange={(e) => {
                  changedInputs(e, 'setPassword');
                }}
              />
              {displayedSafePasswordComment}
            </div>
            <div className="flex flex-col justify-center">
              <Input.Password
                width="100%"
                className={`mb-2 z-0 ${styles.signIn_form}`}
                placeholder="비밀번호 확인"
                visibleIcon={<RiEyeLine fill="currentColor" />}
                hiddenIcon={<RiEyeCloseLine fill="currentColor" />}
                onChange={(e) => {
                  changedInputs(e, 'setCheckPassword');
                }}
              />
              {displayedSamePasswordComment}
            </div>
            <div className="h-full flex justify-center align-center">
              <Button
                type="submit"
                id={`${styles.signIn_btn}`}
                className="z-0 important"
                disabled={
                  !(
                    isPasswordSafe &&
                    isPasswordSame &&
                    email &&
                    nickname &&
                    name &&
                    address
                  )
                }
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
