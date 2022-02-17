import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from '../../../../modules';

export type CreacteCrewActionType =
  | 'setCrewName'
  | 'setExplanation'
  | 'setCrewRegion'
  | 'setOpenChat';

const useCreateCrew = () => {
  //* react-router-dom
  const history = useHistory();
  const {
    createCrewFetchStatus,
    crewName,
    crewRegion,
    explanation,
    openChat,
    token,
    userNickName,
  } = useSelector((state) => ({
    crewName: state.createCrew.crew.crewName,
    crewRegion: state.createCrew.crew.crewRegion,
    explanation: state.createCrew.crew.explanation,
    openChat: state.createCrew.crew.openChat,
    createCrewFetchStatus: state.createCrew.createCrewStatus,
    token: state.signIn.token,
    userNickName: state.signIn.userData.nickName,
  }));
  const reduxCreateCrewState = {
    createCrewFetchStatus,
    crewName,
    crewRegion,
    explanation,
    openChat,
    token,
    userNickName,
  };
  const ReduxActionNames: CreacteCrewActionType[] = [
    'setCrewName',
    'setCrewRegion',
    'setExplanation',
    'setOpenChat',
  ];

  //* react hooks
  const [canComplete, setCanComplete] = useState(false as boolean);

  //* any variables
  const questionInputValues = [crewName, crewRegion, explanation, openChat];
  const questions: string[] = [
    '크루이름이 무엇인가요?',
    '달리는 지역이 어딘가요?',
    '간단한 크루 소개글을 작성해주세요.',
    '크루 오픈채팅방을 등록해주세요.',
  ];
  const QUESTION_COUNT = questions.length;

  //* Event Functions
  const goToCrewMainPage = () => {
    history.push('/crewList');
  };

  const goToCrewDetail = () => {
    history.push(`/crewList/${crewName}`);
  };

  return {
    reduxCreateCrewState,
    questionInputValues,
    questions,
    QUESTION_COUNT,
    ReduxActionNames,
    canCompleteState: [canComplete, setCanComplete] as [
      boolean,
      React.Dispatch<React.SetStateAction<boolean>>
    ],
    goToCrewDetail,
    goToCrewMainPage,
  };
};

export default useCreateCrew;
