import { Button } from '@nextui-org/react';

const WriteComment = () => {
  return (
    <div className="my-20 px-3 md:px-0 space-y-5 w-full">
      <div className="text-2xl md:text-3xl font-bold">
        <span>댓글 {1}개</span>
      </div>
      <div className="w-full">
        <textarea
          className="block w-full border-2 border-purple rounded-xl p-2 text-xl resize-none	"
          name="comment"
          cols={10}
          rows={5}
        />
      </div>
      <div className="text-2xl md:text-3xl font-bold flex justify-end">
        <div className="w-48 flex flex-col">
          <Button auto color="#8b8bf5">
            <span className="text-xl">등록</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default WriteComment;
