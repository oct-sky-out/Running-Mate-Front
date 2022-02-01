import { Avatar } from '@nextui-org/react';

interface IProps {
  userNickName: string;
}

const PeopleList: React.FC<IProps> = ({ userNickName, children }) => {
  return (
    <div className="w-full h-20 p-5 flex justify-between items-center">
      <div className="flex items-center space-x-3">
        <Avatar
          size="large"
          src="/avatars/avatar-2.png"
          color="secondary"
          bordered
          className="float-left"
        />
        <span>{userNickName || '닉네임'}</span>
      </div>
      <div className="w-1/3 flex justify-end space-x-3">{children}</div>
    </div>
  );
};

export default PeopleList;
