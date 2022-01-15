import { Button, Input } from '@nextui-org/react';
import PeopleList from './PeopleList';

const PeopleManagement = () => {
  return (
    <div className="mx-auto my-0 py-10 px-20 flex flex-col space-y-10 justify-center">
      <div className="w-full flex justify-center lg:justify-end">
        <div className="w-600 flex space-x-5 justify-end">
          <Input
            width="100%"
            color="secondary"
            bordered
            className="w-0 flex-none"
            placeholder="크루원이름을 입력하세요"
          />
          <div className="w-30">
            <Button auto rounded color="secondary">
              크루원 검색
            </Button>
          </div>
        </div>
      </div>
      <div className="border-2 border-purple rounded-lg flex flex-col divide-y divide-purple">
        <PeopleList />
        <PeopleList />
        <PeopleList />
        <PeopleList />
        <PeopleList />
      </div>
    </div>
  );
};

export default PeopleManagement;
