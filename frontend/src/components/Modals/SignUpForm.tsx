import { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Input, Button } from '@nextui-org/react';
import { RiEyeCloseLine, RiEyeLine } from 'react-icons/ri';
import { GrClose } from 'react-icons/gr';
import { FormElement } from '@nextui-org/react/esm/input/input-props';
import Address from '../address/Address';
import { useSelector } from '../../modules';
import { SignUpActions } from '../../modules/signUp';
import usePasswordCheck from '../../hooks/usePasswordCheck';

type SignUpActionType = keyof typeof SignUpActions;

const SignUpForm = () => {
  const { email, nickName, password, checkPassword, address } = useSelector(
    (state) => ({
      email: state.signUp.email,
      nickName: state.signUp.nickname,
      password: state.signUp.password,
      checkPassword: state.signUp.checkPassword,
      address: state.signUp.address,
    })
  );
  const dispatch = useDispatch();

  const {
    changeChekcPassword,
    changePassword,
    isSafedAndPasswordSame,
    getConfirmPasswordState,
    getSamePasswordState,
  } = usePasswordCheck();

  //* useStates
  const [openAddressModal, setOpenAddressModal] = useState(false);

  const closeAddressModal = () => {
    setOpenAddressModal(false);
  };

  const signUpExecuting = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      dispatch(
        SignUpActions.signUpFetch({
          email,
          nickName,
          password,
          address,
          signUpFetchState: 'Fetch',
        })
      );
    },
    [email, nickName, password, checkPassword, address]
  );

  const changedInputs = useCallback(
    (
      { target: { value } }: React.ChangeEvent<FormElement>,
      actionName: SignUpActionType
    ) => {
      dispatch(SignUpActions[actionName](value as never));
    },
    [email, nickName, address]
  );

  return (
    <>
      <form onSubmit={signUpExecuting} className="space-y-2 md:space-y-5">
        <Input
          color="secondary"
          bordered
          width="100%"
          className="z-0"
          label="이메일"
          type="email"
          onChange={(e) => {
            changedInputs(e, 'setEmail');
          }}
        />
        <Input
          color="secondary"
          bordered
          width="100%"
          className="z-0"
          label="별명"
          onChange={(e) => {
            changedInputs(e, 'setNickname');
          }}
        />
        <div className="flex items-center space-x-2 justify-between">
          <Input
            color="secondary"
            bordered
            disabled
            width="100%"
            className="z-0"
            label="주소 (시/도, 시/군/구 까지만 입력)"
            value={address}
          />
          <Button
            auto
            className="mt-7"
            rounded
            color="secondary"
            onClick={() => {
              setOpenAddressModal(true);
            }}
          >
            주소 검색
          </Button>
        </div>
        <div className="flex flex-col justify-center">
          <Input.Password
            color="secondary"
            bordered
            width="100%"
            className="mb-2 z-0"
            label="비밀번호"
            visibleIcon={<RiEyeLine fill="currentColor" />}
            hiddenIcon={<RiEyeCloseLine fill="currentColor" />}
            onChange={(e) =>
              changePassword(e, () =>
                dispatch(SignUpActions.setPassword(e.target.value))
              )
            }
          />
          <span className="mb-2 pl-2 text-xs text-gray-500">
            {getConfirmPasswordState()}
          </span>
        </div>
        <div className="flex flex-col justify-center">
          <Input.Password
            color="secondary"
            bordered
            width="100%"
            className="mb-2 z-0"
            label="비밀번호 확인"
            visibleIcon={<RiEyeLine fill="currentColor" />}
            hiddenIcon={<RiEyeCloseLine fill="currentColor" />}
            onChange={(e) => {
              changeChekcPassword(e, password, () =>
                dispatch(SignUpActions.setCheckPassword(e.target.value))
              );
            }}
          />
          <span className="mb-2 pl-2 text-xs text-gray-500">
            {getSamePasswordState()}
          </span>
        </div>
        <div className="h-full flex flex-col justify-center align-center">
          <Button
            auto
            color="secondary"
            rounded
            type="submit"
            className="z-0 important"
            disabled={
              !(
                isSafedAndPasswordSame(password, checkPassword) &&
                email &&
                nickName &&
                address
              )
            }
          >
            가입하기
          </Button>
        </div>
      </form>
      {openAddressModal && (
        <div className="z-10 w-full h-full absolute top-7 left-0">
          <Address setOpenAddressModal={setOpenAddressModal} />
          <div className="absolute left-3 -top-5 md:-top-5">
            <GrClose
              className="cursor-pointer text-2xl md:text-3xl"
              onClick={closeAddressModal}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default SignUpForm;
