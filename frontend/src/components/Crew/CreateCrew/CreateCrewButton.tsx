import { Button, Input } from '@nextui-org/react';
import { FormElement } from '@nextui-org/react/esm/input/input-props';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { CreateCrewActions } from '../../../modules/createCrew';
import useCreateCrew, { CreacteCrewActionType } from './hooks/useCreateCrew';

interface IProps {
  questionOrder: number;
  setQuestionOrder: React.Dispatch<React.SetStateAction<number>>;
}

const CreateCrewButton: React.FC<IProps> = ({
  questionOrder,
  setQuestionOrder,
}) => {
  const dispatch = useDispatch();

  //* custom Hook
  const {
    reduxCreateCrewState: {
      crewName,
      crewRegion,
      explanation,
      openChat,
      token,
      userNickName,
    },
    loadingState,
    canCompleteState,
    createResultState,
    QUESTION_COUNT,
    goToCrewDetail,
    goToCrewMainPage,
    questionInputValues,
    ReduxActionNames,
  } = useCreateCrew();

  const [loading, setLoading] = loadingState;
  const [canComplete] = canCompleteState;
  const [createResult] = createResultState;

  const movePrevious = useCallback(() => {
    if (questionOrder > 0)
      setQuestionOrder(
        (previousQuestionOrder: number) => previousQuestionOrder - 1
      );
  }, [questionOrder]);

  const moveNextOrComplete = useCallback(() => {
    console.log(questionOrder);
    if (questionOrder < QUESTION_COUNT)
      setQuestionOrder((previousQuestionOrder) => previousQuestionOrder + 1);
    if (questionOrder === QUESTION_COUNT - 1) {
      setLoading(true);
      dispatch(
        CreateCrewActions.newCrew({
          createCrewData: {
            crew: { crewName, crewRegion, explanation, openChat },
          },
          token,
          userNickName,
        })
      );
    }
  }, [questionOrder]);

  const InputStateToRedux = (
    e: React.ChangeEvent<FormElement>,
    actionName: CreacteCrewActionType
  ) => {
    dispatch(CreateCrewActions[actionName](e.target.value));
  };

  return (
    <>
      {questionOrder !== QUESTION_COUNT && (
        <div
          onSubmit={(e) => e.preventDefault}
          className="w-3/5 text-center mb-10"
        >
          <Input
            type="text"
            width="80%"
            className="lg:mb-20"
            value={questionInputValues[questionOrder]}
            onChange={(e) => {
              InputStateToRedux(e, ReduxActionNames[questionOrder]);
            }}
            data-testid="data-input"
          />
        </div>
      )}
      <div>
        <div
          className={`w-full h-32 flex flex-wrap space-x-3 ${
            questionOrder === QUESTION_COUNT ? 'block' : 'hidden'
          } `}
        >
          <div className="w-20 lg:w-64 flex flex-col justify-center">
            <Button
              auto
              type="button"
              data-testid="go-crew-page-button"
              color="#8b8bf5"
              onClick={goToCrewMainPage}
              disabled={loading}
            >
              모여요 페이지로 돌아가기
            </Button>
          </div>
          <div className="w-20 lg:w-64 flex flex-col justify-center">
            <Button
              auto
              className=""
              type="button"
              color="#8b8bf5"
              onClick={goToCrewDetail}
              disabled={
                loading || createResult === '크루 생성에 실패하였습니다.'
              }
            >
              내 크루로 가기
            </Button>
          </div>
        </div>
        <div
          className={`${questionOrder === QUESTION_COUNT ? 'hidden' : 'block'}`}
        >
          <button
            className={`${
              questionOrder === 0 || questionOrder === QUESTION_COUNT
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
            disabled={canComplete || !questionInputValues[questionOrder]}
            data-testid="next-button"
            className="text-white bg-purple-400 w-20 h-10 md:w-40 md:w-25 rounded-xl hover:opacity-80 transition ease-in-out delay-100 disabled:bg-gray-200"
          >
            {questionOrder === QUESTION_COUNT - 1 ? '완료' : '다음'}
          </button>
        </div>
      </div>
    </>
  );
};

export default CreateCrewButton;
