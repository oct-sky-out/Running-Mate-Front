import NoticeEndTime from './NoticeEndTime';
import NoticeImage from './NoticeImage';
import NoticeOpenChat from './NoticeOpenChat';
import NoticeRegion from './NoticeRegion';
import { AddressType } from '../../../../modules/types/notice';

interface IProps {
  formType: 'edit' | 'new';
  initRegion?: AddressType;
}

const NoticeInformatin: React.FC<IProps> = ({ formType, initRegion }) => {
  return (
    <div className="md:flex md:justify-around space-y-5 mb-5">
      <div className="mt-10 w-full space-y-5">
        <NoticeEndTime formType={formType} />
        <NoticeRegion initRegion={initRegion} formType={formType} />
        <NoticeOpenChat formType={formType} />
      </div>
      <NoticeImage formType={formType} />
    </div>
  );
};

export default NoticeInformatin;
