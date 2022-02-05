import { Button, Input } from '@nextui-org/react';

interface IProps {
  placeholder: string;
}

const PeopleSearch: React.FC<IProps> = ({ placeholder }) => {
  return (
    <div className="w-full flex justify-center lg:justify-end">
      <div className="w-600 flex space-x-5 justify-end">
        <Input
          width="100%"
          color="secondary"
          bordered
          className="w-0 flex-none"
          placeholder={placeholder}
        />
        <div className="w-30">
          <Button auto rounded color="secondary">
            검색
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PeopleSearch;
