import { useSelector } from '../../../modules/index';

interface IProps {
  questionOrder: number;
}

const CreateCrewOrderMarker = ({ questionOrder }: IProps) => {
  //* Redux
  const { crewName, crewRegion, crewExplain } = useSelector((state) => ({
    crewName: state.createCrew.crew.crewName,
    crewRegion: state.createCrew.crew.crewRegion,
    crewExplain: state.createCrew.crew.crewExplain,
  }));

  const reduxStates = [crewName, crewRegion, crewExplain];
  const orders: string[] = ['이름', '지역', '소개'];

  return (
    <div className="flex items-center mb-20">
      {orders.map((order, index) => {
        return (
          <>
            <div
              className={`w-20 h-20 rounded-full flex items-center justify-center ${
                !reduxStates[index]
                  ? 'transition ease-in-out delay-150 bg-gray-300'
                  : 'transition ease-in-out delay-150 bg-purple-400'
              }`}
            >
              <span>{order}</span>
            </div>
            <div
              className={`w-20 h-2 ${
                !reduxStates[index]
                  ? 'transition ease-in-out delay-150 bg-gray-300'
                  : 'transition ease-in-out delay-200 bg-purple-400'
              }`}
            />
          </>
        );
      })}
      <div
        className={`w-20 h-20 rounded-full flex items-center justify-center ${
          questionOrder !== reduxStates.length
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
