import { Button, Input } from '@nextui-org/react';

const Management = () => {
  return (
    <div className="mx-auto my-0 w-500 py-10 flex flex-col space-y-10 justify-center">
      <div className="w-500 flex flex-col">
        <Input
          size="large"
          color="secondary"
          bordered
          clearable
          labelPlaceholder="크루명"
        />
      </div>
      <div className="w-500 flex flex-col">
        <Input
          size="large"
          color="secondary"
          bordered
          clearable
          labelPlaceholder="오픈채팅방 URL"
        />
      </div>
      <div>
        <span>크루 이미지</span>
        <label
          htmlFor="crew-image"
          className="w-64 flex flex-col items-center px-4 py-3 bg-white rounded-md shadow-md tracking-wide uppercase border border-blue cursor-pointer hover:bg-purple-600 hover:text-white text-purple ease-linear transition-all duration-150"
        >
          이미지 변경
          <input
            id="crew-image"
            type="file"
            accept="image/*"
            className="hidden"
          />
        </label>
      </div>
      <div className="w-500 flex flex-col">
        <Button rounded size="large" color="secondary">
          변경
        </Button>
      </div>
    </div>
  );
};

export default Management;
