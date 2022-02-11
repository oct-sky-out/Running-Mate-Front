import { Loading } from '@nextui-org/react';
import { useEffect, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import { CreateCrewActions } from '../../../modules/createCrew';
import useCreateCrew from './hooks/useCreateCrew';

const CreateCrewResult = () => {
  const dispatch = useDispatch();
  const {
    reduxCreateCrewState: { createCrewFetchStatus },
    questions,
    QUESTION_COUNT,
    questionOrderState,
    createResultState,
    loadingState,
  } = useCreateCrew();
  const [questionOrder] = questionOrderState;
  const [loading, setLoading] = loadingState;
  const [createResult, setCreateResult] = createResultState;

  const creatingFetchResult = useMemo(() => {
    if (questionOrder === QUESTION_COUNT) {
      if (loading) {
        return <Loading type="points" size="xlarge" color="#8b8bf5" />;
      }
      return createResult;
    }
    return questions[questionOrder];
  }, [questionOrder, createResult, loading]);

  useEffect(() => {
    if (createCrewFetchStatus === 'Sucecss')
      setCreateResult('🎉 축하합니다. 새로운 크루를 만들었습니다!');
    if (createCrewFetchStatus === 'Failure')
      Swal.fire({
        icon: 'error',
        title: '크루 생성 실패',
        text: '오류로 인하여 크루 생성에 실패하였습니다.',
      }).then(() => setCreateResult('크루 생성에 실패하였습니다.'));
    if (
      createCrewFetchStatus === 'Sucecss' ||
      createCrewFetchStatus === 'Failure'
    ) {
      setLoading(false);
      dispatch(CreateCrewActions.setCreateCrewStatus(''));
    }
  }, [createCrewFetchStatus]);

  return <>{creatingFetchResult}</>;
};

export default CreateCrewResult;
