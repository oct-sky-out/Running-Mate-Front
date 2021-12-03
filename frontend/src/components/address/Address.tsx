import React from 'react';
import DaumPostCode from 'react-daum-postcode';

import { useDispatch } from 'react-redux';
import { SignUpActions } from '../../modules/signUp';

interface IProps {
  setOpenAddressModal: (status: boolean) => void;
}

const Address: React.FC<IProps> = ({ setOpenAddressModal }) => {
  const dispatch = useDispatch();

  const handleComplete = (data: any) => {
    if (data.addressType === 'R') {
      if (data.sido !== '' && data.sigungu !== '') {
        // data.sido + data.sigungu -> 도/시 시/군/구를 붙여서
        dispatch(SignUpActions.setAddress(`${data.sido} ${data.sigungu}`));
      }
    }
    setOpenAddressModal(false);
  };
  return (
    <>
      <DaumPostCode onComplete={handleComplete} style={{ height: '100%' }} />
    </>
  );
};
export default Address;
