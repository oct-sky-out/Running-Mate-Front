import React from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as CrewDefailtLogo } from '../../assets/crew_default.svg';

interface IProps {
  imageUrl: string;
  crewName: string;
  crewArea: string;
}
const CrewCard = React.forwardRef<HTMLAnchorElement, IProps>(
  ({ crewName, crewArea, imageUrl }, ref) => {
    return (
      <Link
        className="w-60 h-60 relative shadow-2xl transition ease-in-out duration-300 transform hover:scale-105 mx-3 rounded-2xl bg-white border-2"
        to={`/crewList/${crewName}`}
        ref={ref}
      >
        <div className="h-full">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={`${crewName}_image`}
              className="w-full h-4/5 rounded-2xl object-cover"
            />
          ) : (
            <CrewDefailtLogo className="w-full h-4/5" />
          )}
          <div className="w-full h-1/5 flex items-center justify-center opacity-80 bg-indigo-200 rounded-b-2xl">
            <span className="block text-lg font-bold">{crewName}</span>
          </div>
        </div>
        <div className="opacity-0 hover:block absolute inset-y-0 w-full rounded-2xl border-2 border-purple hover:bg-white hover:opacity-80">
          <div className="h-full flex flex-col justify-center items-center">
            <span className="flex items-center justify-shirink inline-block font-bold">
              크루이름 : {crewName}
            </span>
            <span className="flex items-center inline-block font-bold">
              지역 : {crewArea}
            </span>
          </div>
        </div>
      </Link>
    );
  }
);

export default React.memo(CrewCard);
