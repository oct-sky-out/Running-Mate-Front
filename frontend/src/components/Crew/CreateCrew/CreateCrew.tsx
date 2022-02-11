import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Input } from '@nextui-org/react';
import { FormElement } from '@nextui-org/react/esm/input/input-props';
import { CreateCrewActions } from '../../../modules/createCrew';
import CreateCrewOrderMarker from './CreateCrewOrderMarker';
import PreviousPageButton from '../../../common/components/PreviousPageButton';
import CreateCrewResult from './CreateCrewResult';
import useCreateCrew, { CreacteCrewActionType } from './hooks/useCreateCrew';
import CreateCrewButton from './CreateCrewButton';

const CreateCrew = () => {
  //* redux dispach
  const dispatch = useDispatch();

  //* custom hook
  const {
    QUESTION_COUNT,
    ReduxActionNames,
    questionInputValues,
    reduxCreateCrewState: { crewName, crewRegion, explanation, openChat },
    questionOrderState,
    canCompleteState,
    goToCrewMainPage,
  } = useCreateCrew();
  const [questionOrder] = questionOrderState;
  const [_, setCanComplete] = canCompleteState;

  const InputStateToRedux = (
    e: React.ChangeEvent<FormElement>,
    actionName: CreacteCrewActionType
  ) => {
    dispatch(CreateCrewActions[actionName](e.target.value));
  };

  //* useEffects
  useEffect(() => {
    if (questionOrder >= QUESTION_COUNT - 1) setCanComplete(true);
    if (
      questionOrder < QUESTION_COUNT - 1 ||
      (crewName && crewRegion && explanation && openChat)
    )
      setCanComplete(false);
  }, [questionOrder, crewName, crewRegion, explanation, openChat]);

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
        <CreateCrewOrderMarker />
        <span
          className="text-2xl md:text-3xl font-bold lg:mb-20 p-8 text-center"
          data-testid="question-span"
        >
          <CreateCrewResult />
        </span>
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
        <CreateCrewButton />
      </div>
    </>
  );
};
export default CreateCrew;
