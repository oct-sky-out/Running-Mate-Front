import { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { CreateCrewActions } from '../../../modules/createCrew';
import CreateCrewOrderMarker from './CreateCrewOrderMarker';
import CreateCrewResult from './CreateCrewResult';
import CreateCrewButton from './CreateCrewButton';
import useCreateCrew from './hooks/useCreateCrew';
import PreviousPageButton from '../../../common/components/PreviousPageButton';

const CreateCrew = () => {
  //* redux dispach
  const dispatch = useDispatch();

  //* custom hook
  const {
    QUESTION_COUNT,
    reduxCreateCrewState: { crewName, crewRegion, explanation, openChat },
    canCompleteState,
    goToCrewMainPage,
  } = useCreateCrew();
  const [, setCanComplete] = canCompleteState;

  const [questionOrder, setQuestionOrder] = useState(0);

  const completeCheck = useCallback(() => {
    if (questionOrder >= QUESTION_COUNT - 1) setCanComplete(true);
    if (
      questionOrder < QUESTION_COUNT - 1 ||
      (crewName && crewRegion && explanation && openChat)
    )
      setCanComplete(false);
  }, [questionOrder]);

  //* useEffects
  useEffect(() => {
    completeCheck();
  }, [
    questionOrder,
    crewName,
    crewRegion,
    explanation,
    openChat,
    completeCheck,
  ]);

  useEffect(() => {
    dispatch(CreateCrewActions.setInit());
  }, []);

  return (
    <>
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
          <CreateCrewResult questionOrder={questionOrder} />
        </span>
        <CreateCrewButton
          questionOrder={questionOrder}
          setQuestionOrder={setQuestionOrder}
        />
      </div>
    </>
  );
};
export default CreateCrew;
