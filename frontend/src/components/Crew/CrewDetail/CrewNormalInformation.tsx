import { BsPeopleFill } from 'react-icons/bs';
import { GiPositionMarker } from 'react-icons/gi';
import { v4 } from 'uuid';
import { useSelector } from '../../../modules';
import CrewWidget from './CrewWidget';

const CrewNormalInformation = () => {
  const { crewRegion, crewUserCount } = useSelector((state) => ({
    crewUserCount: state.crew.userDtos.length,
    crewRegion: state.crew.crewRegion,
  }));

  const normalCategory = [
    { icon: BsPeopleFill, title: '크루 인원', description: crewUserCount },
    { icon: GiPositionMarker, title: '크루 지역', description: crewRegion },
  ];
  return (
    <>
      <span className="block pl-5 md:pl-0 text-lg">기본정보</span>
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 mx-auto gap-5">
        {normalCategory.map((category) => (
          <div key={v4()} className="flex justify-center">
            <CrewWidget
              Icon={category.icon}
              widgetTitle={category.title}
              widgetDescription={category.description}
              iconColor="#8b8bf5"
            />
          </div>
        ))}
      </div>
    </>
  );
};

export default CrewNormalInformation;
