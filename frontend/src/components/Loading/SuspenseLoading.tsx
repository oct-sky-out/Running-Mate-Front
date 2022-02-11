import { Loading } from '@nextui-org/react';

const SuspenseLoading = () => {
  return (
    <div className="w-screen h-screen z-40 bg-white opacity-80 fixed top-0 left-0">
      <div className="w-full h-full flex flex-col space-y-10 justify-center">
        <Loading size="xlarge" color="#8b8bf5" type="points" />
        <div className="w-full text-center text-2xl md:text-3xl text-black space-y-3">
          <div>
            <span>페이지를 불러오고있습니다...</span>
          </div>
          <div>
            <span>잠시만 기다려 주세요.</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuspenseLoading;
