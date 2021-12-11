import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Input, Button } from '@nextui-org/react';
import { FormElement } from '@nextui-org/react/esm/input/input-props';
import { CreateCrewActions } from '../../modules/createCrew';
import { useSelector } from '../../modules/index';

type CreacteCrewActionType = 'setCrewName' | 'setCrewExplain' | 'setCrewRegion';

const CreateCrew = () => {
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
  const complete: string = '축하합니다. 새로운 크루를 만들었습니다!';

  const moveNextOrComplete = () => {
    if (questionOrder < questions.length) setQuestionOrder(questionOrder + 1);
  };
  const movePrevious = () => {
    if (questionOrder > 0) setQuestionOrder(questionOrder - 1);
  };

  const Memo = useMemo(() => {
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
    <div>
      <span data-testid="question-span">
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
      >
        <Input
          type="text"
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
          style={
            questionOrder === questions.length
              ? { visibility: 'visible' }
              : { visibility: 'hidden' }
          }
        >
          <button type="button">
            <Link to="/crew">크루 페이지로 돌아가기</Link>
          </button>
          <button type="button">
            <Link to="/crew">크루 관리하러 가기</Link>
          </button>
        </div>
        <div
          style={
            questionOrder === questions.length
              ? { visibility: 'hidden' }
              : { visibility: 'visible' }
          }
        >
          <Button
            style={
              questionOrder === 0 || questionOrder === questions.length
                ? { visibility: 'hidden' }
                : { visibility: 'visible' }
            }
            type="button"
            onClick={movePrevious}
            data-testid="previous-button"
          >
            이전
          </Button>
          <Button
            type="button"
            onClick={moveNextOrComplete}
            disabled={canComplete}
            data-testid="next-button"
          >
            {questionOrder === questions.length - 1 ? '완료' : '다음'}
          </Button>
        </div>
      </div>
    </div>
  );
};
export default CreateCrew;
