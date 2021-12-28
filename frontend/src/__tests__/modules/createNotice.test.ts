import reducer, { CreateNoticeActions } from '../../modules/createNotice';
import { INotice } from '../../modules/types/createNotice';

const initState: INotice = {
  title: '',
  explain: '',
  location: '',
  time: '',
  openChatLink: '',
};

describe('', () => {
  test('리덕스 setTitle 액션을 통해서 title state가 잘 바뀌는지 확인한다.', () => {
    expect(
      reducer(
        initState,
        CreateNoticeActions.setTitle('서울 여의도 한강공워 19시 러닝 4명 구함')
      ).title
    ).toEqual('서울 여의도 한강공워 19시 러닝 4명 구함');
  });

  test('리덕스 setExplain 액션을 통해서 explain state가 잘 바뀌는지 확인한다.', () => {
    expect(
      reducer(
        initState,
        CreateNoticeActions.setExplain(
          '서울 여의도 한강공워 19시 러닝 4명을 구합니다. 힘들어도 항상 긍정적으로 뛰시는 분으로 구합니다.'
        )
      ).explain
    ).toEqual(
      '서울 여의도 한강공워 19시 러닝 4명을 구합니다. 힘들어도 항상 긍정적으로 뛰시는 분으로 구합니다.'
    );
  });
  test('리덕스 setLocation 액션을 통해서 location state가 잘 바뀌는지 확인한다.', () => {
    expect(
      reducer(
        initState,
        CreateNoticeActions.setLocation('서울 여의도역 3번 출구')
      ).location
    ).toEqual('서울 여의도역 3번 출구');
  });
  test('리덕스 setTime 액션을 통해서 time state가 잘 바뀌는지 확인한다.', () => {
    expect(
      reducer(initState, CreateNoticeActions.setTime('2021년 12월 25일 18시'))
        .time
    ).toEqual('2021년 12월 25일 18시');
  });

  test('리덕스.setOpenChatLink 액션을 통해서 openChatLink state가 잘 바뀌는지 확인한다.', () => {
    expect(
      reducer(
        initState,
        CreateNoticeActions.setOpenChatLink('http//open.kakao.com/sdfij12')
      ).openChatLink
    ).toEqual('http//open.kakao.com/sdfij12');
  });
});
