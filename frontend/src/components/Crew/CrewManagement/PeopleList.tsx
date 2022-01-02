import { Avatar, Button } from '@nextui-org/react';

const PeopleList = () => {
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
        <span>닉네임</span>
      </div>
      <div className="w-30">
        <Button auto rounded color="secondary">
          크루원 추방
        </Button>
      </div>
    </div>
  );
};

export default PeopleList;
