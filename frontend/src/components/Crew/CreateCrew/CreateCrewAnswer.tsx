import { Input } from '@nextui-org/react';
import { FormElement } from '@nextui-org/react/esm/input/input-props';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import SelcetRegion from '../../../common/components/SelcetRegion';
import { CreateCrewActions } from '../../../modules/createCrew';
import useCreateCrew, { CreacteCrewActionType } from './hooks/useCreateCrew';
import { SearchAddressType } from '../../../modules/types/notice';

enum Step {
  CREW_NAME,
  CREW_REGION,
  CREW_DESCRIPTION,
  CREW_OPENCHAT,
}

interface IProps {
  questionOrder: number;
}

const CreateCrewAnswer: React.FC<IProps> = ({ questionOrder }) => {
  const dispatch = useDispatch();

  const [answerRegion, setAnswerRegion] = useState<SearchAddressType>({
    gwon: '',
    dou: '',
    si: '',
    gu: '',
  });

  const { CreateCrewActionTypes, questionInputValues, QUESTION_COUNT } =
    useCreateCrew();

  const InputStateToRedux = (
    e: React.ChangeEvent<FormElement>,
    actionName: CreacteCrewActionType
  ) => {
    dispatch(CreateCrewActions[actionName](e.target.value));
  };

  const questionOpenChat = () => {
    const answer = questionInputValues[questionOrder];

    if (questionOrder === Step.CREW_NAME)
      if (answer.length > 15) return answer.substring(0, 15);
    if (questionOrder === Step.CREW_DESCRIPTION)
      if (answer.length > 30) return answer.substring(0, 30);
    if (questionOrder === Step.CREW_OPENCHAT)
      if (!answer.includes('https://')) return `https://${answer}`;

    return answer;
  };

  const questionPlaceholder = () => {
    if (questionOrder === Step.CREW_NAME)
      return '크루 이름을 입력하세요. (최대 15자)';
    if (questionOrder === Step.CREW_DESCRIPTION)
      return '크루 설명을 입력하세요. (최대 30자)';
    if (questionOrder === Step.CREW_OPENCHAT)
      return '크루 오픈채팅 링크를 입력하세요.';
    return '';
  };

  const selectRegion: (region: SearchAddressType) => void = (region) => {
    const { si, dou, gu } = region;
    const crewRegion = `${dou} ${si} ${gu}`.trim();
    setAnswerRegion(region);
    dispatch(CreateCrewActions.setCrewRegion(crewRegion));
  };

  if (questionOrder !== QUESTION_COUNT)
    return (
      <div
        onSubmit={(e) => e.preventDefault}
        className="w-3/5 text-center mb-10"
      >
        {questionOrder !== Step.CREW_REGION ? (
          <Input
            type="text"
            width="80%"
            className="lg:mb-20"
            value={questionOpenChat()}
            onChange={(e) => {
              InputStateToRedux(e, CreateCrewActionTypes[questionOrder]);
            }}
            placeholder={questionPlaceholder()}
            data-testid="data-input"
          />
        ) : (
          <SelcetRegion submit={selectRegion} initRegion={answerRegion} />
        )}
      </div>
    );
  return null;
};

export default CreateCrewAnswer;
