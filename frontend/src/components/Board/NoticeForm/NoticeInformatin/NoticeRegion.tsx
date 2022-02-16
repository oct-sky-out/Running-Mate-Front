import { useDispatch } from 'react-redux';
import { AddressType } from '../../../../modules/types/notice';
import SelecRegion from '../../../../common/components/SelcetRegion';
import { noticeActions } from '../../../../modules/notice';
import { CreateNoticeActions } from '../../../../modules/createNotice';

interface IProps {
  formType: 'edit' | 'new';
  initRegion?: AddressType;
}

const NoticeRegion: React.FC<IProps> = ({ formType, initRegion }) => {
  const dispatch = useDispatch();
  const onChangeSelectState = (region: AddressType) => {
    if (formType === 'new') dispatch(CreateNoticeActions.setAddress(region));
    if (formType === 'edit') dispatch(noticeActions.setAddress(region));
  };

  return (
    <div className="space-y-3">
      <span className="mr-5 font-bold mb-4">러닝 지역</span>
      <SelecRegion
        submit={onChangeSelectState}
        className="p-1 mx-1"
        initRegion={initRegion}
      />
    </div>
  );
};

export default NoticeRegion;
