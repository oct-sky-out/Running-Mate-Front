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

type CreacteCrewActionType = 'setCrewName' | 'setCrewExplain' | 'setCrewRegion';

const CreateCrew = () => {
  //* useHistory
  const history = useHistory();

  //* Redux
  const dispatch = useDispatch();
  const { crewName, crewRegion, crewExplain } = useSelector((state) => ({
    crewName: state.createCrew.crew.crewName,
    crewRegion: state.createCrew.crew.crewRegion,
    crewExplain: state.createCrew.crew.crewExplain,
  }));
  const reduxStates = [crewName, crewRegion, crewExplain];
  const ReduxActionNames: string[] = [
    'setCrewName',
    'setCrewRegion',
    'setCrewExplain',
  ];

  //* useState
  const [questionOrder, setQuestionOrder] = useState(0);
  const [canComplete, setCanComplete] = useState(false);

  const questions: string[] = [
    '크루이름이 무엇인가요?',
    '달리는 지역이 어딘가요?',
    '간단한 크루 소개글을 작성해주세요.',
  ];
  const complete: string = '🎉 축하합니다. 새로운 크루를 만들었습니다!';

  const moveNextOrComplete = () => {
    if (questionOrder < questions.length) setQuestionOrder(questionOrder + 1);
  };
  const movePrevious = () => {
    if (questionOrder > 0) setQuestionOrder(questionOrder - 1);
  };

  useEffect(() => {
    if (questionOrder >= questions.length - 1) {
      setCanComplete(true);
    }
    if (
      questionOrder < questions.length - 1 ||
      (crewName && crewRegion && crewExplain)
    ) {
      setCanComplete(false);
    }
  }, [questionOrder, crewName, crewRegion, crewExplain]);

  const InputStateToRedux = (
    e: React.ChangeEvent<FormElement>,
    actionName: CreacteCrewActionType
  ) => {
    dispatch(CreateCrewActions[actionName](e.target.value));
  };

  useEffect(() => {
    dispatch(CreateCrewActions.setInit());
  }, []);
  return (
    <DetailBaseBorder>
      <div className="flex flex-col justify-center items-center pt-10">
        <div className="w-full pl-4 mb:pl-4 mb-8 md:mb-16 flex justify-left">
          <PreviousPageButton
            text="뒤로가기"
            iconSize="32"
            onClick={() => history.goBack()}
            className="w-38"
            tailwindTextSize="text-sm md:text-2xl"
          />
        </div>
        <CreateCrewOrderMarker questionOrder={questionOrder} />
        <span
          className="text-2xl md:text-5xl font-bold mb-20 "
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
            className="mb-20"
            value={reduxStates[questionOrder] || ''}
            onChange={(e) => {
              InputStateToRedux(
                e,
                ReduxActionNames[questionOrder] as CreacteCrewActionType
              );
            }}
            data-testid="data-input"
          />
        </form>
        <div>
          <div
            className={`${
              questionOrder === questions.length ? 'block' : 'hidden'
            } `}
          >
            <Button
              className="mr-20"
              type="button"
              data-testid="go-crew-page-button"
            >
              <Link to="/crew">크루 페이지로 돌아가기</Link>
            </Button>
            <Button type="button">
              <Link to="/crew/crewid">크루 관리하러 가기</Link>
            </Button>
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
              className="text-white bg-purple-400 w-20 h-10 md:w-40 md:w-25 rounded-xl hover:opacity-80 transition ease-in-out delay-100"
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
