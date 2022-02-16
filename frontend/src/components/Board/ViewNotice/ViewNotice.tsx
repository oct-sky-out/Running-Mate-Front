import React, { useEffect } from 'react';
import { useHistory, withRouter, RouteComponentProps } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { noticeActions } from '../../../modules/notice';
import DetailBaseBorder from '../../../common/components/DetailBaseBorder';
import PreviousPageButton from '../../../common/components/PreviousPageButton';
import useSwalerts from '../../../common/hooks/useSwalerts';
import { useSelector } from '../../../modules/index';
import NoticeService from '../../../lib/api/noticeService';
import ListComment from './ListComments/ListComments';
import WriteComment from './WriteComment/WriteComment';
import ViewNoticeHeader from './ViewNoticeHeader';
import ViewNoticeBody from './ViewNoticeBody';

interface MatchParam {
  runId: string;
}

const ViewNotice: React.FC<RouteComponentProps<MatchParam>> = ({ match }) => {
  //* History
  const history = useHistory();
  //* reudx
  const token = useSelector((state) => state.signIn.token);
  const dispatch = useDispatch();
  //* ajax Object
  const noticeService = new NoticeService();
  //* custom hook
  const { errorToast } = useSwalerts();
  //* any functions
  const getBoardDate = async () => {
    try {
      const data = await noticeService.getNotice(match.params.runId, token);
      dispatch(noticeActions.setOneViewNotice(data));
    } catch {
      errorToast(
        '게시글 불러오기 실패.',
        '게시글을 불러오는데 실패하였습니다.😰'
      );
    }
  };
  //* useEffect
  useEffect(() => {
    getBoardDate();
  }, [match.params.runId]);

  return (
    <DetailBaseBorder>
      <PreviousPageButton
        text="뒤로가기"
        className="w-24 md:w-32 lg:w-40 py-4 flex justify-start items-start"
        iconSizeClassName="text-2xl md:text-3xl lg:text-4xl"
        tailwindTextSize="text-sm md:text-2xl"
        data-cy="back"
        onClick={() => {
          history.goBack();
        }}
      />
      <ViewNoticeHeader />
      <ViewNoticeBody boardId={match.params.runId} />
      <WriteComment boardId={match.params.runId} />
      <ListComment boardId={match.params.runId} />
    </DetailBaseBorder>
  );
};

export default withRouter(ViewNotice);
