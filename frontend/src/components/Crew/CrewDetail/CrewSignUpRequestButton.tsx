import { Button } from '@nextui-org/react';
import { useDispatch } from 'react-redux';
import { useSelector } from '../../../modules';
import { crewActions } from '../../../modules/crew';

interface IProps {}

const CrewSignUpRequestButton = () => {
  const {
    crewRequested,
    crewName,
    crewLeaderId,
    userId,
    userCrewName,
    token,
    isCrewLeader,
  } = useSelector((state) => ({
    crewRequested: state.crew.crewRequested,
    crewName: state.crew.crewName,
    crewLeaderId: state.crew.crewLeaderId,
    userId: state.signIn.userData.id,
    userCrewName: state.signIn.userData.crewName,
    token: state.signIn.token,
    isCrewLeader: state.signIn.userData.crewLeader,
  }));
  const dispatch = useDispatch();

  const signUpRequestCrew = () => {
    dispatch(crewActions.signUpRequestCrew({ crewName, token }));
  };

  return (
    <div className="w-20 md:w-44 lg:w-52 pl-5 md:pl-0 py-4 flex flex-grow justify-start items-start">
      {+userId !== crewLeaderId && userCrewName !== crewName && !isCrewLeader && (
        <Button
          auto
          color="#8b8bf5"
          onClick={signUpRequestCrew}
          disabled={crewRequested}
        >
          {crewRequested ? '요청됨' : '가입요청 보내기'}
        </Button>
      )}
    </div>
  );
};

export default CrewSignUpRequestButton;
