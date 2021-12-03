import React from 'react';
import DaumPostCode from 'react-daum-postcode';
import { useDispatch } from 'react-redux';
import { SignUpActions } from '../../modules/signUp';
import { SignInActions } from '../../modules/signIn';

interface IProps {
  setOpenAddressModal?: (status: boolean) => void;
  closeModal?: () => void;
}

const Address: React.FC<IProps> = ({ setOpenAddressModal, closeModal }) => {
  const dispatch = useDispatch();

  const handleComplete = (data: any) => {
    if (data.addressType === 'R') {
      if (data.sido !== '' && data.sigungu !== '') {
        // data.sido + data.sigungu -> 도/시 시/군/구를 붙여서
        const addressData = `${data.sido} ${data.sigungu}`;
        if (setOpenAddressModal) {
          dispatch(SignUpActions.setAddress(addressData));
          setOpenAddressModal(false);
        }
        if (closeModal) {
          dispatch(SignInActions.setUserAddressData(addressData));
          closeModal();
        }
      }
    }
  };
  return (
    <>
      <DaumPostCode onComplete={handleComplete} style={{ height: '100%' }} />
    </>
  );
};
export default Address;
