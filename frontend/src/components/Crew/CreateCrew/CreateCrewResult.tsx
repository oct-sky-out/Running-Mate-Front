import { Loading } from '@nextui-org/react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import useSwalerts from '../../../common/hooks/useSwalerts';
import { CreateCrewActions } from '../../../modules/createCrew';
import useCreateCrew from './hooks/useCreateCrew';

interface IProps {
  questionOrder: number;
  createResult: string;
  setCreateResult: React.Dispatch<React.SetStateAction<string>>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const CreateCrewResult: React.FC<IProps> = ({
  questionOrder,
  createResult,
  setCreateResult,
  loading,
  setLoading,
}) => {
  const dispatch = useDispatch();
  const {
    reduxCreateCrewState: { createCrewFetchStatus },
    QUESTION_COUNT,
    questions,
  } = useCreateCrew();
  const { errorToast } = useSwalerts();

  useEffect(() => {
    if (createCrewFetchStatus === 'Sucecss')
      setCreateResult('🎉 축하합니다. 새로운 크루를 만들었습니다!');
    if (createCrewFetchStatus === 'Failure') {
      errorToast(
        '크루 생성 실패',
        '오류로 인하여 크루 생성에 실패하였습니다.😰'
      );
      setCreateResult('크루 생성에 실패하였습니다.');
    }
    if (
      createCrewFetchStatus === 'Sucecss' ||
      createCrewFetchStatus === 'Failure'
    ) {
      setLoading(false);
      dispatch(CreateCrewActions.setCreateCrewStatus(''));
    }
  }, [createCrewFetchStatus]);

  return (
    <>
      {loading && <Loading type="points" size="xlarge" color="#8b8bf5" />}
      {questionOrder === QUESTION_COUNT
        ? createResult
        : questions[questionOrder]}
    </>
  );
};

export default CreateCrewResult;
