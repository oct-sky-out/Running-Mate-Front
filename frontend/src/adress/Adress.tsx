import React from 'react';
import DaumPostCode from 'react-daum-postcode';

const Address: React.FC = () => {
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
  };
  return (
    <>
      <DaumPostCode onComplete={handleComplete} className="post-code" />
    </>
  );
};
export default Address;
