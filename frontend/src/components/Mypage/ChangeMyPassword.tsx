import { useDispatch } from 'react-redux';
import { Button, Input } from '@nextui-org/react';
import { RiEyeCloseLine, RiEyeLine } from 'react-icons/ri';
import { useSelector } from '../../modules/index';
import { newPasswordActions } from '../../modules/newPassword';
import usePasswordCheck from '../../hooks/usePasswordCheck';

const ChangeMyPassword = () => {
  const dispatch = useDispatch();
  const { newPassword, checkNewPassword } = useSelector((state) => ({
    newPassword: state.newPassword.newPassword,
    checkNewPassword: state.newPassword.checkNewPassword,
  }));

  const {
    changeChekcPassword,
    changePassword,
    isSafedAndPasswordSame,
    getConfirmPasswordState,
    getSamePasswordState,
  } = usePasswordCheck();

  return (
    <div className="h-screen col-span-4 w-full pt-20">
      <div className="w-2/3 flex flex-col items-center mx-auto my-0 space-y-20">
        <div className="w-2/3 flex flex-col justify-center">
          <Input.Password
            bordered
            color="secondary"
            size="xlarge"
            data-testid="password"
            width="100%"
            labelPlaceholder="새로운 비밀번호"
            type="password"
            visibleIcon={<RiEyeLine fill="currentColor" />}
            hiddenIcon={<RiEyeCloseLine fill="currentColor" />}
            onChange={(e) =>
              changePassword(e, () =>
                dispatch(newPasswordActions.setNewPassword(e.target.value))
              )
            }
          />
          <span data-testid="password-confrim">
            {getConfirmPasswordState()}
          </span>
        </div>
        <div className="w-2/3 flex flex-col justify-center">
          <Input.Password
            bordered
            color="secondary"
            size="xlarge"
            data-testid="check-password"
            labelPlaceholder="비밀번호 확인"
            width="100%"
            type="password"
            visibleIcon={<RiEyeLine fill="currentColor" />}
            hiddenIcon={<RiEyeCloseLine fill="currentColor" />}
            onChange={(e) =>
              changeChekcPassword(e, newPassword, () =>
                dispatch(newPasswordActions.setCheckNewPassword(e.target.value))
              )
            }
          />
          <span data-testid="password-same">{getSamePasswordState()}</span>
        </div>
        <div className="">
          <Button
            rounded
            color="secondary"
            size="xlarge"
            disabled={!isSafedAndPasswordSame(newPassword, checkNewPassword)}
          >
            변경
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChangeMyPassword;
