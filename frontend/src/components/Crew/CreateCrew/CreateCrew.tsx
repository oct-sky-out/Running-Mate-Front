import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { Input, Button } from '@nextui-org/react';
import { FormElement } from '@nextui-org/react/esm/input/input-props';

import { CreateCrewActions } from '../../../modules/createCrew';
import { useSelector } from '../../../modules/index';
import CreateCrewOrderMarker from './CreateCrewOrderMarker';
import PreviousPageButton from '../../../common/components/PreviousPageButton';
import DetailBaseBorder from '../../../common/components/DetailBaseBorder';

type CreacteCrewActionType =
  | 'setCrewName'
  | 'setExplanation'
  | 'setCrewRegion'
  | 'setOpenChat';

const CreateCrew = () => {
  //* useHistory
  const history = useHistory();

  //* Redux
  const dispatch = useDispatch();
  const { crewName, crewRegion, explanation, openChat, token } = useSelector(
    (state) => ({
      crewName: state.createCrew.crew.crewName,
      crewRegion: state.createCrew.crew.crewRegion,
      explanation: state.createCrew.crew.explanation,
      openChat: state.createCrew.crew.openChat,
      token: state.signIn.token,
    })
  );

  //* any variables
  const reduxStates = [crewName, crewRegion, explanation, openChat];
  const ReduxActionNames: CreacteCrewActionType[] = [
    'setCrewName',
    'setCrewRegion',
    'setExplanation',
    'setOpenChat',
  ];
  const complete: string = '🎉 축하합니다. 새로운 크루를 만들었습니다!';

  //* useState
  const [questionOrder, setQuestionOrder] = useState(0);
  const [canComplete, setCanComplete] = useState(false);

  const questions: string[] = [
    '크루이름이 무엇인가요?',
    '달리는 지역이 어딘가요?',
    '간단한 크루 소개글을 작성해주세요.',
    '크루 오픈채팅방을 등록해주세요.',
  ];

  //* events
  const moveNextOrComplete = () => {
    if (questionOrder < questions.length) setQuestionOrder(questionOrder + 1);
    if (questionOrder === questions.length - 1) {
      console.log(crewName, crewRegion, explanation, openChat);
      dispatch(
        CreateCrewActions.newCrew({
          createCrewData: {
            crew: { crewName, crewRegion, explanation, openChat },
          },
          token,
        })
      );
    }
  };
  const movePrevious = () => {
    if (questionOrder > 0) setQuestionOrder(questionOrder - 1);
  };
  const InputStateToRedux = (
    e: React.ChangeEvent<FormElement>,
    actionName: CreacteCrewActionType
  ) => {
    dispatch(CreateCrewActions[actionName](e.target.value));
  };
  const goToCrewMainPage = () => {
    history.push('/crew');
  };

  //* useEffects
  useEffect(() => {
    if (questionOrder >= questions.length - 1) setCanComplete(true);
    if (
      questionOrder < questions.length - 1 ||
      (crewName && crewRegion && explanation && openChat)
    )
      setCanComplete(false);
  }, [questionOrder, crewName, crewRegion, explanation, openChat]);
  useEffect(() => {
    dispatch(CreateCrewActions.setInit());
  }, []);

  return (
    <DetailBaseBorder>
      <div className="flex flex-col justify-center items-center pt-10">
        <div className="w-full pl-4 mb:pl-4 mb-8 md:mb-16 flex justify-left">
          <PreviousPageButton
            iconSizeClassName="text-2xl md:text-3xl lg:text-4xl"
            text="뒤로가기"
            onClick={goToCrewMainPage}
            className="w-24 md:w-32 lg:w-40 py-4 flex justify-start items-start"
            tailwindTextSize="text-sm md:text-2xl"
          />
        </div>
        <CreateCrewOrderMarker questionOrder={questionOrder} />
        <span
          className="text-2xl md:text-3xl font-bold lg:mb-20 p-8 text-center"
          data-testid="question-span"
        >
          {questionOrder === questions.length
            ? complete
            : questions[questionOrder]}
        </span>
        <form
          action=""
          style={
            questionOrder === questions.length
              ? { visibility: 'hidden' }
              : { visibility: 'visible' }
          }
          onSubmit={(e) => e.preventDefault}
          className="w-3/5 text-center mb-10"
        >
          <Input
            type="text"
            width="80%"
            className="lg:mb-20"
            value={reduxStates[questionOrder] || ''}
            onChange={(e) => {
              InputStateToRedux(e, ReduxActionNames[questionOrder]);
            }}
            data-testid="data-input"
          />
        </form>
        <div>
          <div
            className={`w-full h-32 flex flex-wrap  ${
              questionOrder === questions.length ? 'block' : 'hidden'
            } `}
          >
            <div className="w-20 lg:w-64 flex flex-grow justify-center">
              <Link to="/crew" className="w-full flex flex-col">
                <Button
                  auto
                  type="button"
                  data-testid="go-crew-page-button"
                  color="#8b8bf5"
                >
                  크루 페이지로 돌아가기
                </Button>
              </Link>
            </div>
            <div className="w-full flex flex-grow justify-center">
              <Link to="/crew/crewid" className="w-full flex flex-col">
                <Button auto type="button" color="#8b8bf5">
                  크루 관리하러 가기
                </Button>
              </Link>
            </div>
          </div>
          <div
            className={`${
              questionOrder === questions.length ? 'hidden' : 'block'
            }`}
          >
            <button
              className={`${
                questionOrder === 0 || questionOrder === questions.length
                  ? 'invisible'
                  : 'visible'
              } mr-32 md:mr-70 text-white bg-purple-400 w-20 h-10 md:w-40 md:w-25 rounded-xl hover:opacity-80 transition ease-in-out delay-100`}
              type="button"
              onClick={movePrevious}
              data-testid="previous-button"
            >
              이전
            </button>
            <button
              type="button"
              onClick={moveNextOrComplete}
              disabled={canComplete || !reduxStates[questionOrder]}
              data-testid="next-button"
              className="text-white bg-purple-400 w-20 h-10 md:w-40 md:w-25 rounded-xl hover:opacity-80 transition ease-in-out delay-100 disabled:bg-gray-200"
            >
              {questionOrder === questions.length - 1 ? '완료' : '다음'}
            </button>
          </div>
        </div>
      </div>
    </DetailBaseBorder>
  );
};
export default CreateCrew;
