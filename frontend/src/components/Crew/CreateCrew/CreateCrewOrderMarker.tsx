interface IProps {
  questionOrder: number;
}

const CreateCrewOrderMarker = ({ questionOrder }: IProps) => {
  const QUESTIONS_LENGTH = 3;
  const orders: string[] = ['이름', '지역', '소개'];

  return (
    <div className="flex items-center mb-20">
      {orders.map((order, index) => {
        return (
          <>
            <div
              className={`w-12 h-12 md:w-20 md:h-20 rounded-full flex items-center justify-center ${
                index > questionOrder
                  ? 'transition ease-in-out delay-150 bg-gray-300'
                  : 'transition ease-in-out delay-150 bg-purple-400'
              }`}
            >
              <span className="text-gray-600">{order}</span>
            </div>
            <div
              className={`w-10 md:w-20 h-2 ${
                index > questionOrder
                  ? 'transition ease-in-out delay-150 bg-gray-300'
                  : 'transition ease-in-out delay-200 bg-purple-400'
              }`}
            />
          </>
        );
      })}
      <div
        className={`w-12 h-12 text-gray-600 md:w-20 md:h-20 rounded-full flex items-center justify-center ${
          questionOrder !== QUESTIONS_LENGTH
            ? 'transition ease-in-out delay-150 bg-gray-300'
            : 'transition ease-in-out delay-150 bg-purple-400'
        }`}
      >
        완료
      </div>
    </div>
  );
};

export default CreateCrewOrderMarker;
