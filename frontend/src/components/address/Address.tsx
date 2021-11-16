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
    let fullAddress = data.address;
    if (data.addressType === 'R') {
      let extraAddress = '';
      if (data.bname !== '') {
        extraAddress += data.bname;
      }
      if (data.buildingName !== '') {
        extraAddress +=
          extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== '' ? ` (${extraAddress})` : '';
    }
    // fullAddress -> 전체 주소반환
    dispatch(SignUpActions.setPostCode(data.zonecode));
    dispatch(SignUpActions.setAddress(fullAddress));
    setOpenAddressModal(false);
  };
  return (
    <>
      <DaumPostCode onComplete={handleComplete} style={{ height: '100%' }} />
    </>
  );
};
export default Address;
