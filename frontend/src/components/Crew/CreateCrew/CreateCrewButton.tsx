import { Button } from '@nextui-org/react';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { CreateCrewActions } from '../../../modules/createCrew';
import CreateCrewAnswer from './CreateCrewAnswer';
import useCreateCrew from './hooks/useCreateCrew';

interface IProps {
  questionOrder: number;
  setQuestionOrder: React.Dispatch<React.SetStateAction<number>>;
  createResult: string;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const CreateCrewButton: React.FC<IProps> = ({
  questionOrder,
  setQuestionOrder,
  createResult,
  loading,
  setLoading,
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
    },
    canCompleteState,
    QUESTION_COUNT,
    goToCrewDetail,
    goToCrewMainPage,
    questionInputValues,
  } = useCreateCrew();

  const [canComplete] = canCompleteState;

  const movePrevious = useCallback(() => {
    if (questionOrder > 0)
      setQuestionOrder(
        (previousQuestionOrder: number) => previousQuestionOrder - 1
      );
  }, [questionOrder]);

  const moveNextOrComplete = useCallback(() => {
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
        })
      );
    }
  }, [questionOrder, crewName, crewRegion, explanation, openChat]);

  return (
    <>
      <CreateCrewAnswer questionOrder={questionOrder} />
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
